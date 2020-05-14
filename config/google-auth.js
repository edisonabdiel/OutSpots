const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('../models/User')

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "/users/auth/google/callback"
      },
      (accessToken, refreshToken, profile, done) => {
        // to see the structure of the data in received response:
        console.log("Google account details:", profile);

        User.findOne({ googleID: profile.id })
          .then(user => {
            if (user) {
              done(null, user);
              return;
            }

            User.create({ googleID: profile.id })
              .then(newUser => {
                done(null, newUser);
              })
              .catch(err => done(err));
          })
          .catch(err => done(err));
      }
    )
  );
}
