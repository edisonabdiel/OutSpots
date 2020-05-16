const express = require('express');
const router = express.Router();
const Dogpark = require("../models/Dogpark");
const { ensureAuthenticated } = require('../config/auth')

//Welcome Page
router.get('/', (req, res) => 
    res.render('welcome')
);

router.get('/verification', (req, res) => 
    res.render('verification')
);

//Dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res, next) =>
//     res.render('dashboard', {
//         name: req.user.name
//     })
// );

router.get('/dashboard', ensureAuthenticated, (req, res, next) => {

    Dogpark.find().then((dogparksFromDB) => {
      res.render('dashboard', {
        dogparksData: dogparksFromDB,
        name: req.user.name
    });
  
    })
  });

module.exports = router
