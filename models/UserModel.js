const mongoose = require("mongoose");

//Create Schema(Collection)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 50,
    cast:false
  },
},{"strict":"throw"});

//Create Model(Constructor)
const UserModel = mongoose.model("user", userSchema);
//export User model
module.exports = UserModel;
