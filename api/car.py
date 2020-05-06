import RPi.GPIO as GPIO
from time import sleep

GPIO.setmode(GPIO.BOARD)
drive_channel = 22 # GPIO25
steer_channel = 12 # GPIO18
GPIO.setup(drive_channel, GPIO.OUT)
GPIO.setup(steer_channel, GPIO.OUT)
steer = GPIO.PWM(steer_channel, 50)
steer.start(0)
max_rot = 104.4

class Car:
    def __init__(self):
        self.lights = False
        self.amount = 50

    def accelerate(self):
        print('accelerate')
        GPIO.output(drive_channel, True)

    def slow(self):
        print('break')
        GPIO.output(drive_channel, False)

    def steer(self, amount):
        if amount is self.amount:
            return
        target = max_rot * amount / 100
        duty = target / 18 + 2
        GPIO.output(steer_channel, True)
        steer.ChangeDutyCycle(duty)
        sleep(0.05)
        GPIO.output(steer_channel, False)

        print(f'steer {amount}')

    def toggle_ss(self):
        self.lights = not self.lights
        print(f'lights are {self.lights}')

    def cleanup(self):
        GPIO.output(drive_channel, False)
        GPIO.cleanup(drive_channel)
        GPIO.output(steer_channel, False)
        GPIO.cleanup(steer_channel)