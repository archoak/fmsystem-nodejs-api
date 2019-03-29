const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  avatar:{
    type: String,
    required: true
  },
  identity:{
    type: String
  },
  date:{
    type: Date,
    default: new Date().toLocaleDateString()
  },
})

module.exports = User = mongoose.model("user",UserSchema);