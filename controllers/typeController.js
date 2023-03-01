const Type = require('../models/type');

exports.type_list = (req, res, next) => {
  Type
  .find({}, '-__v')
  .sort('name')
  .exec((err, data) => {
      if (err) { return next(err) }
      res.json(data);
  });
};