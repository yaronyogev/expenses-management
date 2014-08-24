import webapp2
import json
import logging

from google.appengine.api import users

from models.types import *
from models.account import *

class ExpenseTypesController(webapp2.RequestHandler):
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
        action = self.request.get('action')
        if action == 'delete':
            self.delete_type(account, self.request.get('id'))
        elif action == 'upload_csv':
            self.upload_csv(account)
        else:
            self.handle_update()

    def get(self):
        user = users.get_current_user()
        if user == None:
            self.invalid_value('not logged in')
            return
        email = user.email()
        account_name = self.request.get('account_name')
        account_owner = self.request.get('account_owner')
        account_user = self.request.get('account_user')
        
        # verify that access to this account is permitted to this user
        if account_user != user.email():
            self.invalid_value('user mismatch')
            return
        
        account = account_key(account_name, account_owner)
        types_query = ExpenseType.query(ancestor=account).order(ExpenseType.description)
        start_offset = int(self.request.get('start'))
        limit = int(self.request.get('limit'))
        types = types_query.fetch(limit, offset=start_offset)
        types_list = []
        for et in types:
            types_list.append({ \
                'id': et.type_id, \
                'name': et.description, \
                'active': et.active})
        self.response.out.write(json.dumps({ \
            'user_name': email, \
            'account_name': account_name, \
            'account_owner': account_owner, \
            'rows': types_list}))

    def handle_update(self):
        req = self.request
        account_name = req.get('account_name')
        account_owner = req.get('account_owner')
        account_found = find_account(self.request)
        if (type(account_found) == 'String'):
            self.invalid_value(account_found)
            return
        account = account_key(account_name, account_owner)
        name = req.get('name')
        if name == None or name == '':
            self.invalid_value('name must be specified')
            return
        is_active = req.get('active') == 'true'
        type_id = req.get('id')
        if type_id == None:
            self.invalid_value('id not specified')
            return
        else:
            try:
                type_id = int(type_id);
            except:
                self.invalid_value('id')
                return
        et = None
        if type_id == 0:
            et = ExpenseType(parent=account)
            et.description = req.get('name')
            et.active = is_active
            # find the largest type ID x for this account, and return new type ID that is x+1
            q = ExpenseType.query(ancestor=account).order(-ExpenseType.type_id)
            results = q.fetch(1)
            new_id = 1
            for old in results:
                new_id = old.type_id + 1
            et.type_id = new_id
            et.put()
            resp = json.dumps(({'success': 1, 'id': new_id}))
            self.response.out.write(resp)
        else:
            record_to_change = None
            for et in ExpenseType.query(ancestor=account).fetch():
                if et.type_id == type_id:
                    record_to_change = et
                else:
                    if et.description == name:
                        self.invalid_value('expense type exists: ' + name)
                        return
            if record_to_change == None:
                self.invalid_value("unable to find type with type_id=" + req.get('id'))
                return
            record_to_change.description = req.get('name')
            record_to_change.active = is_active
            record_to_change.put()
            resp = json.dumps(({'success': 1, 'id': record_to_change.type_id}))
            self.response.out.write(resp)
            return
        
    def delete_type(self, account, type_id):
        et = expense_type_get_by_type_id(account, type_id)
        if et != None:
            et.key.delete()
            self.response.out.write(json.dumps(({'success': 1, 'id': type_id})))
        else:
            self.invalid_value('expense type ID not found')
        
    def upload_csv(self, account):
        self.response.out.write(json.dumps(({'success': 0, 'errors': 'upload_csv() not iomplemented yet'})))
        
    def invalid_value(self, field):
        self.response.out.write(json.dumps(({'success': 0, 'errors': 'Invalid value recieved: ' + field})))
        
    def operation_failed(self, msg):
        self.response.out.write(json.dumps(({'success': 0, 'errors': 'Operation failed: ' + msg})))
