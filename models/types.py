from google.appengine.ext import ndb


class ExpenseType(ndb.Model):
    expense_type = ndb.IntegerProperty(required=True)
    description = ndb.StringProperty(required=True)
    
