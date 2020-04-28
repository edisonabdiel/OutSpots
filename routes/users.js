const express = require('express');
const router = express.Router();

// Login page
router.get('/login', (req, res) => {
    res.render('login')
});

//Register page
router.get('/register', (req, res) => {
    res.render('register')
});

//Register Handler
router.post('/register', (req, res) => {
    console.log(req.body)
   res.render('Dashboard') 
});

module.exports = router