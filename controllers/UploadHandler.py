import webapp2
import json
import logging
import csv
from google.appengine.ext import blobstore
from google.appengine.ext.webapp import blobstore_handlers

from google.appengine.api import users

from models.account import *
from models.types import ExpenseType

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
            self.invalid_value(account_found)
            return
        account = account_key(account_name, account_owner)
        raw_file = self.request.get('csv_file')
        self.process_csv(account, raw_file)

    def process_csv(self, account, file):
        f = file.splitlines()
        reader = csv.reader(f)
        logging.info('CSV reader: %s', reader)
        checked_fields = False
        row_count = 0
        for row in reader:
            if row_count == 0:
                next
            if not checked_fields:
                checked_fields = True
                if not all(self.field_in_csv(row, f) for f in ['type_id', 'description', 'active']):
                    return
            else:
                type_id, description, active = row
                is_active = True
                if int(active) == 0:
                    is_active = False
                logging.info("got row: type_id=%s, description=%s, active=%s", type_id, description, is_active)
                desc = unicode(description, "cp1255")
                et = ExpenseType(parent=account)
                et.type_id = int(type_id)
                et.description = desc
                et.active = is_active
                et.put()
                row_count += 1
        self.response.out.write(json.dumps(({'success': 1, 'msg': str(row_count) + ' rows were imported'})))

    def field_in_csv(self, row, field_name):
        logging.info('checking field "%s" in CSV row: %s', field_name, row)
        if field_name in row:
            return True
        self.missing_field(field_name)
        return False
        
    def missing_field(self, field):
        self.response.out.write(json.dumps(({'success': 0, 'errors': 'missing field in CSV file: ' + field})))
