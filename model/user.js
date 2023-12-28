const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  customerid: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('User', userSchema);