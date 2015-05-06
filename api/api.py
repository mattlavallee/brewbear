from flask import Flask, session, redirect, url_for
from login.login import login_api

SECRET_KEY = 'dev-key'
DEBUG = True

brewBearApi = Flask(__name__)
brewBearApi.debug = DEBUG
brewBearApi.secret_key = SECRET_KEY

brewBearApi.register_blueprint(login_api, url_prefix='/auth')

@brewBearApi.route('/')
def index():
    return "Hello World!"
    
@brewBearApi.route('/test')
def loginTest():
    access_token = session.get('access_token')
    if access_token is None:
        return redirect(url_for('login_api.login'))

    access_token = access_token[0]
    from urllib2 import Request, urlopen, URLError

    headers = {'Authorization': 'OAuth '+access_token}
    req = Request('https://www.googleapis.com/oauth2/v1/userinfo',
                  None, headers)
    try:
        res = urlopen(req)
    except URLError, e:
        if e.code == 401:
            # Unauthorized - bad token
            session.pop('access_token', None)
            return redirect('/auth/login')
        return res.read()

    return res.read()
    
if __name__ == '__main__':
    brewBearApi.run()