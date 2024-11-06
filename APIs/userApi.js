//create mini exp app
const exp = require("express");
const userApp = exp.Router();
const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt=require('jsonwebtoken')
//const verifyToken=require('../middlewares/verifyToken')
userApp.use(exp.json());

//Create user
userApp.post("/user", async (req, res) => {
  console.log("first")
  try {
    //get new use from client
    let newUser = req.body;

    //hash paswword
    let hashedPassword = await bcryptjs.hash(newUser.password, 6);
    //replace plain pw witn hased pw
    newUser.password = hashedPassword;
    //create user doc
    let newUserDoc = new UserModel(newUser);

    //save
    await newUserDoc.save();
    res.send({ message: "user created" });
  } catch (err) {
    res.send({ message: "error", error: err.message });
  }
});


//route for user login
userApp.post('/login',async(req,res)=>{
    //get user cred from client
    let userCredObj=req.body;
    //verify username
    let user=await UserModel.findOne({username:userCredObj.username})
    //if username not found
    if(user===null){
        res.send({message:"Invalid username"})
    }else{
      //compare passwords
      let result=await bcryptjs.compare(userCredObj.password,user.password)
      //if passwords not matched
      if(result===false){
        res.send({message:"Invalid password"})
      }else{
        //create JWT token
       let signedToken= jwt.sign({username:user.username},'abcdef',{expiresIn:20})
        //send token as resser
        res.send({message:"login success",token:signedToken,user:user})
      }
    }
})


//pritected route
// userApp.get('/protected',verifyToken,(req,res)=>{
//   res.send({message:"This is protected data"})
// })

//export
module.exports = userApp;
