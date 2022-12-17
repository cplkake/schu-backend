const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShoeSizeInstanceSchema = new Schema({
  shoe: {
    type: Schema.Types.ObjectId,
    ref: 'Shoe',
    required: true,
  },
  size: {
    type: Number,
  },
  stock: {
    type: Number,
  }
});

module.exports = mongoose.model('ShoeSizeInstance', ShoeSizeInstanceSchema);