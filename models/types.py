from google.appengine.ext import ndb


class ExpenseType(ndb.Model):
    type_id = ndb.IntegerProperty(required=True)
    description = ndb.StringProperty(required=True)
    active = ndb.BooleanProperty(required=True)
    
    def get_key(self, expense_type):
        # Construct a Datastore key for an expense type entity with it's name
        return ndb.Key('ExpenseType', expense_type)
    
def expense_type_get_by_type_id(account, type_id):
    for et in ExpenseType.query(ancestor=account).fetch():
        if et.type_id == int(type_id):
            return et
    else:
        return None

    
