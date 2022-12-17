const Brand = require('../models/brand');

exports.findBrands = (req, res, next) => {
  const limit = req.query.limit ? req.query.limit : 0;
  Brand
    .find({})
    .limit(limit)
    .exec((err, data) => {
      if (err) return next(err);
      res.json(data);
    })
}