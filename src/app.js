const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const post = process.env.PORT || 3000
const router = require('./models/api')
    //Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
    //set up path for handlebars
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
    //set up directory for server
app.use(express.static(publicDirectoryPath))
app.use(router)


var server = app.listen(port, () => {
    console.log('Server is on localhost:', post)
})