import webapp2
import json


class AccountHandler(webapp2.RequestHandler):
    def post(self):
        logging.info(self.request.body)
        data = json.loads(self.request.body)
        action = data['action']
        if (action == 'get_accounts'):
            get_accounts(data);
        else:
            self.response.out.write(json.dumps({'error': 'unknown action'}))

    def get_accounts(data):
        self.response.out.write(json.dumps(({'user': email, 'accounts': accounts.to_dict()})))
