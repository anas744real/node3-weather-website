const request = require('request')

const forecast = (lon,lat,callback)=>{ 
        const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat +'&'+'lon='+lon+'&units=metric&appid=80a9482a875d84fb1197e2f985c0493c'
          
        debugger
        request({url, json:true},(error,{body})=>{
        if(error){
                callback('Unable to connect to weather services!', undefined)
        } else if(body.message){
                callback('Unable to find location. Try another search', undefined)
        }else{
                const weather_icon = body.weather[0].icon
                
                callback(undefined,{ 
                        forecast_data: body.weather[0].description +  '.It is '+body.main.temp +' degrees outside.',
                        weather_icon:weather_icon
                        }
               
               
                
                )
        }
    })
}

module.exports = forecast

