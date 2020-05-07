
const express    = require("express");
const router     = express.Router();
const Dogpark    = require("../models/Dogpark");
const geocoder   = require('../config/geocoder');


//INDEX : show all dogparks



router.get('/', (req, res, next) => {

  Dogpark.find().then((data) => {
    console.log('dogparks: ' + data)
    res.render('dogParcs/index', {dogparksData:data});
  })
});


router.get('/new', (req, res, next) => {
    res.render('dogParcs/new');
  })

router.post('/new', (req, res, next) => {

  console.log("req.body", req.body)

  let dogpark = new Dogpark({ name: req.body.name, location: req.body.location })

  dogpark.save().then(() => {
    res.redirect('/dogparks')
  })
})

 module.exports = router;

