from google.appengine.ext import ndb


class Expense(ndb.Model):
    date = ndb.DateProperty(required=True)
    expense_type = ndb.KeyProperty(required=True)
    amount = ndb.FloatProperty(required=True)
    description = ndb.StringProperty()
    method = ndb.KeyProperty(required=True)
    who = ndb.KeyProperty()
    charge_date = ndb.DateProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)
    
