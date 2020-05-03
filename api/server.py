from flask import Flask
from car import Car

app = Flask(__name__)
car = Car()

@app.route('/')
def hello_world():
    return 'Hello World'

@app.route('/toggle_lights')
def toggle_lights():
    car.toggle_ss()
    return f'lights are {car.lights}'

@app.route('/steer/<int:amount>')
def steer(target):
    car.steer(target)
    return f'steered {amount}'

@app.route('/accelerate')
def accelerate():
    car.accelerate()
    return 'accelerate'

@app.route('/break')
def break():
    car.slow()
    return 'break'