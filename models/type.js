const mongoose = require('mongoose');
const { Schema } = mongoose;

const TypeSchema = new Schema({
    name: {type: String, required: true},
});

TypeSchema.virtual('url').get(function() {
    return `/collections/type/${this._id}`;
});

module.exports = mongoose.model('Type', TypeSchema);