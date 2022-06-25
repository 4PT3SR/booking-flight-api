// exports.flightsDb = [];
const fs = require('fs');
// const path =require('path');
const flightDb = require('../db/flights.json');


class Flight {
    constructor(title,time,price,date) {
        this.title = title;
        this.time = time;
        this.price = price;
        this.date = date;
    }
    save(){
        flightDb.push(this)
       fs.writeFile('./db/flights.json',JSON.stringify(flightDb),function(err){if(err){return console.log(err)}});
    console.log(flightDb);
    }
}

module.exports = Flight