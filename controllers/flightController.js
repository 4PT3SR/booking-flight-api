const Flight = require('../models/Flight');
const AppError = require('../utils/AppError');

exports.flights = async (req,res,next) => {
    try {
        res.send(flightsDb)
    } catch(e) {
        next(e)
    }
}
exports.addFlight = async (req, res,next) => {
    try {
        // Validation to ensure uaer filla the required details
        const modelKeys = ['title','price','time','date']
        const flightKeys = Object.keys(req.body);
        
        // this returns 'true' if all the fields are filled
        const isFilled = modelKeys.every(key => flightKeys.includes(key));

        if(isFilled) {
            const {title,price,time,date} = await req.body;
            const flight = new Flight(title, price, time,date);
            flight.save()
            // console.log(flight)
            res.send(flight);
            
            
        } else {
            
            throw new AppError('Please enter the required fields',400)
        }
        
    } catch (e) {
        next(e)
    }
}


