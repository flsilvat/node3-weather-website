const path = require('path')
const express = require('express')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// npm i hbs https://www.npmjs.com/package/hbs
app.set('view engine', 'hbs')
//https://expressjs.com/en/4x/api.html#app.use

// dirname da la url hasta web-server/src xq ahi esta app.js
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weatheeer App!',
        name: 'Francisco'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Luis'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }
    geocode(req.query.address, (geoError, {latitude, longitude, location} = {}) => {
        if (geoError) {
            return res.send({ error: geoError })
        }
        forecast(latitude, longitude, (forecastError, {description, temperature, feelslike}) => {
            if (forecastError) {
                return res.send({ error: forecastError })
            }
            res.send({
                location,
                latitude,
                longitude,
                description,
                temperature,
                feelslike
            })
          })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.send('Help article not found!')
})

app.get('*', (req, res) => {
    res.send('My 404 page')
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})