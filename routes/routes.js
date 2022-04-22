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

// Create - add data to JSON file
carRoute.post('/cars', (req, res) => {

    var existCar = getCarData()
    const newCarId = Math.floor(100000 + Math.random() * 900000)

    existCar[newCarId] = req.body

    // console.log(existCar);
    saveCarData(existCar);
    res.send(req.body)
})

// Read - get all accounts from the json file
carRoute.get('/cars', (req, res) => {
    const accounts = getCarData()
    res.send(accounts)
})

// Update - using Put method
carRoute.put('/car/update/:id', (req, res) => {
    var existCar = getCarData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
        const carId = req.params['id'];
        existCar[carId] = req.body;
        saveCarData(existCar);
        res.send(`accounts with id ${carId} has been updated`)
    }, true);
});

// delete - using delete method
carRoute.delete('/car/delete/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        var existCar = getCarData()
        const carId = req.params['id'];
        delete existCar[carId];
        saveCarData(existCar);
        res.send(`accounts with id ${carId} has been deleted`)
    }, true);
})

module.exports = router;