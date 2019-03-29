const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  type: {
    type: String
  },
  description: {
    type: String
  },
  income: {
    type: String,
    required: true
  },
  expend: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String
  },
  date:{
    type: String,
    default: () => { return new Date(Date.now()).toLocaleString() }
  }
})

module.exports = Profile = mongoose.model('profile',ProfileSchema);