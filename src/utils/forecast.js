const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 
        'http://api.weatherstack.com/current?access_key=223f0f899e183b89a1381a5d3bb8a85b&query=' 
        + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) 
        // + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.success === false) {
            callback('Unable to find location!', undefined)
        } else {
            const cur = body.current
            callback(undefined, {
                description: cur.weather_descriptions[0],
                temperature: cur.temperature,
                feelslike: cur.feelslike
            })
        }
    })
}

module.exports = forecast