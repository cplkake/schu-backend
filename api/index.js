const api = require('express').Router();

const shoe_controller = require('../controllers/shoeController');
const brand_controller = require('../controllers/brandController');
const type_controller = require('../controllers/typeController');

// returns all the shoes found in the database that match the optional query filter parameters
// accepts query parameters "brand", "shoe_types", "new_arrivals", "limit"
api.get('/collections', shoe_controller.findShoes);

// returns an object with two fields: shoe_sizes and shoe_model
// shoe_model is a specific shoe object that matches the brand and model ID in the query
// shoe_sizes is a list of shoeSizeInstance objects for the specified shoe
api.get('/collections/:brand/:model', shoe_controller.findOneShoe);

// returns a list of all the brand objects from the database, limited by the optional query parameter "limit"
api.get('/brands', brand_controller.findBrands);

// returns a list of all the shoe types from the database
api.get('/shoe_types', type_controller.type_list);

module.exports = api;