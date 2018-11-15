var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var passport = require("../config/passport")

module.exports = function (app) {
    // Processing the local login form
  app.post("/api/login/local", passport.authenticate('local-login'), function (req, res) {
    // sending the user data to api/user, which will in turn render the profile page with the parsed data
    res.redirect("/login");
  }
  );

   // Processing the signup form
   app.post("/api/signup", passport.authenticate('local-signup'), function(req, res){
    res.redirect("/login");
   }
    );

  app.set("/api/tasks/edit", function(req, res){
    db.Task.findById(req.body.taskId).then(function(data){

    })
      
    
  })

   app.get("/api/army", function(req, res){
     var playerArmy = {
       knightCount: req.user.knightCount,
       mageCount: req.user.mageCount,
       archerCount: req.user.archerCount
     }
     res.json(playerArmy);
   })
};  
