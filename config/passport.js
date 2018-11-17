var passport = require("passport")
var LocalStrat = require("passport-local").Strategy;
var db = require("../models")

// Local Login Time!
passport.use('local-login', new LocalStrat({
    usernameField: 'username',
    passwordField: 'password',
}, function (username, password, done) {
    console.log("You're in passport");
    db.User.findOne({ where: { username: username }}).then(function (user) {
        console.log("Here's the retrieved info:" + user)
        // check if username exists
        if (user == undefined) {
            return done(null, false, { message: "Unkown username." });
            // use hash checker to check password
        } else if (!user.validPassword(password)) {
            return done(null, false, { message: "incorrect password" });
            // if it clears both check return the user
        } else {
            return done(null, user);
        }
    })
}));

// Local Signup Time!
passport.use('local-signup', new LocalStrat({
    usernameField: 'username',
    passwordField: 'password',
}, function (username, password, done) {
    process.nextTick(function () {
        db.User.findOne({ where: { 'username': username } }).then(function (err, data) {
            // if database err return the error
            if (err)
                return done(err);
            if (data) {
                return done(null, false, { message: "Username is taken" });
            } else {
                // grab new user data  
                var newUsername = username;
                var newPassword = password;
                // create new user, running password hashing automatically
                db.User.create({
                    username: newUsername,
                    password: newPassword
                },
                    function (err) {
                        if (err)
                            throw err;

                    }).then(function (newUser) {
                        return done(null, newUser);
                    })
            };
        })
    })
}));

// serializing a user
passport.serializeUser(function(user, done) {
    done(null, user);
  });
 // deserializing a user 
 passport.deserializeUser(function(user, done) {
    db.User.findById(user.id).then(function(user) {
        done(null, user);
    }).catch(function(e) {
        done(e, false);
    });
});


module.exports = passport;
