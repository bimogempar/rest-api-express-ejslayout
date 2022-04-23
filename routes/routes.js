// Route.js
const express = require("express")
const router = express.Router();
const fs = require('fs');

const dataPath = './cars.json' // path to our JSON file

// util functions
const saveCarData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getCarData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)
}

const carRoute = require('./car.js') // import account route
router.use(carRoute) // use account route

// create - add data to JSON file
carRoute.post('/cars', (req, res) => {

    var existCar = getCarData()
    const newCarId = Math.floor(100000 + Math.random() * 900000)

    existCar[newCarId] = req.body

    // console.log(existCar);
    saveCarData(existCar);
    res.send(req.body)
})

// read - get all cars from the json file
carRoute.get('/cars', (req, res) => {
    const cars = getCarData()
    // res.send(cars)
    const arrayCars = Object.values(cars)
    res.render('cars', { layout: 'layouts/app', arrayCars: arrayCars })
})

// single page - get single account from the json file
carRoute.get('/cars/:id', (req, res) => {
    const cars = getCarData()
    const car = cars[req.params.id]
    res.send(car)
})

// update - using Put method
carRoute.put('/car/update/:id', (req, res) => {
    var existCar = getCarData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
        const carId = req.params['id'];
        existCar[carId] = req.body;
        saveCarData(existCar);
        res.send(`cars with id ${carId} has been updated`)
    }, true);
});

// delete - using delete method
carRoute.delete('/car/delete/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        var existCar = getCarData()
        const carId = req.params['id'];
        delete existCar[carId];
        saveCarData(existCar);
        res.send(`cars with id ${carId} has been deleted`)
    }, true);
})

carRoute.get('/test', (req, res) => {
    const cars = getCarData()
    const arrayCars = Object.values(cars)
    res.render('cars', { layout: 'layouts/app', arrayCars: arrayCars })
})

module.exports = router;