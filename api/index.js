const api = require('express').Router();

const shoe_controller = require('../controllers/shoeController');
const brand_controller = require('../controllers/brandController');
const type_controller = require('../controllers/typeController');

// consider returning the list of available collections
api.get('/collections', (req, res) => {
  res.redirect('/collections/all')
})

// returns all the shoes found in the database
api.get('/collections/all', shoe_controller.findAllShoes);

api.get('/collections/:brand', shoe_controller.findShoesByBrand);

api.get('/collections/:brand/:model', shoe_controller.findOneShoe);

api.get('/new-arrivals', shoe_controller.findAllNewArrivals);

api.get('/latest-new-arrivals', shoe_controller.findLatestNewArrivals);

api.get('/brands', brand_controller.findBrands);

api.get('/shoe_types', type_controller.type_list);

module.exports = api;