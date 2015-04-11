from google.appengine.ext import ndb
import logging

class GeneralType(ndb.Model):
    id = ndb.IntegerProperty(required=True)
    name = ndb.StringProperty(required=True)
    active = ndb.BooleanProperty(required=True)

    def set_values(self, id, name, is_active, req):
        self.id = new_id
        self.name = name
        self.active = is_active
        return True

    def get_key(self, name):
        # Construct a Datastore key for a type instance entity with its name
        return ndb.Key(self.__class__, name)
