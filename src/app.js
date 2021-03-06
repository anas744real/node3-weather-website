const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { Console } = require('console')
const { isBuffer } = require('util')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlesbars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

  
app.get('', (req, res)=>{
    
    res.render('index',{
            title:'Weather',
            name:'Anas Ibrahim',
    })
})
 
app.get('/about', (req, res)=>{
    res.render('about',{
        title:'About Me',
        name:'Anas Ibrahim'

    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Anas Ibrahim',
        message:'Welcome to the Help Page. Please read through for guidelines!',
    })
})



app.get('/weather',(req,res)=>{
    const address = req.query.address
    if(!address){
        return res.send({
            error:'Please enter a city!'
        })
    }

    geocode(address, (error, {latitude,longitude,location}={}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                address,
                forecast:forecastData.forecast_data,
                location,
                weather_icon:forecastData.weather_icon,
                })
                
              })
      })
}

)


app.get('/help/*', (req,res) =>{
    res.render('404',{
        title:'404',
        name:'Anas Ibrahim',
        error: 'Article not found'
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        title:'404',
        name:'Anas Ibrahim',
        error: 'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port' + port)
})