const async = require('async');
const createError = require('http-errors');

const Shoe = require('../models/shoe');
const ShoeSizeInstance = require('../models/shoeSizeInstance');

// return an array containing the specified shoe object  and the stock of each size available for that shoe
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

// queries (if received) are added to the mongoFilter object which is then sent as the filter parameter by Mongoose
// returns an array of matching shoe objects
exports.findShoes = (req, res, next) => {
  let mongoFilter = {};
  let limit;

  if (req.query.shoe_types) {
    // req.query.shoe_types can be either be a string or an array 
    if (Array.isArray(req.query.shoe_types)) {
      if (req.query.shoe_types.every(typeParameter => typeParameter.match(/^[0-9a-fA-F]{24}$/))) {
        const { shoe_types: shoe_types } = req.query;
        mongoFilter = { "shoe_types": { "$in": shoe_types } };
      }
      else return next(createError(400, 'Each brand parameter must be a length 24 hex string'));
    }
    else {
      if (req.query.shoe_types.match(/^[0-9a-fA-F]{24}$/)) {
        const { shoe_types: shoe_types } = req.query;
        mongoFilter = { "shoe_types": { "$in": shoe_types } };
      } 
      else return next(createError(400, 'shoe_types parameter must be a length 24 hex string'));
    }
  }

  if (req.query.brand) {
    // req.query.brand can be either be a string or an array 
    if (Array.isArray(req.query.brand)) {
      if (req.query.brand.every(brandParameter => brandParameter.match(/^[0-9a-fA-F]{24}$/))) {
        mongoFilter = Object.assign(mongoFilter, { brand: req.query.brand });
      }
      else return next(createError(400, 'Each brand parameter must be a length 24 hex string'));
    }
    else {
      if (req.query.brand.match(/^[0-9a-fA-F]{24}$/)) {
        mongoFilter = Object.assign(mongoFilter, { brand: req.query.brand });
      }
      else return next(createError(400, 'brand parameter must be a length 24 hex string'));  
    }
  }

  if (req.query.new_arrivals) {
    mongoFilter = Object.assign(mongoFilter, { isNewArrival: true });
  }

  // if more than one parameter for limit is provided, use the last one
  if (req.query.limit) {
    if (Array.isArray(req.query.limit)) limit = Math.floor(req.query.limit[req.query.limit.length - 1]);
    else limit = Math.floor(req.query.limit);
    if (!Number.isInteger(limit) || limit <= 0 ) return next(createError(400, 'limit parameter must be an integer greater than 0'))
  }
  
  Shoe 
    .find(mongoFilter, '-dateAdded -__v')
    .populate('brand', 'name')
    .populate('shoe_types', 'name')
    .exec((err, data) => {
      if (err) return next(err);
      if (limit) {
        if (req.query.new_arrivals) {
          // new arrivals are sorted by dateAdded
          const latestSortedArrivals = data.sort((prevShoe, nextShoe) => nextShoe['dateAdded'] - prevShoe['dateAdded']).slice(0, limit);
          res.json(latestSortedArrivals)
        } 
        else res.json(data.slice(0, limit))
      } 
      else res.json(data);
    });
};

