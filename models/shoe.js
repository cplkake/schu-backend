const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShoeSchema = new Schema({
    model: {
      type: String, 
      required: true
    },
    brand: {
      type: Schema.Types.ObjectId, 
      ref: 'Brand', 
      required: true
    },
    shoe_types: [{
      type: Schema.Types.ObjectId, 
      ref: 'Type', 
      required: true
    }],
    colour: {
      type: String, 
      required: true
    },
    price: {
      type: Number, 
      required: true
    },
    salePrice: { type: Number },
    isNewArrival: {
      type: Boolean, 
      required: true
    },
    dateAdded: {
      type: Date,
    },
    gender: {
      type: String, 
      enum: ['men', 'women'], 
      required: true
    },
    description: {type: String},
    albumURI: {type: String},
});

module.exports = mongoose.model('Shoe', ShoeSchema);