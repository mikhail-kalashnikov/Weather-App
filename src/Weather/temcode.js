const request = require('request')
const temCode = (latitude, longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/490f0f0c1278e15ce09db87a504a3a5a/' + latitude +','+ longitude
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('No internet connection!', undefined)
        }else if(body.error){
            callback('Unable to find this location', undefined)
        }else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}
module.exports = {
    temCode: temCode
}