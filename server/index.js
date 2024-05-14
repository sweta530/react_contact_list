require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 8080

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
require('./models/connection')

const cors = require('cors')
app.use(cors())

const fileUpload = require('express-fileupload');
app.use(express.static('public'))
app.use(fileUpload());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./routes'))

