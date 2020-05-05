const express = require('express');
const router  = express.Router();
const passport = require("passport");
const User = require('../models/User')
const geoCoder = require('../config/geocoder')

/* GET home page */
router.get('/', (req, res, next) => {
  // geoCoder.geocode("Revaler 17 10245 Berlin").then((geoloc) => { //Dogpark.address
  //   console.log(geoloc); 
  // })
  
  res.render('Dashboard');
});

// show register form
router.get('/register', (req, res) => {
  res.render('register'); 
});

//Render dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});


module.exports = router;
