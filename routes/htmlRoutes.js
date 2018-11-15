var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Task.findAll({}).then(function (allTasks) {
      // console.log(allTasks);
      //filter tasks

      // var personalCheck = function(task) {
      //   if(task.category == "personal") {
      //     return task;
      //   }
      // }
      // var wellnessCheck = function(task) {
      //   if(task.category == "wellness") {
      //     return task;
      //   }
      // }

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

      console.log(wellnessTasks);
      res.render("index", {
        personalTasks: personalTasks,
        wellnessTasks: wellnessTasks,
        learningTasks: learningTasks,
        creativityTasks: creativityTasks,
        exerciseTasks: exerciseTasks,
        choresTasks: choresTasks
      });
      // res.render("index", {
      //   allTasks: allTasks
      // });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
