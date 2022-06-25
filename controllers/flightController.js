const Flight = require('../models/Flight');
const fs = require('fs');
const AppError = require('../utils/AppError');
const {
    v4: uuidv4
} = require('uuid');
const flightDb = require('../models/flights.json')




function save(flightDb) {
    fs.writeFile('./models/flights.json', JSON.stringify(flightDb), function (err) {
        if (err) {
            return console.log(err)
        }
    });
}



// @desc ---- controller to add/book a flight to the db
// @Method --- POST
// @route ---- /addflight
exports.addFlight = async (req, res, next) => {
    try {
        // Validation to ensure uaer filla the required details
        const modelKeys = ['title', 'price', 'time', 'date']
        const flightKeys = Object.keys(req.body);

        // this returns 'true' if all the fields are filled
        const isFilled = modelKeys.every(key => flightKeys.includes(key));

        if (isFilled) {
            const id = uuidv4();
            const {
                title,
                price,
                time,
                date
            } = await req.body;
            const flight = new Flight(id, title, time, price, date);
            flightDb.push(flight)
            save(flightDb)
            res.status(201).json({
                message: 'Flight has been booked/added',
                data: flight
            });


        } else {

            throw new AppError('Please enter the required fields', 400)
        }

    } catch (err) {
        next(err)
    }
}


// ######################################
// @desc ---- controller to get all flights
// @Method --- GET
// @route ---- /flights
exports.flight = async (req, res, next) => {
    try {
        const flights = flightDb
        res.status(200).json({
            flights
        })
    } catch (err) {
        next(err)
    }
}


// ######################################
// @desc ---- controller to get a single flight
// @Method --- GET
// @route ---- /flights/:id
exports.singleFlight = async (req, res, next) => {
    try {
        const id = req.params.id;
        const flights = flightDb;
        let flight = flights.find(flight => flight.id === id);
        if (!flight) throw new AppError('Flight Id does not exist', 400)
        res.status(200).json(flight);

    } catch (err) {
        next(err)
    }
}



// ######################################
// @desc ---- controller to edit a flight flights
// @Method --- PATCH
// @route ---- /flights/:id
exports.editFlight = async (req, res, next) => {
    try {

        const id = req.params.id;
        let flights = flightDb;

        // To get the flight itself from the dummy db
        let flight = flights.find(flight => flight.id === id);
        if (!flight) throw new AppError('Flight Id does not exist', 400);

        //to get the index of the flight so as to replace it in the db 
        let flightIndex = flights.findIndex(flight => flight.id === id);

        // to allow users only update the title,price,date,time only without mutating the id
        const allowedUpdates = ['title', 'time', 'price', 'date'];
        const reqBodyKeys = Object.keys(req.body);
        let isAllowedUpdate = reqBodyKeys.every(key => allowedUpdates.includes(key));

        // runs if the user enters only the right mutable data
        if (isAllowedUpdate) {

            // updates the data
            reqBodyKeys.forEach(key => {
                flight[key] = req.body[key];
            });

            flights.splice(flightIndex, 1, flight);
            save(flights)

            res.status(200).json({
                message: 'Updated',
                flight
            });
        } else {
            throw new AppError("Only the 'title,price,date and time' are mutable", 400);
        }

    } catch (err) {
        next(err)
    }
}


// ######################################
// @desc ---- controller to delete a flight
// @Method --- DELETE
// @route ---- /flights/:id
exports.deleteFlight = async (req, res, next) => {
    try {
        const id = req.params.id;
        let flights = flightDb;

        // To get the flight itself from the dummy db
        let flight = flights.find(flight => flight.id === id);
        if (!flight) throw new AppError('Flight id does not exist', 400);

        //to get the index of the flight so as to replace it in the db 
        let flightIndex = flights.findIndex(flight => flight.id === id);

        flights.splice(flightIndex, 1);
        save(flights)

        res.status(200).json({
            message: 'Flight has been deleted successfully'
        })

    } catch (err) {
        next(err)
    }
}


// ######################################
// @desc ---- controller document routes and methods
// @route ---- /

exports.docs = (req, res, next) => {
    try {
        const doc = {
            routes: `['POST','/addflight'],['GET','/flights'],['GET','/flights/:id'],['PATCH','/flights/:id'],['DELETE','/flights/:id']`
        }

        res.status(200).json(doc);

    } catch (err) {
        next(err)
    }
}
