from google.appengine.ext import ndb


class Account(ndb.Model):
    name = ndb.StringProperty(required=True)
    owner = ndb.StringProperty(required=True)
    created = ndb.DateTimeProperty(auto_now_add=True)

def account_key(account_name):
    # Construct Datastore key for Account entity with account_name
    return ndb.Key('Account', account_name)


class AccountUser(ndb.Model):
    user_name = ndb.StringProperty(required=True)
    account = ndb.KeyProperty(required=True)

def account_user_key_owner(owner_name):
    # Construct Datastore key for AccountUser entity by owner name
    return ndb.Key('AccountUser', owner_name)
    
def account_user_key_user(user_name):
    # Construct Datastore key for AccountUser entity by user name
    return ndb.Key('AccountUser', user_name)
    
