const request = require('request')
const gecode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaG9hbmd2dXZpZXQiLCJhIjoiY2p6dTQ3bHZtMGNhNDNtcDl3eHhkNzAxNiJ9.IvqQVgFCUJk01P_UZrg_Ig'
    request({ url, json: true }, (error, { body }) => { //Destructuring Assignment in ES6
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = {
    gecode: gecode
}