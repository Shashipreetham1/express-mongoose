//create express app
const exp = require("express");
const app = exp();
const userApp = require("./APIs/userApi");
const mongoose = require("mongoose");
const studentApp = require("./APIs/studentApi");

//pass req to specific API based on begining path of URL
app.use("/user-api", userApp);
app.use("/student-api",studentApp)

//DB connection
mongoose
  .connect("mongodb://localhost:27017/testvnr")
  .then(() => {
    console.log("DB connection success");
    //assign port
    app.listen(3000, () => console.log("Http Server on port 3000..."));
  })
  .catch((err) => console.log("err in DB connection ", err));


 
  //error handling middleware
  app.use((err,req,res,next)=>{
    res.send({message:"error",error:err.message})
  })