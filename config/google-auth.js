const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('../models/User')

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: "942724039055-8jhapkil2rgomigtsgtpi2oa5uf06fm3.apps.googleusercontent.com",
        clientSecret: "ATGJhhKsXAK2wcHXVvMVt7cu",
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
