from google.appengine.ext import ndb


class Method(ndb.Model):
    method_id = ndb.IntegerProperty(required=True)
    description = ndb.StringProperty(required=True)
    
