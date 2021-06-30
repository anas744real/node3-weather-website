const weatherForm = document.querySelector('form')
const search = document.querySelector("input")

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()    
    const location = search.value
    forecast_url = '/weather?address=' + location
    const errorResult = document.getElementById("error")
    const forecastResult =  document.getElementById("forecast")
    const locationResult = document.getElementById("location")
    const loader = document.querySelector("#loader")
    const weather_icon = document.querySelector("#weather-icon")
    
    loader.classList.add("loader")
    
    forecastResult.innerHTML = ''
    locationResult.innerHTML = ''
    errorResult.innerHTML = ''
    weather_icon.innerHTML=''

    fetch(forecast_url).then((response)=>{
     response.json().then((data)=>{
        if(data.error){
            loader.classList.remove("loader")
            errorResult.innerHTML = data.error
            
           
        }
        else{ 
            
            console.log(data)        
            loader.classList.remove("loader")
            forecastResult.innerHTML = data.forecast
            locationResult.innerHTML = data.location
            weather_icon.innerHTML = '<img src="https://openweathermap.org/img/wn/'+data.weather_icon+'@2x.png"></img>'
            
            
        }
        
    })
})

    
})