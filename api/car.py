import RPi.GPIO as GPIO
from time import sleep
import threading
from random import randint
import math


    

GPIO.setmode(GPIO.BOARD)
drive_channel = 32 # GPIO12
steer_channel = 12 # GPIO18
led_linksvorne_channel = 22 # GPIO25
led_rechtsvorne_channel = 24 # GPIO8
led_linkshinten_channel = 26 # GPIO7
led_rechtshinten_channel = 21 # GPIO9
GPIO.setup(drive_channel, GPIO.OUT)
GPIO.setup(steer_channel, GPIO.OUT)

GPIO.setup(led_linkshinten_channel, GPIO.OUT)
GPIO.setup(led_linksvorne_channel, GPIO.OUT)
GPIO.setup(led_rechtshinten_channel, GPIO.OUT)
GPIO.setup(led_rechtsvorne_channel, GPIO.OUT)


drive = GPIO.PWM(drive_channel, 50)
drive.start(0)
steer = GPIO.PWM(steer_channel, 50)
steer.start(0)
max_rot = 104.4

class Car:
    def __init__(self):
        self.lights = False
        self.amount = 50
        self.speed = 0
        self.running = True
        self.steer_thread = None
        self.speed_thread = None
        self.ss_thread = None
        self.toggle_pins = set()
    
    def start(self):
        self.steer_thread = threading.Thread(target=self._steer_loop)
        self.steer_thread.start()
        self.speed_thread = threading.Thread(target=self._speed_loop)
        self.speed_thread.start()
        #self.ss_thread = threading.Thread(target=self._ss_loop)
        #self.ss_thread.start()
        GPIO.output(drive_channel, True)
    

    def _ss_rythm(self, pin):
        while (self.lights and self.running):
            GPIO.output(pin, True)
            sleep(0.6)
            GPIO.output(pin, False)
            sleep(0.05)
            GPIO.output(pin, True)
            sleep(0.05)
            GPIO.output(pin, False)
            sleep(0.05)
            GPIO.output(pin, True)
            sleep(0.05)
            GPIO.output(pin, False)
            sleep(0.05)
            GPIO.output(pin, True)
            sleep(0.05)
            GPIO.output(pin, False)
            sleep(0.05)


    def _ss_loop(self):
        thread_lv = threading.Thread(target=self._ss_rythm, args=(led_linksvorne_channel,))
        thread_lh = threading.Thread(target=self._ss_rythm, args=(led_linkshinten_channel,))
        thread_rv = threading.Thread(target=self._ss_rythm, args=(led_rechtsvorne_channel,))
        thread_rh = threading.Thread(target=self._ss_rythm, args=(led_rechtshinten_channel,))
        thread_lv.start()
        sleep(0.1)
        thread_lh.start()
        sleep(0.1)
        thread_rv.start()
        sleep(0.1)
        thread_rh.start()
        
        thread_lv.join()
        thread_lh.join()
        thread_rv.join()
        thread_rh.join()


    def _speed_loop(self):
        i = 0
        while self.running:
            sleep(0.05)
            drive.ChangeDutyCycle(round(self.speed))
            i += 1
            if i is 10:
                print(f'speed: {self.speed}')
                i = 0


    def accelerate(self, target):
        print('accelerate')
        self.speed = target
        #GPIO.output(drive_channel, True)

    def slow(self):
        print('break')
        self.speed = round(max(0, (self.speed-1)*0.8), 2)
        
        # GPIO.output(drive_channel, False)

    def steer(self, amount):
        if amount is self.amount:
            return
        self.amount = amount
    
    @staticmethod
    def getDuty(amount):
        target = max_rot * amount / 100
        duty = target / 18 + 2
        return round(duty, 3) 

    def _steer_loop1(self):
        

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


    def _steer_loop3(self):
        
        while self.running:
            local_amt = randint(0, 100)
            target = max_rot * local_amt/ 100
            duty = target / 18 + 2
            GPIO.output(steer_channel, True)
            steer.ChangeDutyCycle(duty)
            sleep(0.1)
            GPIO.output(steer_channel, False)

    def _steer_loop(self):
        GPIO.output(steer_channel, True)
        local_amt = 0
        while self.running:
            if math.fabs(local_amt - self.amount) <= 3:
                sleep(0.1)
                continue
            else:
                local_amt = self.amount
            duty = self.getDuty(self.amount)
            print(f'{self.amount}   {duty}')
            
            steer.ChangeDutyCycle(duty)
            sleep(0.1)
        
        GPIO.output(steer_channel, False)

    def toggle_ss(self):
        self.lights = not self.lights
        if self.lights:
            self.ss_thread = threading.Thread(target=self._ss_loop)
            self.ss_thread.start()
        else:
            self.ss_thread.join()
        print(f'lights are {self.lights}')

    def toggle(self, pin):
        if pin not in self.toggle_pins:
            self.toggle_pins.add(pin)
            GPIO.setup(pin, GPIO.OUT)
            GPIO.output(pin, True)
        else:
            self.toggle_pins.remove(pin)
            GPIO.output(pin, False)
            GPIO.cleanup(pin)

    def cleanup(self):
        self.lights = False
        self.running = False
        print('waiting for loops')
        self.steer_thread.join()
        self.speed_thread.join()
        self.ss_thread.join()
        print('joined')
        drive.ChangeDutyCycle(0)
        GPIO.output(drive_channel, False)
        GPIO.cleanup(drive_channel)
        GPIO.output(steer_channel, True)
        steer.ChangeDutyCycle(self.getDuty(50))
        sleep(0.5)
        GPIO.output(steer_channel, False)
        GPIO.cleanup(steer_channel)

        
        GPIO.cleanup(led_linkshinten_channel)
        GPIO.cleanup(led_linksvorne_channel)
        GPIO.cleanup(led_rechtshinten_channel)
        GPIO.cleanup(led_rechtsvorne_channel)

        for p in self.toggle_pins:
            GPIO.output(p, False)
            GPIO.cleanup(p)