var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Task.findAll({
      where: { category: "personal" }
    }).then(function (personalTasks) {
      console.log(personalTasks);
      res.render("index", personalTasks);
    });

    // db.Task.findAll({
    //   where: { category: "health/wellness" }
    // }).then(function (wellnessTasks) {
    //   console.log(wellnessTasks);
    //   res.render("index", wellnessTasks);
    // });

    // db.Task.findAll({
    //   where: { category: "learning/school" }
    // }).then(function (learningTasks) {
    //   console.log(learningTasks);
    //   res.render("index", learningTasks);
    // });

    // db.Task.findAll({
    //   where: { category: "creativity" }
    // }).then(function (creativityTasks) {
    //   console.log(creativityTasks);
    //   res.render("index", creativityTasks);
    // });

    // db.Task.findAll({
    //   where: { category: "exercise" }
    // }).then(function (exerciseTasks) {
    //   console.log(exerciseTasks);
    //   res.render("index", exerciseTasks);
    // });

    // db.Task.findAll({
    //   where: { category: "chores" }
    // }).then(function (choresTasks) {
    //   console.log(choresTasks);
    //   res.render("index", choresTasks);
    // });
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
