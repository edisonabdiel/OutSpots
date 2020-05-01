const express = require('express');
const router = express.Router();
const User = require("../models/User.js")
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Login page
router.get('/login', (req, res) => {
    console.log(req.flash('success_msg'))
    res.render('login')
});

//Register page
router.get('/register', (req, res) => {
    res.render('register')
});

//Register Handler
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
//Check for required fields
    if (!name || !email, !password || !password2) {
        errors.push({ msg: "Please fill in all the fields" });
    }
    if (password != password2) {
        errors.push({ msg: "Passwords don't match" });
    }
    if (password.length < 6) {
        errors.push({ msg: "Password should be at least 6 characters" })
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
//Validation passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                //User exists already
                    errors.push({ msg: "This email is already registered" })
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2, 
                    });
                }
                else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                     //Hash the passwords
                     bcrypt.genSalt(10, (err, salt) =>
                     bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //Set password to hash
                            newUser.password = hash;
                            //Save the new user
                         newUser.save()
                             .then(user => {
                                 req.flash('success_msg', 'You are now register and can login');
                                 res.redirect("/dashboard");
                             })
                             .catch(err => console.log(err));
                        }));
                }
        });
    }
});

//Login Handler
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Logout Hendler
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', "You are logged out");
    res.redirect('/users/login');
});



module.exports = router;

