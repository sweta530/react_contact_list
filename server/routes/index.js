const express = require('express')
const contact = require('./contact.route')
const app = express()

app.use('/api/', contact)


module.exports = app
