from flask import Flask
from flask_cors import CORS
from flask import request

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello World'

@app.route('/toggle_lights')
def toggle_lights():
    return f'lights are toggled'

@app.route('/steer/<int:target>')
def steer(target):
    return f'steered {target}'

@app.route('/accelerate')
def accelerate():
    return 'accelerate'

@app.route('/break')
def slow():
    return 'break'

@app.route('/toggle/<int:pin>', methods=['GET'])
def toggle(pin):
    return f'Toggled pin {pin}'

def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

@app.route('/shutdown', methods=['GET'])
def shutdown():
    shutdown_server()
    return 'Server shutting down...'