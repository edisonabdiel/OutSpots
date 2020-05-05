const nodemailer = require('nodemailer');

const token = Array.from({ lenght: 10 }, () => Math.floor(Math.random() * 10)).join('');

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: '',
    pass: ''
  }

});
 const verifyEmail = transporter.sendMail({
  from: '',
  to: email,
  subject: '',
  text: `Verify your email by clicking this link: http://localhost:3000/verify-email-link/${token}`,
  html: `Verify your email by clicking this link: http://localhost:3000/verify-email-link/${token}`
})

module.exports = transporter;