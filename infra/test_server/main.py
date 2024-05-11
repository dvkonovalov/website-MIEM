"""A simple server with readiness check."""

import json
import os

from flask import Flask

DEFAULT_PORT = 8080
APP_PORT = int(os.environ.get('PORT', DEFAULT_PORT))

app: Flask = Flask('server', static_url_path='')


@app.route('/ping')
def _ping():
    return 'Pong'


@app.route('/version')
def _version():
    return json.dumps({
        'version': os.environ.get('SERVER_VERSION') or 'Unknown version',
    })


@app.route('/')
def _home():
    return 'Hello world'


if __name__ == '__main__':
    app.run(port=APP_PORT, host='::', threaded=True)
