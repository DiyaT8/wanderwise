from flask import Flask, render_template, request, jsonify, redirect, url_for
import os
from flask_oauthlib.client import OAuth
import json

app = Flask(__name__)

# Configure the app for Google login
app.secret_key = os.urandom(24)
app.config['GOOGLE_ID'] = 'YOUR_GOOGLE_CLIENT_ID'
app.config['GOOGLE_SECRET'] = 'YOUR_GOOGLE_CLIENT_SECRET'
oauth = OAuth(app)
google = oauth.remote_app(
    'google',
    consumer_key=app.config['GOOGLE_ID'],
    consumer_secret=app.config['GOOGLE_SECRET'],
    request_token_params={
        'scope': 'email',
    },
    base_url='https://www.googleapis.com/oauth2/v1/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return google.authorize(callback=url_for('authorized', _external=True))

@app.route('/logout')
def logout():
    return redirect(url_for('index'))

@app.route('/authorized')
def authorized():
    response = google.authorized_response()
    if response is None or response.get('access_token') is None:
        return 'Access denied: reason={} error={}'.format(request.args['error_reason'], request.args['error_description'])

    session['google_token'] = (response['access_token'], '')
    user_info = google.get('userinfo')
    return jsonify(user_info.data)

if __name__ == '__main__':
    app.run(debug=True)
