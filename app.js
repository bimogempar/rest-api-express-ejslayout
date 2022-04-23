const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const fs = require('fs');

// create our express app
const app = express()

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressLayouts)
app.use(express.static('public'))

// route
const routes = require('./routes/routes')
app.use('/', routes)
app.set('views', './views')
app.set('view engine', 'ejs')

//start server
app.listen(3000, () => {
    console.log("listeniing at port:3000")
})
