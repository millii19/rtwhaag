import RPi.GPIO as GPIO
from time import sleep
import threading
from random import randint


    

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
        self.running = True
        self.thread = None
    
    def start(self):
        self.thread = threading.Thread(target=self._steer_loop)
        self.thread.start()

    def accelerate(self):
        print('accelerate')
        GPIO.output(drive_channel, True)

    def slow(self):
        print('break')
        GPIO.output(drive_channel, False)

    def steer(self, amount):
        if amount is self.amount:
            return
        self.amount = amount
    
    def _steer_loop1(self):
        def getDuty(amount):
            target = max_rot * amount / 100
            duty = target / 18 + 2
            return duty

        while self.running:
            sleep(2)
            
            GPIO.output(steer_channel, True)
            steer.ChangeDutyCycle(getDuty(0))
            sleep(0.1)
            steer.ChangeDutyCycle(getDuty(50))
            sleep(0.1)
            steer.ChangeDutyCycle(getDuty(100))
            sleep(0.1)
            steer.ChangeDutyCycle(getDuty(50))
            sleep(0.5)
            GPIO.output(steer_channel, False)


    def _steer_loop(self):
        
        while self.running:
            local_amt = randint(0, 100)
            target = max_rot * local_amt/ 100
            duty = target / 18 + 2
            GPIO.output(steer_channel, True)
            steer.ChangeDutyCycle(duty)
            sleep(0.1)
            GPIO.output(steer_channel, False)

    def _steer_loop2(self):
        local_amt = self.amount
        while self.running:
            if local_amt is self.amount:
                sleep(0.5)
                continue
            else:
                local_amt = self.amount
            target = max_rot * self.amount / 100
            duty = target / 18 + 2
            print(f'{target}   {duty}')
            GPIO.output(steer_channel, True)
            steer.ChangeDutyCycle(duty)
            sleep(0.05)
            GPIO.output(steer_channel, False)

    def toggle_ss(self):
        self.lights = not self.lights
        print(f'lights are {self.lights}')

    def cleanup(self):
        self.running = False
        print('waiting for steer loop')
        self.thread.join()
        print('joined')
        GPIO.output(drive_channel, False)
        GPIO.cleanup(drive_channel)
        GPIO.output(steer_channel, False)
        GPIO.cleanup(steer_channel)