const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=866f38600b84a3779a02bef4c9a84a37&query=' + latitude + ',' + longitude + '&units=f'

    request( { url, json: true} , (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const humidity = body.current.humidity

            callback(undefined, body.current.weather_descriptions[0] +
                 '. It is currently ' + temperature + ' degrees out. It feels like ' + 
                 feelslike + ' degrees. Humidity is: ' + humidity + '%.')
        }
    } )

}

module.exports = forecast