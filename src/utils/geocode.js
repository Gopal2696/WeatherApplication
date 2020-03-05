const request = require('request')


const geocode = (address, callback) => {
    const geocodeurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiZ29wYWwyMTYiLCJhIjoiY2s2eXBzcHprMDJ1cjNucnlhNm9tampvdiJ9.dQaVPdBkd58-iLz0r9Iaxw&limit=1"
    
    request({url: geocodeurl, json: true}, (error, {body}) => {
        if (error){
            console.log(error)
            callback('unable to connect to location application', undefined)
        } else if(body.features.length === 0) {
            callback('unable to find location, search with different location', undefined)
        } else {
        callback(undefined  , {
            latitude : body.features[0].center[1],
            longitude : body.features[0].center[0],
            place_name : body.features[0].place_name} ) 
        }
    })

}


module.exports = geocode