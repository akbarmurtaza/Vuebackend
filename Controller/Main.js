var express= require('express');
var app= express();
var jwt    = require('jsonwebtoken');


var user_instance =require('../models/user');
var group_instance =require('../models/group');
var slot_instance =require('../models/slot');

//Middleware to connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userlogin');
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
(db.on('error', console.error.bind(console, 'MongoDB connection error:')));
var token;
var usernameasync;
//Function To Login
exports.loginandGetToken = function(req, res)
 {
 console.log('Login Request Initated');
var nam = req.body.name;
var pass = req.body.password;
console.log(nam);
console.log(pass);
if(nam != "admin")
{
    return res.send({msg:'invalid Username'});
}
else if(pass != "12345")
{
   return res.send({msg:'password Invalid'});
}
else
{
   // res.send('login Successfull and token generated');
    //Generate JWT Token
    const payload = {
        name: nam
      };
          token = jwt.sign(payload, "FaiqDino", {expiresIn: 86400 // expires in 24 hours
        });
        //res.cookie('token',token);

 //          return the information including token as JSON
        return res.json({
            success: true,
            message: 'Token Generated and Login Complete!',
            token: token
          });
          //return  res.redirect('/dashboard');
}
};

exports.tokenverification = (req, res, next) => {
  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, "FaiqDino", function(err, decoded) {       if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token. This security violation will be reported to admin.' });
      }
      else
      {
        console.log('pass');
        next();
        req.decoded = decoded;
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
};

exports.adduser= function(req,res){

    var usermodel = new user_instance({
      user_name: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password
    });
    console.log(req.body);
    user_instance.count({user_name:req.body.username}, function (err, count){
    if(count==0){
      usermodel.save(function (err) {
          if (err)
           return res.json(err);

          else
            return res.json({message:'user Added Successfully'});
            console.log('New user Added Succesfully');
            //return  res.redirect('/testview');
          // saved!
      });
    }
    else {
        return res.status(200).json(message='Account Already exists with this email address');
    }
    });
}

exports.addgroup= function(req,res){

  var groupmodel = new group_instance({
    group_name: req.body.groupname,
    password: req.body.password
  });
  console.log(req.body);
  group_instance.count({group_name:req.body.groupname}, function (err, count){
  if(count==0){
    groupmodel.save(function (err) {
        if (err)
         return res.json(err);

        else
          return res.json({message:'Group Added Successfully'});
          console.log('New Group Added Succesfully');
          //return  res.redirect('/testview');
        // saved!
    });
  }
  else {
      return res.status(200).json(message='Account Already exists with this email address');
  }
  });
}

exports.addslot= function(req,res){

  var slotmodel = new slot_instance({
    user: usernameasync,
    day: req.body.day,
    from: req.body.from,
    to: req.body.to
  });
  console.log(req.body);
  slotmodel.save(function (err) {
    if (err)
     return res.json(err);

    else
      return res.json({message:'slot Added Successfully'});
      console.log('New slot Added Succesfully');
      //return  res.redirect('/testview');
    // saved!
});
}

exports.removeslot= function(req,res){

  var slotmodel = new slot_instance({
    user: req.body.username,
    day: req.body.day,
    from: req.body.from,
    to: req.body.to
  });
  slotmodel.deleteMany({user: req.body.username,day: req.body.day,from: req.body.from,to: req.body.to}, function(err){
    if (!err) {
            res.json('slot removed');
    }
    else {
            res.json('error');
    }
  });
}



exports.userlogin= function(req,res){
  var groupmodel = new group_instance({
    group_name: req.body.groupname,
    password: req.body.passwordgroup
  });
  var usermodel = new user_instance({
    user_name: req.body.username,
    password: req.body.password
  });
  user_instance.count({user_name:req.body.username,password:req.body.password}, function (err, count){
    if(count>0){
      group_instance.count({group_name:req.body.groupname,password:req.body.passwordgroup}, function (err, count){
        if(count>0){
          const payload = {
            name: req.body.username
          };
              token = jwt.sign(payload, "FaiqDino", {expiresIn: 86400 // expires in 24 hours
            });
            
            //res.cookie('token',token);
    
     //          return the information including token as JSON
            return res.json({
                success: true,
                message: 'Token Generated and Login Complete!',
                token: token
              });
          return res.json({message:'Logged in Successfully to '});
          console.log(usernameasync);        
        }
      });
    }
    else {
      return res.status(200).json(message='Invalid Groupname or Username');
  }
  usernameasync = req.body.username;
  console.log(usernameasync);
  });
}

exports.allslots = (req, res) => {
  slot_instance.find((err, slots) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.json(slots);
    }
  });
};

exports.itemcrud = (req, res) => {
  user_instance.find((err, items) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.render('business', {
        title: 'Admin Dashboard | Item CRUD',
        items: items,
      });
    }
  });
};

exports.patientview = (req, res) => {
  user_instance.find((err, items) => {
    if (err) {
      console.log("Error: " + err);
    } else {
      res.json(items);
    }
  });
};

exports.testcrud = (req, res) => {
  res.render('background');
};
