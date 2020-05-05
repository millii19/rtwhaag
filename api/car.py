import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)
channel = 25
GPIO.setup(channel, GPIO.OUT)

class Car:
    def __init__(self):
        self.lights = False

    def accelerate(self):
        print('accelerate')
        GPIO.output(channel, True)

    def slow(self):
        print('break')
        GPIO.output(channel, False)

    def steer(self, amount):
        print(f'steer {amount}')

    def toggle_ss(self):
        self.lights = not self.lights
        print(f'lights are {self.lights}')

    def cleanup(self):
        GPIO.cleanup(channel)