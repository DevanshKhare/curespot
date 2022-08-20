const express = require('express');
const Doctor = require('../models/Doctor')
const bcrypt = require('bcryptjs')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const JWT_SECTET = "bwvbpwvg"


//api to register a new doctor "/api/doctor/registerDoctor"

router.post('/registerDoctor',
[
    body('name',"Enter a valid name").isLength({ min: 3 }),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Enter a valid password").isLength({ min: 5 }),
],
async(req,res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)

    try{

      let doctor = await Doctor.findOne({email:req.body.email});
      if(doctor){
        res.status(400).json({ success,error:"email already exists"})
      }
      
      doctor = await Doctor.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
      })
      const data ={
        user:{
          id:doctor.id
        }
      }
      const authtoken=jwt.sign(data,JWT_SECTET)
      
      // res.json(user)
      success=true;
        res.json({success,authtoken})
      }
  
  
      catch(error){ 
          console.error(error.message)
          res.status(500).send("Internal server error: ")
      }
  })

  //login api /api/auth/login

  router.post('/login',
[
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password cannot be blank").exists()

],
async(req,res)=>{
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
const {email,password} = req.body;
try{
  let doctor =await Doctor.findOne({ email })
  if(!doctor){
    return res.status(400).json({ error:"Invalid Credentials"});
  }
  const passwordCompare = await bcrypt.compare(password, doctor.password);
  if(!passwordCompare){
    success=false;
    return res.status(400).json({success, error:"Invalid Credentials"});
  }
  const data ={
    user:{
      id: doctor.id,
    }

  }
  const authtoken = jwt.sign(data,JWT_SECTET);
  success=true;
  res.json({success, authtoken})
}
  catch(error){
    console.error(error.message)
    res.status(500).send("Interl server error")

}

})




  module.exports = router