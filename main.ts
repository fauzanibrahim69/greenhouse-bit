let soil = 0
ESP8266ThingSpeak.connectWifi(
SerialPin.P13,
SerialPin.P14,
BaudRate.BaudRate115200,
"your_ssid",
"your_pw"
)
basic.forever(function () {
    soil = Math.idiv(pins.analogReadPin(AnalogPin.P0), 10)
    if (soil <= 50) {
        music.playMelody("C5 - - - - - - - ", 120)
        if (soil == 50) {
            music.stopAllSounds()
        }
    } else {
        music.stopAllSounds()
    }
})
basic.forever(function () {
    ESP8266ThingSpeak.connectThingSpeak(
    "api.thingspeak.com",
    "your_write_api_key",
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
