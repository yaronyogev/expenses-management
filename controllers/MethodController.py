import webapp2

from controllers.RequestController import RequestController
from models.Method import Method

class MethodController(RequestController):
    objectClass = 'Method'
    objectName = 'method'

    def get_object(self, i):
        return { \
            'id': i.id, \
            'name': i.name, \
            'active': i.active, \
            'monthly_payment': i.monthly_payment, \
            'payment_deferred_days': i.payment_deferred_days
        }

    def get(self):
        self.clsRef = Method
        super(MethodController, self).get()

    def post(self):
        self.clsRef = Method
        super(MethodController, self).post()
