//name, email, age, skills,marks, address
const mongoose = require("mongoose");

//create marks schema
const marksSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  marksSecured: {
    type: Number,
    required: true,
  },
  
},{ strict: "throw" });

const addressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
},{ strict: "throw" });
const studentSchema = new mongoose.Schema( {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 24,
    },
    skills: {
      type: [String],
      require: true,
    },
    marks: {
      type: [marksSchema],
    },
    address: {
        type:addressSchema
    },
  },
  { strict: "throw" }
);

//create Student model
const Student = mongoose.model("student", studentSchema);

module.exports = Student;
