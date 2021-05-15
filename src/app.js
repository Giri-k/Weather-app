const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'GK'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'GK'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'GK'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error)
            return res.send( {error} );
        forecast( latitude, longitude, (error, forecastData) => {
            if(error)
                return res.send({error});
    
                //console.log(location);
                //console.log(forecastData);
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })

        })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide Search'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        content: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        content: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})