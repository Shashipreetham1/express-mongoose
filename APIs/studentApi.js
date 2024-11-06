const exp = require("express");
const Student = require("../models/Student");
const studentApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
studentApp.use(exp.json());

//API
//create new student
studentApp.post(
  "/student",
  expressAsyncHandler(async (req, res) => {
    //get student obj from req
    let newStudent = req.body;
    console.log(newStudent);
    //create STudent document
    let studentDocument = new Student(newStudent);
    console.log(studentDocument);

    //save
    await studentDocument.sve();
    //send res
    res.send({ message: "New student created" });
  })
);

//export
module.exports = studentApp;
