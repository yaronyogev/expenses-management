from google.appengine.ext import ndb
import logging

class GeneralType(ndb.Model):
    id = ndb.IntegerProperty(required=True)
    name = ndb.StringProperty(required=True)
    active = ndb.BooleanProperty(required=True)
    
    def get_key(self, name):
        # Construct a Datastore key for a type instance entity with its name
        return ndb.Key(self.__class__, name)
