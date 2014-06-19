from google.appengine.ext import ndb


class AccountUser(ndb.Model):
    user_name = ndb.StringProperty(required=True)
    account = ndb.KeyProperty(required=True)

def account_user_key_owner(owner_name):
    # Construct Datastore key for AccountUser entity by owner name
    return ndb.Key('AccountUser', owner_name)
    
def account_user_key_user(user_name):
    # Construct Datastore key for AccountUser entity by user name
    return ndb.Key('AccountUser', user_name)
    
