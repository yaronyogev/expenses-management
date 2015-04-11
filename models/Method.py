from google.appengine.ext import ndb

from models.GeneralType import GeneralType

class Method(GeneralType):
    monthly_payment = ndb.IntegerProperty(required=False)
    payment_deffered_days = ndb.IntegerProperty(required=False)

    def set_values(self, id, name, is_active, req):
        GeneralType.set_values(self, id, name, is_active, req)
        try:
            self.monthly_payment = req.get('monthly_payment')
        except InvalidPropertyError:
            return 'Illegal value in monthly payment'
        if self.monthly_payment < 0 or self.monthly_payment > 31:
            return 'monthly payment day should be between 0 (none) and 31'
        try:
            self.payment_deffered_days = req.get('payment_deffered_days')
        except InvalidPropertyError:
            return 'Illegal value in deffered days'
        if self.payment_deffered_days < 0:
            return 'payment deffered days does not accept negative values'
        return True
