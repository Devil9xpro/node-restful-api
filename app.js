const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')

const feedRoute = require('./routes/feed-route')

const app = express()

app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')))

//handle cors errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use('/feed', feedRoute)

app.use((error, req, res, next) => {
    console.log(error)
    const statuscode = error.statusCode
    const message = error.message
    res.status(statuscode).json({message: message})
})

mongoose.connect('mongodb://localhost:27017/messages', {useUnifiedTopology: true, useNewUrlParser: true})
    .then(result => {
            app.listen(8080)
        }
    )
    .catch(err => console.log(err))


