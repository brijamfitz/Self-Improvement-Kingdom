var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var passport = require("../config/passport")
var fs = require("fs");

module.exports = function (app) {

  /* ================================================================================== */
  /* LOGIN/SIGNUP ROUTES */
  /* ================================================================================== */

  // Processing the local login form
  app.post("/api/login/local",function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      console.log("Here's the returned user: " + user);
      if (err) { 
        return next(err); }
        ;
      if (!user) { 
        return res.redirect('/login', {msg: "Username or Password incorrect, please try again or follow the link to sign up."}); 
      };
      req.logIn(user, function(err) {
        if (err) { 
          return next(err); 
        };
        process.nextTick(function(){res.redirect('/')});
      })
    })(req, res, next);
  });

  // Processing the signup form
  app.post("/api/signup", passport.authenticate('local-signup', {
    successRedirect: "/user",
    failureRedirect: "/signup",
  }));
  
  /* ================================================================================== */
  /* TASK ROUTES */
  /* ================================================================================== */

  // GET route for accessing task data
  app.get("/api/task/:id", function (req, res) {
    db.Task.findOne({where: {id: req.params.id}}).then(function (task) {
      res.json(task);
    })
  });

  // POST route for creating a new task
  app.post("/api/tasks", function (req, res) {
    var newTask = {
      name: req.body.name,
      category: req.body.category,
      difficulty: req.body.difficulty,
      UserId: req.session.userId
    }
    console.log(newTask)
    db.Task.create(newTask).then(function (newTask) {
      res.json(newTask);
    });
  });

  // PUT route for editing a task
  app.put("/api/task/:id", function(req, res){
    db.Task.update({
      name: req.body.name, difficulty: req.body.difficulty
    }, {
      where: {id:req.params.id}
    }).then(function(task){
      res.json(task);
    })
  });

  // PUT route for completing a task
  app.put("/api/task/complete/:id", function (req, res) {
    db.Task.update({ completed: true }, { where: { id: req.params.id } }).then(function (task) {
      res.json(task);
    })
  });

  // DELETE route for removing tasks
  app.delete("/api/task/:id", function (req, res) {
    db.Task.destroy({ where: { id: req.params.id } }).then(function (task) {
      res.json(task);
    })
  });

  /* ================================================================================== */
  /* USER/ARMY ROUTES */
  /* ================================================================================== */

  // Route for getting user data from database.
  app.get("/api/user/", function(req, res){
    db.User.findOne({where:{id: req.session.userId}}).then(function(user){
      res.json(user);
    })
  })

  
  // PUT route for adding to player army on task completion
  app.put("/api/user/army/:id", function(req, res){
    db.User.update({
      archerCount: req.body.archerCount,
      knightCount: req.body.knightCount,
      mageCount: req.body.mageCount,
    }, {
      where: {id:req.params.id}
    }).then(function(army){
      res.json(army);
    })
  });

  //PUT route to update user values after combat
  app.put("/api/user/armyLosses", function(req, res){
    db.User.update({
      archerCount: req.body.archerCount,
      knightCount: req.body.knightCount,
      mageCount: req.body.mageCount,
      provinceCount: req.body.provinceCount,
      encounterCompleted: true
    }, {
      where: {id: req.session.userId}
    }).then(function(user){
      res.json(user);
    })
  });

  // DELETE THIS ROUTE? POSSIBLY NOT IN USE
  app.get("/api/army", function (req, res) {
    var playerArmy = {
      knightCount: req.user.knightCount,
      mageCount: req.user.mageCount,
      archerCount: req.user.archerCount
    }
    res.json(playerArmy);
  });

  //update to user to show encounter has been generated
  app.put("/api/user/encounterUpdate", function(req, res){

    db.User.update({
      encounterGenerated: req.body.encounterGenerated
    },{
      where: {id:req.session.userId}
    }).then(function(update){
      res.json(update);
    })
  })

//route for txt file containing list of potential battle names
  app.get("/api/encounterNames", function(req, res){
    fs.readFile('text/names.txt', "utf-8", (err, data) => {
      if (err) throw err;
      var nameArray = data.split(",")
      res.json(nameArray);
  });

});

//new encounter route
  app.post("/api/encounter/new", function(req, res){
    var newEncounter = {
      knightCount: req.body.knightCount,
      mageCount: req.body.mageCount,
      archerCount: req.body.archerCount,
      encounterName: req.body.encounterName,
      UserId: req.session.userId
    };
    console.log(newEncounter);
    db.Encounter.create(newEncounter).then(function(newEncounter){
      res.json(newEncounter);
    })
  });

  //route to get information on encounters 
  app.get("/api/encounter/", function(req, res){
    db.Encounter.findOne({where:{UserId: req.session.userId}}).then(function(encounter){
      res.json(encounter);
    })
  })

// PUT route to update user level-up (castle image and title)
app.put("/api/user/progress/", function(req, res){
  db.User.update({
    provinceCount: req.body.provinceCount,
    castle: req.body.castle,
    title: req.body.title,
  }, {
    where: {id: req.session.userId}
  }).then(function(dbResults){
    res.json(dbResults);
  })
});


}

