from flask import Blueprint, abort, session, redirect, url_for
from bboauth import BBLogin

login_api = Blueprint('login_api', __name__)
login = BBLogin()
google = login.google

@login_api.route('/login')
def login():
    callback = url_for('.authorized', _external=True)
    return google.authorize(callback=callback)

@login_api.route('/logout')
def logout():
    session.pop('access_token', None);
    return redirect(url_for('index'))
	
@login_api.route( '/google_auth' )
@google.authorized_handler
def authorized(resp):
    try:
        access_token = resp['access_token']
        session['access_token'] = access_token, ''
        return redirect(url_for('index'))
    except:
        return redirect(url_for('.logout'))


@google.tokengetter
def get_access_token():
    return session.get('access_token')