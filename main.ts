let soil = 0
ESP8266ThingSpeak.connectWifi(
SerialPin.P15,
SerialPin.P16,
BaudRate.BaudRate115200,
"esp2866",
"makecode"
)
ESP8266ThingSpeak.wait(5000)
if (ESP8266ThingSpeak.isWifiConnected()) {
    basic.showIcon(IconNames.Happy)
    basic.clearScreen()
} else {
    basic.showIcon(IconNames.Sad)
    basic.clearScreen()
}
basic.forever(function () {
    ESP8266ThingSpeak.connectThingSpeak(
    "api.thingspeak.com",
    "2NZSI5A0HMZN7WJR",
    dht11_dht22.readData(dataType.temperature),
    dht11_dht22.readData(dataType.humidity),
    soil,
    input.lightLevel(),
    0,
    0,
    0,
    0
    )
})
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P2,
    true,
    false,
    true
    )
})
basic.forever(function () {
    if (input.lightLevel() <= 100) {
        pins.digitalWritePin(DigitalPin.P3, 1)
        if (input.lightLevel() > 100) {
            pins.digitalWritePin(DigitalPin.P3, 0)
        }
    } else {
        pins.digitalWritePin(DigitalPin.P3, 0)
    }
})
basic.forever(function () {
    soil = Math.idiv(pins.analogReadPin(AnalogPin.P4), 10)
    if (soil <= 50) {
        music.playMelody("- - C5 - C5 - - - ", 500)
        if (soil > 50) {
            music.stopAllSounds()
        }
    } else {
        music.stopAllSounds()
    }
})
