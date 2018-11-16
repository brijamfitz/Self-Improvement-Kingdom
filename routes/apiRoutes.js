var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var passport = require("../config/passport")

module.exports = function (app) {
  // Processing the local login form
  app.post("/api/login/local", passport.authenticate('local-login', {
    successRedirect: "/", // redirect to the home page on successful login
    failureRedirect:"/login", // back to the login page if there's an error
    failureFlash: true
  })
  );

  // Processing the signup form
  app.post("/api/signup", passport.authenticate('local-signup',{
    successRedirect: "/", // redirect to the home page on successful login
    failureRedirect: "/signup", //  back to the signup page if there's an error
    failureFlash: true // sends message back to page in case of error
  }) 
  );

  // set route for editing individual tasks
  app.set("/api/task/edit", function (req, res) {
    db.Task.update({ taskBody: req.body.text }, { where: { id: req.body.id } }).then(function (task) {
      //returns the updated task, would be lighter on the server to reload this object rather than reloading the whole page
      res.json(task);
    })
  });

  // set route for completing individual tasks
  app.set("/api/task/complete", function (req, res) {
    db.Task.update({ taskCompleted: true }, { where: { id: req.body.id } }).then(function (task) {
      //returns the updated task
      res.json(task);
    })
  });

  // delete route for removing tasks
  app.delete("/api/task/delete", function (req, res) {
    db.Task.destroy({ where: { id: req.body.id } }).then(function (task) {
      res.json(task);
    })
  });


  app.get("/api/army", function (req, res) {
    var playerArmy = {
      knightCount: req.user.knightCount,
      mageCount: req.user.mageCount,
      archerCount: req.user.archerCount
    }
    res.json(playerArmy);
  })
};  
