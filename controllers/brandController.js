const Brand = require('../models/brand');

exports.findBrands = (req, res, next) => {
  let limit;
  
  // if more than one parameter for limit is provided, use the last one
  if (req.query.limit) {
    if (Array.isArray(req.query.limit)) limit = Math.floor(req.query.limit[req.query.limit.length - 1]);
    else limit = Math.floor(req.query.limit);
    if (!Number.isInteger(limit) || limit < 0 ) return next(createError(400, 'limit parameter must be an integer greater than 0'))
  }
  else limit = 0;
  
  Brand
    .find({}, '-__v')
    .limit(limit)
    .exec((err, data) => {
      if (err) return next(err);
      res.json(data);
    })
}