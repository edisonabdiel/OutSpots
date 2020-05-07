
const express    = require("express");
const router     = express.Router();
const Dogpark = require("../models/Dogpark");
const geocoder   = require('../config/geocoder');


//INDEX : show all dogparks



router.get('/', (req, res, next) => {

  Dogpark.find().then((data) => {
    console.log('dogparks: ' + data)
    let dogparksData = { allDogparks: data }
    res.render('/dogParcs/index', dogparksData);
  })

});

 module.exports = router;

