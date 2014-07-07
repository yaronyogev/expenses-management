import webapp2
import json
import logging

from google.appengine.api import users
# XXX from google.appengine.ext.db import 

from models.types import *
from models.account import *

class ExpenseTypesController(webapp2.RequestHandler):
    def post(self):
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
        else:
            self.invalid_value('unknown action specified')

    def get(self):
        logging.info(self.request)
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
                'entity_id': et.key.id(),
                'name': et.description, \
                'active': et.active})
        self.response.out.write(json.dumps({ \
            'user_name': email, \
            'account_name': account_name, \
            'account_owner': account_owner, \
            'rows': types_list}))

    def put(self, args):
        payload = json.loads(self.request.body)
        req = self.request
        account_name = req.get('account_name')
        account_owner = req.get('account_owner')
        account_found = find_account(self.request)
        if (type(account_found) == 'String'):
            self.invalid_value(account_found)
            return
        account = account_key(account_name, account_owner)
        if payload['id'] == 0:
            et = ExpenseType(parent=account)
            et.description = payload['name']
            et.active = payload['active']
            # find the largest type ID x for this account, and return new type ID that is x+1
            q = ExpenseType.query(ancestor=account).order(-ExpenseType.type_id)
            results = q.fetch(1)
            new_id = 1
            for old in results:
                new_id = old.type_id + 1
            et.type_id = new_id
            try:
                et.put()
                resp = json.dumps(({'success': 1, 'id': et.id, 'entity_id': et.entity_id}))
                self.response.out.write(resp)
            except:
                self.operation_failed('unable to write expense type record')
        else:
            type_id = payload['id']
            et = expense_type_get_by_type_id(account, type_id)
            for et in ExpenseType.query(ancestor=account).fetch():
                if et.type_id == int(type_id):
                    et.description = payload['name']
                    et.active = payload['active']
                    et.put()
                    resp = json.dumps(({'success': 1, 'id': et.type_id}))
                    self.response.out.write(resp)
                    return
            else:
                self.invalid_value("unable to find type with type_id=" + type_id)
        
    def delete_type(self, account, type_id):
        logging.info('delete_type: got id %s', type_id)
        et = expense_type_get_by_type_id(account, type_id)
        if et != None:
            try:
                et.delete()
            except:
                self.operation_failed('Unable to delete expense type')
                return
            self.response.out.write(json.dumps(({'success': 0})))
        else:
            self.invalid_value('expense type ID not found')
        
    def invalid_value(self, field):
        self.response.out.write(json.dumps(({'success': 0, 'errors': 'Invalid value recieved: ' + field})))
        
    def operation_failed(self, msg):
        self.response.out.write(json.dumps(({'success': 0, 'errors': 'Operation failed: ' + msg})))
