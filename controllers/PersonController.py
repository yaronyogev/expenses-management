import webapp2

from controllers.RequestController import RequestController
from models.Person import Person

class PersonController(RequestController):
    objectClass = 'Person'
    objectName = 'person'
    
    def get(self):
        self.clsRef = Person
        super(PersonController, self).get()
    
    def post(self):
        self.clsRef = Person
        super(PersonController, self).post()
