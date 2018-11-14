var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var passport = require("../config/passport")

module.exports = function (app) {
  // the "main" page displaying our user's info and stuff
  app.get("/api/user", isAuthenticated, function (req, res) {
      // data is returned parsed to faciliatate front end integration
      res.render('profile',
        {data: {
            username: req.user.username,
            photo: req.user.photo,
            title: req.user.title,
            castle: req.user.castle,
            provinceCount: req.user.provinceCount,
            knightCount: req.user.knightCount,
            archerCount: req.user.archerCount,
            mageCount: req.user.mageCount
          }
        });
    });

  // Processing the local login form
  app.post("/api/login/local", passport.authenticate('local-login'), function (req, res) {
    // sending the user data to api/user, which will in turn render the profile page with the parsed data
    res.redirect("/user");
  }
  );

   // Processing the signup form
   app.post("/api/signup", passport.authenticate('local-signup'), function(req, res){
     console.log("we're back from paspport")
    res.redirect("/login");
   }
    );


 
};
