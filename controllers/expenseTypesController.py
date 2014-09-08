import webapp2

from controllers.RequestController import RequestController
from models.ExpenseType import ExpenseType

class ExpenseTypesController(RequestController):
    objectClass = 'ExpenseType'
    objectName = 'expense type'
    
    def get(self):
        self.clsRef = ExpenseType
        super(ExpenseTypesController, self).get()
    
    def post(self):
        self.clsRef = ExpenseType
        super(ExpenseTypesController, self).post()
