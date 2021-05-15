const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=93ebb336d199c69cdda7e08ce206ae0a&query='+lat+','+long+'&units=m'
    request( {url, json: true}, (error, {body}) => {
    if(error){
        console.log('Unable to connect to weather service! ', undefined);
    }
    else if(body.error){
        console.log('Unable to find Location', undefined);
    }
    else{    
        callback(undefined, 
            body.current.weather_descriptions[0]+'. It is currently '+ body.current.temperature+ ' but it feels like '+ body.current.feelslike
        )
    }
})
}

module.exports = forecast