def headleft():
    robotbit.servo(robotbit.Servos.S8, 50)
def turnLeft():
    robotbit.motor_run(robotbit.Motors.M1A, 100)
    robotbit.motor_run(robotbit.Motors.M2A, 0)
def back():
    robotbit.motor_run(robotbit.Motors.M1A, -100)
    robotbit.motor_run(robotbit.Motors.M2A, -100)
def makeDirection():
    if x <= closeDistance:
        back()
        basic.pause(1000)
        turnRight()
        basic.pause(1200)
        forward()
    else:
        rightDis()
        basic.pause(1000)
        headforward()
        basic.pause(100)
        leftDis()
        basic.pause(1000)
        headforward()
        if left < closeDistance and right < closeDistance:
            back()
            basic.pause(1000)
            turnRight()
            basic.pause(1200)
            forward()
        elif left >= right:
            turnLeft()
            basic.pause(1200)
            forward()
        else:
            turnRight()
            basic.pause(1200)
            forward()
def headright():
    robotbit.servo(robotbit.Servos.S8, 140)
def leftDis():
    global left
    headleft()
    left = distance()
def stop():
    robotbit.motor_run(robotbit.Motors.M1A, 0)
    robotbit.motor_run(robotbit.Motors.M2A, 0)
def turnRight():
    robotbit.motor_run(robotbit.Motors.M1A, 0)
    robotbit.motor_run(robotbit.Motors.M2A, 100)
def distancecheck():
    global dis
    dis = distance()
    if dis <= nearDistance:
        return 0
    else:
        return 1
def distance():
    global x
    x = sonar.ping(DigitalPin.P13, DigitalPin.P12, PingUnit.CENTIMETERS)
    return x
def forward():
    robotbit.motor_run(robotbit.Motors.M1A, 100)
    robotbit.motor_run(robotbit.Motors.M2A, 100)
def headforward():
    robotbit.servo(robotbit.Servos.S8, 95)
def rightDis():
    global right
    headright()
    right = distance()
dis = 0
right = 0
left = 0
x = 0
nearDistance = 0
closeDistance = 0
basic.show_icon(IconNames.PITCHFORK)
closeDistance = 2
nearDistance = 5
stop()
headforward()
distancecheck()
basic.pause(500)

def on_every_interval():
    if distancecheck() == 1:
        forward()
    else:
        stop()
        makeDirection()
    basic.show_icon(IconNames.HOUSE)
loops.every_interval(100, on_every_interval)
