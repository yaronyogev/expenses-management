from google.appengine.ext import ndb
from google.appengine.api import users
import logging

class Account(ndb.Model):
    name = ndb.StringProperty(required=True)
    owner = ndb.StringProperty(required=True)
    created = ndb.DateTimeProperty(auto_now_add=True)

def account_key(account_name, owner):
    # Construct Datastore key for Account entity with account_name + owner
    return ndb.Key('Account', account_name + ";" + owner)

# find account specified in request
# if not matching, return string with error
# if matching, return 'OK'
def find_account(request):
    user = users.get_current_user()
    if user == None:
        return 'not logged in'
    email = user.email()
    account_name = request.get('account_name')
    account_owner = request.get('account_owner')
    account_user_name = request.get('account_user')
    
    # verify that access to this account is permitted to this user
    if account_user_name != user.email():
        return 'user mismatch'
   
    # now verify that this tuple really exists
    accounts_query = Account.query(Account.owner==account_owner, \
        Account.name==account_name)
    accounts = accounts_query.fetch(1)
    for account in accounts:
        account_users = AccountUser.query(ancestor=account_key(account_name, account_owner))
        for entry in account_users:
            if (entry.user_name == account_user_name):
                return account
        return 'user not found'
    return 'account not found'

class AccountUser(ndb.Model):
    user_name = ndb.StringProperty(required=True)

def account_user_key_user(user_name):
    # Construct Datastore key for AccountUser entity by user name
    return ndb.Key('AccountUser', user_name)
    
