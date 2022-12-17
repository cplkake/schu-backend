const Type = require('../models/type');

exports.type_list = (req, res, next) => {
  Type
  .find()
  .sort('name')
  .exec((err, data) => {
      if (err) { return next(err) }
      res.json(data);
  });
};