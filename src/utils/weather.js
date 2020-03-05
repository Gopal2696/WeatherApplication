const request = require('request')


const forecast =  (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/832078796912cac884efcd6e8a1bffcc/" + latitude + "," + longitude 
    request({url:url, json:true}, (error, {body}) => {
    if (error){
            callback('unable to connect to weather App' , undefined) // May be Network connection 
    } else if (body.error) {
            callback('unable to find location', undefined)
    } else {
            callback(undefined, body.daily.data[0].summary + ' It is currentlly ' + body.currently.temperature + ' degrees out. ' + 'There is ' + body.currently.precipProbability + '% chance of rain')
    }
}
    )
        }


module.exports = forecast