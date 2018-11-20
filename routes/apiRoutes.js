var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var passport = require("../config/passport")
var fs = require("fs");

module.exports = function (app) {
  app.get("/api/tasks", function(req, res) {
    db.Task.findAll({}).then(function(allTasks) {
      res.json(allTasks);
    })
  });

  app.post("/api/tasks", function(req, res) {
    db.Task.create(req.body).then(function(newTask) {
      res.json(newTask);
    });
  });

    // Processing the local login form
  app.post("/api/login/local", passport.authenticate('local-login'), function (req, res) {
    // sending the user data to api/user, which will in turn render the profile page with the parsed data
    res.redirect("/login");
  });

   // Processing the signup form
   app.post("/api/signup", passport.authenticate('local-signup'), function(req, res){
    res.redirect("/login");
   });

   // set route for editing individual tasks
  app.set("/api/task/edit", function(req, res){
    db.Task.update({taskBody: req.body.text}, {where: {id:req.body.id}}).then(function(task){
      //returns the updated task, would be lighter on the server to reload this object rather than reloading the whole page
      res.json(task);
    })
  });

    // set route for completing individual tasks
  app.set("/api/task/complete", function(req, res){
    db.Task.update({taskCompleted: true}, {where: {id:req.body.id}}).then(function(task){
      //returns the updated task
    res.json(task);
    })
  });

    // delete route for removing tasks
  app.delete("/api/task/:id", function(req, res){
    db.Task.destroy({where: {id:req.params.id}}).then(function(task){
      res.json(task);
    })
  });

  app.get("/api/army", function(req, res){
    var playerArmy = {
      knightCount: req.user.knightCount,
      mageCount: req.user.mageCount,
      archerCount: req.user.archerCount
    }
    res.json(playerArmy);
  });

  app.get("/api/encounterNames", function(req, res){
    fs.readFile('text/names.txt', "utf-8", (err, data) => {
      if (err) throw err;
      var nameArray = data.split(",")
      res.json(nameArray);
  })

})

}

