var db = require("../models");
module.exports = function (app) {
  app.get("/", function (req, res) {
    if (req.user) {
      res.redirect("/user");
    } else {
      res.redirect("/login")
    }
  });

  // Getting the local login form
  app.get("/login", function (req, res) {
    if(req.user){
      res.redirect("/user");
    } else {
      res.render('login');
    }
  });

  // Getting the signup form
  app.get("/signup", function(req, res){
    console.log("you're hitting the route")
    res.render('signup', {msg: "Time to get to work!"});
  });

  // Load index page
  app.get("/user", function (req, res) {
    db.Task.findAll({}).then(function (allTasks) {
      //filter tasks
      var personalTasks = allTasks.filter(function(task) {
        if(task.category == "personal") {
          return task;
        }
      });
      var wellnessTasks = allTasks.filter(function(task) {
        if(task.category == "wellness") {
          return task;
        }
      });
      var learningTasks = allTasks.filter(function(task) {
        if(task.category == "learning") {
          return task;
        }
      });
      var creativityTasks = allTasks.filter(function(task) {
        if(task.category == "creativity") {
          return task;
        }
      });
      var exerciseTasks = allTasks.filter(function(task) {
        if(task.category == "exercise") {
          return task;
        }
      });
      var choresTasks = allTasks.filter(function(task) {
        if(task.category == "chores") {
          return task;
        }
      });

      res.render("index", {
        personalTasks: personalTasks,
        wellnessTasks: wellnessTasks,
        learningTasks: learningTasks,
        creativityTasks: creativityTasks,
        exerciseTasks: exerciseTasks,
        choresTasks: choresTasks,
        data: {
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
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render('404');
  });
};
