from flask import Flask
from flask_cors import CORS
from car import Car
from flask import request

app = Flask(__name__)
CORS(app)
car = Car()
car.start()

@app.route('/')
def hello_world():
    car.cleanup()
    return 'Hello World'

@app.route('/toggle_lights')
def toggle_lights():
    car.toggle_ss()
    return f'lights are {car.lights}'

@app.route('/steer/<int:target>')
def steer(target):
    car.steer(target)
    return f'steered {target}'

@app.route('/accelerate')
def accelerate():
    car.accelerate()
    return 'accelerate'

@app.route('/break')
def slow():
    car.slow()
    return 'break'


def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

@app.route('/shutdown', methods=['GET'])
def shutdown():
    car.cleanup()
    shutdown_server()
    return 'Server shutting down...'