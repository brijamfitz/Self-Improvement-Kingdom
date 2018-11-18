var db = require("../models");
var taskSort = require("../public/js/taskSort")

module.exports = function (app) {

  app.get("/", function (req, res) {
    process.nextTick(function () {
      if (req.user) {
        res.redirect("/user");
      } else {
        res.redirect("/login")
      }
    });
  });

  // Getting the local login form
  app.get("/login", function (req, res) {
    if(!req.user){
    res.render('login');
    } else {
      res.redirect("/");
    }
  });

  // Getting the signup form
  app.get("/signup", function (req, res) {
    console.log("you're hitting the route")
    res.render('signup', { msg: req.flash('message') });
  });

  // Load index page
  app.get("/user", function (req, res) {
    db.Task.findAll({ where: { UserId: req.user.id } }).then(function (allTasks) {
      var renderObject = taskSort(allTasks, req);
      res.render("index", renderObject);
    });
  });

  app.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy(function () {
      res.redirect('/login')
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render('404');
  });
};
