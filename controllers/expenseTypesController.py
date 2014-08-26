import webapp2
import json
import logging

from google.appengine.api import users

from controllers.RequestController import RequestController
from models.ExpenseType import ExpenseType

class ExpenseTypesController(RequestController):
    objectClass = 'ExpenseType'
    objectName = 'expense type'
    
    def get(self):
        self.clsRef = ExpenseType
        logging.info('in ExpenseTypesController get()')
        super(ExpenseTypesController, self).get()
    
    def post(self):
        self.clsRef = ExpenseType
        logging.info('in ExpenseTypesController post()')
        super(ExpenseTypesController, self).post()
