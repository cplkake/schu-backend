const mongoose = require('mongoose');
const { Schema } = mongoose;

const MemberSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true,
  },
  cartInfo: [{
    type: Schema.Types.ObjectId,
    ref: 'ShoeSizeInstance'
  }],
  wishList: [{
    type: Schema.Types.ObjectId,
    ref: 'Shoe'
  }],
})

module.exports = mongoose.model('Member', MemberSchema)