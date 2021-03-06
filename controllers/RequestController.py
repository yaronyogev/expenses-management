import webapp2
import json
import logging

from google.appengine.api import users

from models.account import *

class RequestController(webapp2.RequestHandler):
    account = None

    def checkAccount(self):
        user = users.get_current_user()
        if user == None:
            self.invalid_value('not logged in')
            return False
        req = self.request
        self.account_name = req.get('account_name')
        self.account_owner = req.get('account_owner')
        self.account_user = self.request.get('account_user')
        self.email = user.email()
        account_found = find_account(self.request)
        if (type(account_found) == 'String'):
            self.invalid_value(account_found)
            return False

        # verify that access to this account is permitted to this user
        if self.account_user != user.email():
            self.invalid_value('user mismatch')
            return true

        self.account = account_key(self.account_name, self.account_owner)
        return True

    def get_object(self, i):
        return {'id': i.id, 'name': i.name, 'active': i.active}

    def get(self):
        logging.info('in RequestController get()')
        if not self.checkAccount():
            return;
        query = self.clsRef.query(ancestor=self.account).order(self.clsRef.name)
        start_offset = int(self.request.get('start'))
        limit = self.request.get('limit')
        if limit=='':
            instances = query.fetch()
        else:
            limit = int(limit)
            instances = query.fetch(limit, offset=start_offset)
        list = []
        for i in instances:
            list.append(self.get_object(i))
        self.response.out.write(json.dumps({ \
            'user_name': self.email, \
            'account_name': self.account_name, \
            'account_owner': self.account_owner, \
            'rows': list}))

    def post(self):
        logging.info('in RequestController post()')
        if not self.checkAccount():
            return;
        req = self.request
        id = req.get('id')
        if id == None:
            self.invalid_value('id not specified')
            return
        else:
            try:
                id = int(id);
            except:
                self.invalid_value('id')
                return
        if (self.request.get('action') == 'delete'):
            self.delete_instance(id)
            return
        name = req.get('name')
        if name == None or name == '':
            self.invalid_value('name must be specified')
            return
        is_active = req.get('active') == 'true'
        p = None
        if id == 0:
            if self.get_by_name(name) != None:
                self.invalid_value(self.objectName + ' exists: ' + name)
                return
            i = self.clsRef(parent=self.account)
            # find the largest type ID x for this account,
            # and return new type ID that is x+1
            q = self.clsRef.query(ancestor=self.account).order(-self.clsRef.id)
            results = q.fetch(1)
            new_id = 1
            for old in results:
                new_id = old.id + 1
            set_value_result = i.set_values(new_id, name, active, req)
            if set_values_result != True:
                self.invalid_value(set_values_result)
                return
            i.put()
            resp = json.dumps(({'success': 1, 'id': new_id}))
            self.response.out.write(resp)
        else:
            record_to_change = None
            for p in self.clsRef.query(ancestor=self.account).fetch():
                if p.id == id:
                    record_to_change = p
                else:
                    if p.name == name:
                        self.invalid_value('expense type exists: ' + name)
                        return
            if record_to_change == None:
                self.invalid_value('unable to find ' + self.objectName + \
                    ' with id=' + id)
                return
            set_value_result = record_to_change.set_values(id, \
                name, is_active, req)
            if set_values_result != True:
                self.invalid_value(set_values_result)
                return
            record_to_change.put()
            resp = json.dumps(({'success': 1, 'id': record_to_change.id}))
            self.response.out.write(resp)
            return

    def delete_instance(self, id):
        p = self.get_by_id(id)
        if p != None:
            p.key.delete()
            self.response.out.write(json.dumps(({'success': 1, 'id': id})))
        else:
            self.invalid_value('Delete failed: ID not found')

    def invalid_value(self, field):
        self.response.out.write(json.dumps(({'success': 0, 'errors': 'Invalid value recieved: ' + field})))

    def operation_failed(self, msg):
        self.response.out.write(json.dumps(({'success': 0, 'errors': 'Operation failed: ' + msg})))

    def get_by_id(self, id):
        for i in self.clsRef.query(ancestor=self.account).fetch():
            if i.id == id:
                return i
        return None

    def get_by_name(self, name):
        for i in self.clsRef.query(ancestor=self.account).fetch():
            if i.name == name:
                return i
        return None
