const express = require('express')
const router = new express.Router()
const geocode = require('../Weather/geocode')
const temCode = require('../Weather/temcode')

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Hoang Vu'
    })
})
router.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Hoang Vu'
    })
})
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Hoang Vu'
    })
})
router.get('/weather', (req, res) => {
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
router.get('/help/*', (req, res) => {
    res.render('404pages', {
        title: '404 Page',
        name: 'Hoang Vu',
        errorMessage: 'Help Page Not Found'
    })
})
router.get('*', (req, res) => {
    res.render('404pages', {
        title: '404 Page',
        name: 'Hoang Vu Vu',
        errorMessage: 'Page Not Found'
    })
})
module.exports = router