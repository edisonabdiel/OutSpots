
const express    = require("express");
const router     = express.Router();
const Dogpark    = require("../models/Dogpark");
const geocoder   = require('../config/geocoder');


//INDEX : show all dogparks

router.get('/', (req, res, next) => {

  Dogpark.find().then((dogparksFromDB) => {
    console.log('dogparks: ' + dogparksFromDB)
    res.render('dog-parks/index', {dogparksData: dogparksFromDB});
  })
});

//NEW : show the form to add a new dogpark

router.get('/new', (req, res, next) => {
    res.render('dog-parks/new');
  })

//get dogparks ID + show park details

 router.get('/:id', (req, res, next) => {
   const dogparkID = req.params.id;
 
   Dogpark.findById(dogparkID)
     .then(dogparkFromDB => {
       res.render('dog-parks/show', {dogparkData: dogparkFromDB});
     })
 });
 
//EDIT : show the form to edit dogpark
router.get('/:id/edit', (req, res, next) => {
  const dogparkID = req.params.id;

  Dogpark.findById(dogparkID)
    .then(dogpark => {
      res.render('dog-parks/edit', {dogpark});
    })
});


//POST new dogpark

router.post('/new', (req, res, next) => {
  console.log("req.body =========================>", req.body)

  let dogpark = new Dogpark({ 
    name: req.body.name,
    address: req.body.address,
    waterSupply: req.body.waterSupply,
    seatingSpaces: req.body.seatingSpaces,
    smallDogsArea: req.body.smallDogsArea,
    ground: req.body.ground,
    isFenced: req.body.isFenced
  })

  dogpark.save().then(() => {
    res.redirect('/dogparks')
  })
});


// POST dogpark/:id edit

router.post('/:id/edit', (req, res, next) => {
  const dogparkID = req.params.id;
  console.log("req.body", req.body)
  Dogpark.findByIdAndUpdate(dogparkID, {
    name: req.body.name,
    address: req.body.address,
    waterSupply: req.body.waterSupply,
    seatingSpaces: req.body.seatingSpaces,
    smallDogsArea: req.body.smallDogsArea,
    ground: req.body.ground,
    isFenced: req.body.isFenced
}).then(() => {
  res.redirect('/dogparks')
  })
});

//DELETE 

router.post('/:id/delete', (req, res, next) => {
  const dogparkID = req.params.id;
  Dogpark.findByIdAndDelete(dogparkID).then(() => {
    res.redirect('/dogparks')
  })

})

 module.exports = router;
