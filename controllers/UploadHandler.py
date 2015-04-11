import webapp2
import json
import logging
import csv
from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers

from google.appengine.api import users

from models.account import *
from models.ExpenseType import ExpenseType
from models.Method import Method
from models.Person import Person

class UploadHandler(webapp2.RequestHandler):
    def post(self):
        user = users.get_current_user()
        if user == None:
            self.invalid_value('not logged in')
            return
        req = self.request
        account_name = req.get('account_name')
        account_owner = req.get('account_owner')
        account_found = find_account(self.request)
        if (type(account_found) == 'String'):
            self.invalid_value('account')
            return
        account = account_key(account_name, account_owner)
        raw_file = self.request.get('csv_file')
        self.process_csv(account, raw_file)

    def get_new_entry(self, account):
        new_entry = None
        object_type = self.request.get('object_type')
        if (object_type == 'expense_type'):
            new_entry = ExpenseType(parent=account)
        elif (object_type == 'method'):
            new_entry = Method(parent=account)
        elif (object_type == 'person'):
            new_entry = Person(parent=account)
        else:
            logging.info("get_new_entry(): got invalid object_type: %s", object_type)
            self.invalid_value('object_type')
        logging.info("get_new_entry(): returning entry %s", new_entry)
        return new_entry

    def process_csv(self, account, file):
        f = file.splitlines()
        reader = csv.reader(f)
        logging.info('CSV reader: %s', reader)
        checked_fields = False
        row_count = 0
        object_type = self.request.get('object_type')
        for row in reader:
            if row_count == 0:
                next
            if not checked_fields:
                checked_fields = True
                fields_to_check = ['type_id', 'description', 'active']
                if object_type == 'method':
                    fields_to_check.append(['monthly_payment', \
                                            'payment_deferred_days'])
                if not all(self.field_in_csv(row, f) for f in fields_to_check):
                    return
            else:
                if object_type == 'method':
                    type_id, description, \
                        monthly_payment, payment_deferred_days, \
                        active = row
                else:
                    type_id, description, active = row
                is_active = True
                if int(active) == 0:
                    is_active = False
                logging.info("got row: type_id=%s, description=%s, active=%s", type_id, description, is_active)
                desc = unicode(description, "cp1255")
                entry = self.get_new_entry(account)
                if entry == None:
                    return
                entry.id = int(type_id)
                entry.name = desc
                entry.active = is_active
                if object_type == 'method':
                    entry.monthly_payment = monthly_payment
                    entry.payment_deferred_days = payment_deferred_days
                entry.put()
                row_count += 1
        self.response.out.write(json.dumps(({'success': 1, 'msg': str(row_count) + ' rows were imported'})))

    def field_in_csv(self, row, field_name):
        logging.info('checking field "%s" in CSV row: %s', field_name, row)
        if field_name in row:
            return True
        self.missing_field(field_name)
        return False

    def invalid_value(self, field):
        self.response.out.write(json.dumps(({'success': 0, 'errors': 'Invalid value recieved: ' + field})))

    def missing_field(self, field):
        self.response.out.write(json.dumps(({'success': 0, 'errors': 'missing field in CSV file: ' + field})))
