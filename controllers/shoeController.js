/*
  to do:
    - pagination: https://bezkoder.com/node-js-mongodb-pagination/
*/
const async = require('async');

const Shoe = require('../models/shoe');
const ShoeSizeInstance = require('../models/shoeSizeInstance');

// return the data found when querying a single shoe
// data to be used on the product page
// need to incorporate shoes sizes
exports.findOneShoe = (req, res, next) => {
  async.parallel({
    shoe_model: function(callback) {
      Shoe
        .findById(req.params.model, '-dateAdded -__v')
        .populate('brand', 'name')
        .populate('shoe_types', 'name')
        .exec(callback)    
    },
    shoe_sizes: function(callback) {
      ShoeSizeInstance
        .find({ shoe: req.params.model }, 'size stock -_id')
        .exec(callback)
    }
  }, (err, data) => {
    if (err) return next(err);
    res.json(data);
  })
  
}

// return the profile pic URI, model, brand, price, salesPrice(if not null) of shoes that pass through the filter
// to be used to display on product cards 
exports.findAllShoes = (req, res, next) => {
  let query;

  if (req.query.shoe_types) {
    // since shoe_types in the shoe model is an array of subdocuments, look for shoes that have a matching shoe_types id from the query
    const { shoe_types: shoe_types, ...reqWithoutTypes } = req.query;
    query = Object.assign({ "shoe_types": { "$in": shoe_types } }, reqWithoutTypes);
  } else {
    query = req.query;
  }
  
  Shoe 
    .find(query, '-dateAdded -__v')
    .populate('brand', 'name')
    .populate('shoe_types', 'name')
    .exec((err, data) => {
      if (err) return next(err);
      res.json(data);
    });
};

exports.findShoesByBrand = (req, res, next) => {
  let query;

  if (req.query.shoe_types) {
    // since shoe_types in the shoe model is an array of subdocuments, look for shoes that have a matching shoe_types id from the query
    const { shoe_types: shoe_types, ...reqWithoutTypes } = req.query;
    query = Object.assign({ "shoe_types": { "$in": shoe_types } }, reqWithoutTypes, { brand: req.params.brand });
  } else {
    query = Object.assign(req.query, { brand: req.params.brand });
  }

  Shoe
    .find(query,'-dateAdded -__v')
    .populate('brand', 'name')
    .populate('shoe_types', 'name')
    .exec((err, data) => {
      if (err) return next(err);
      res.json(data);
    });
};

// returns all shoes that have the isNewArrival property set to true
exports.findAllNewArrivals = (req, res, next) => {
  let query;

  if (req.query.shoe_types) {
    // since shoe_types in the shoe model is an array of subdocuments, look for shoes that have a matching shoe_types id from the query
    const { shoe_types: shoe_types, ...reqWithoutTypes } = req.query;
    query = Object.assign({ "shoe_types": { "$in": shoe_types } }, reqWithoutTypes, { isNewArrival: true });
  } else {
    query = Object.assign(req.query, { isNewArrival: true });
  }

  Shoe
    .find(query, '-dateAdded -__v')
    .populate('brand', 'name')
    .populate('shoe_types', 'name')
    .exec((err, data) => {
      if (err) return next(err);
      res.json(data);
    });
};

// change 5 to 10, make it so that even if there isnt 10 new arrivals, it doesnt break
// returns 5 most recent shoes that have the isNewArrival property set to true
// data returned to be displayed on the front page under the New Arrivals section
exports.findLatestNewArrivals = (req, res, next) => {
  Shoe
    .find({ isNewArrival: true }, '-dateAdded -__v')
    .populate('brand', 'name')
    .populate('shoe_types', 'name')
    .exec((err, data) => {
      if (err) return next(err);
      const latestFive = data.sort((prevShoe, nextShoe) => nextShoe['dateAdded'] - prevShoe['dateAdded']).slice(0, 5);
      res.json(latestFive);
    });
};
