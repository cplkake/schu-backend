const mongoose = require('mongoose');
const { Schema } = mongoose;

const BrandSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    picURL: {type: String},
});


module.exports = mongoose.model('Brand', BrandSchema);