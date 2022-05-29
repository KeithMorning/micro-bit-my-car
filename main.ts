function headleft () {
    robotbit.Servo(robotbit.Servos.S8, 50)
}
function cardRun () {
    if (distancecheck() == 1) {
        forward()
    } else {
        stop()
        makeDirection()
    }
}
radio.onReceivedNumber(function (receivedNumber) {
    cardControlFlag = receivedNumber
    if (cardControlFlag == 0) {
        basic.showIcon(IconNames.SmallHeart)
        basic.pause(100)
        radioSend(0)
    } else {
        basic.showIcon(IconNames.Heart)
        basic.pause(100)
        radioSend(1)
    }
})
function turnLeft () {
    robotbit.MotorRun(robotbit.Motors.M1A, -100)
    robotbit.MotorRun(robotbit.Motors.M2A, 100)
}
function back () {
    robotbit.MotorRun(robotbit.Motors.M1A, -100)
    robotbit.MotorRun(robotbit.Motors.M2A, -100)
}
function makeDirection () {
    if (x <= closeDistance) {
        back()
        basic.pause(1000)
        turnRight()
        basic.pause(1200)
        forward()
    } else {
        rightDis()
        basic.pause(1000)
        headforward()
        basic.pause(100)
        leftDis()
        basic.pause(1000)
        headforward()
        if (left < closeDistance && right < closeDistance) {
            back()
            basic.pause(1000)
            turnRight()
            basic.pause(1200)
            forward()
        } else if (left >= right) {
            turnLeft()
            basic.pause(1200)
            forward()
        } else {
            turnRight()
            basic.pause(1200)
            forward()
        }
    }
}
function headright () {
    robotbit.Servo(robotbit.Servos.S8, 140)
}
function leftDis () {
    headleft()
    left = distance()
}
function radioSend (数字: number) {
    radio.sendNumber(数字)
}
function stop () {
    robotbit.MotorRun(robotbit.Motors.M1A, 0)
    robotbit.MotorRun(robotbit.Motors.M2A, 0)
}
function turnRight () {
    robotbit.MotorRun(robotbit.Motors.M1A, 100)
    robotbit.MotorRun(robotbit.Motors.M2A, -100)
}
function distancecheck () {
    dis = distance()
    if (dis <= nearDistance) {
        return 0
    } else {
        return 1
    }
}
function distance () {
    x = sonar.ping(
    DigitalPin.P13,
    DigitalPin.P12,
    PingUnit.Centimeters
    )
    return x
}
function forward () {
    robotbit.MotorRun(robotbit.Motors.M1A, 100)
    robotbit.MotorRun(robotbit.Motors.M2A, 100)
}
function headforward () {
    robotbit.Servo(robotbit.Servos.S8, 95)
}
function rightDis () {
    headright()
    right = distance()
}
let dis = 0
let right = 0
let left = 0
let x = 0
let cardControlFlag = 0
let nearDistance = 0
let closeDistance = 0
basic.showIcon(IconNames.SmallHeart)
closeDistance = 2
nearDistance = 5
cardControlFlag = 0
radio.setGroup(708)
stop()
headforward()
distancecheck()
basic.pause(500)
loops.everyInterval(100, function () {
    if (cardControlFlag == 0) {
        stop()
        basic.showIcon(IconNames.SmallHeart)
    } else {
        cardRun()
        basic.showIcon(IconNames.House)
    }
})
