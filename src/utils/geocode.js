const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
         + encodeURIComponent(address) 
         + '.json?limit=1&access_token=pk.eyJ1IjoiMDAwNzY3MDgiLCJhIjoiY2w1MDNrcDR6MHFuMzNka2M0azZ1cHZ0OSJ9.PoW27Y9hcTUqaAKSNB0lng'
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location Services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode