const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./Weather/geocode')
const temCode = require('./Weather/temcode')

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
    //set up path for handlebars
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
    //set up directory for server
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Hoang'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Hoang'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hoang'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must porovide a location'
        })
    } else {
        geocode.gecode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            }

            temCode.temCode(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
})
app.get('/help/*', (req, res) => {
    res.render('404pages', {
        title: '404 Page',
        name: 'Hoang',
        errorMessage: 'Help Page Not Found'
    })
})
app.get('*', (req, res) => {
    res.render('404pages', {
        title: '404 Page',
        name: 'Hoang',
        errorMessage: 'Page Not Found'
    })
})
var server = app.listen(2000, () => {
    console.log('Server is on localhost:3000')
})