import os
import urllib
import json

from google.appengine.api import users

from google.appengine.ext import ndb

import jinja2
import webapp2

from models.account import *
from models.expenses import Expense
from controllers.accountController import AccountHandler

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

#    <link rel="stylesheet" href="bootstrap.css">
EXTJS_HEAD_DEV = """
    <link rel="stylesheet" href="ext/packages/ext-theme-neptune/build/resources/ext-theme-neptune-all.css">
    <script src="ext/ext-dev.js"></script>
    <script src="bootstrap.js"></script>
    <script src="app.js"></script>
    """


class MainPage(webapp2.RequestHandler):

    def get(self):
        user = users.get_current_user()
        if user == None:
            return
        email = user.email()
        # find accounts where this user is member
        key = account_user_key_user(email)
        member_query = AccountUser.query(AccountUser.user_name == email)
        membership_list = member_query.fetch(10)
        is_new_account = False
        if (len(membership_list) ==  0):
            # no accounts for this user yet, create one with user as account owner
            is_new_account = True
            key = ndb.Key('Account', email)
            account = Account(parent = key)
            account.name = "My Expenses"
            account.owner = email
            account_key = account.put()
            account_user = AccountUser(parent = account_key)
            account_user.user_name = email
            account_user.account = account_key
            account_user.put()
            account.user = email
            accounts_data = [ {'name': account.name, 'owner': account.owner, 'user_name': email} ];
        else:
            accounts_data = []
            for account_user in membership_list:
                account = account_user.account.get()
                account_data = {'name': account.name, 'owner': account.owner, \
                    'user_name': account_user.user_name}
                accounts_data.append(account_data)
        template_values = {
            'extjs_head': EXTJS_HEAD_DEV,
            'user': email,
            'is_new_account': is_new_account,
            'accounts': accounts_data
        }
        self.write_page(template_values);

    def write_page(self, template_values):
        page = """
        <!DOCTYPE HTML>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>{}</title>
                {}
                {}
            </head>
            <body>
            </body>
        </html>
        """
        title = "Expenses Management"
        user_dump = json.dumps(template_values['user'])
        new_account_dump = json.dumps(template_values['is_new_account'])
        accounts_dump = json.dumps(template_values['accounts'])
        user_accounts = """
        <script>
        var user = {},
            is_new_account = {},
            accounts = {},
            user_data = new Object();
        </script>
        """.format(user_dump, new_account_dump, accounts_dump)
        page = page.format(title, template_values['extjs_head'], user_accounts)
        self.response.write(page);


application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/account/', AccountHandler),
    ('/users_list', AccountHandler),
    ('/types_list', AccountHandler),
    ('/methods_list', AccountHandler),
    ('/expenses_list', AccountHandler)
], debug=True)

