const express = require('express');
const router = express.Router();
const User = require("../models/User.js")
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');

//Transporter 
let transporter = nodemailer.createTransport({
    service: 'MailChimp',
    auth: {
      user: 'tester123.peterpan@gmail.com',
      pass: '89675rutitgzrvuz'
    }
  });

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
                    const email = req.body.email
                    const password = req.body.password
                    const bcryptSalt = 10;
                    const token = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');

                    transporter.sendMail({
                        from: '"OutSpots Verification Team " <myawesome@project.com>',
                        to: email,
                        subject: 'Activate your OutSpots account',
                        text: `Hey this is the link you need to click: http://localhost:3000/verify-email-link/${token}`,
                        html: `Hey this is the link you need to click: http://localhost:3000/verify-email-link/${token}`
                    }).then(() => {
                            const salt = bcrypt.genSaltSync(bcryptSalt);
                            const hashPass = bcrypt.hashSync(password, salt);

                            let user = new User({
                                email,
                                password: hashPass,
                                token: token,
                                name
                            })
                        return user.save()
                        
                        }).then((theUser) => {
                            req.login(theUser, () => {
                                res.redirect('/verification')
                            })
                        })
                }
            });
    }
});

//Verification Handler
router.get('/verify-email-link/:token', (req, res) => {
    if (req.user.token === req.params.token) {
        req.user.verifiedEmail = true
        req.user.save().then(() => {
            res.redirect('dashboard')
        })
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
