

class Car:
    def __init__(self):
        self.lights = False

    def accelerate(self):
        print('accelerate')

    def slow(self):
        print('break')

    def steer(self, amount):
        print(f'steer {amount}')

    def toggle_ss(self):
        self.lights = not self.lights
        print(f'lights are {self.lights}')