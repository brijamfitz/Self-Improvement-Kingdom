var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/tasks", function(req, res) {
    db.Task.findAll({}).then(function(allTasks) {
      console.log(allTasks);
      res.json(allTasks);
    });
  });

  // Create a new example
  app.post("/api/tasks", function(req, res) {
    db.Task.create(req.body).then(function(newTask) {
      res.json(newTask);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
