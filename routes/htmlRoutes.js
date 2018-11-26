var db = require("../models");
var onLoad = require("../public/js/onLoad")

module.exports = function (app) {

  app.get("/", function (req, res) {
      if (req.user) {
        res.redirect("/user");
      } else {
        res.redirect("/login");
      }
  });

  // Getting the local login form
  app.get("/login", function (req, res) {
      if (req.user) {
        res.redirect("/");
      } else {
        res.render('login', {msg: req.flash('error')});
      }
  });

  // Getting the signup form
  app.get("/signup", function (req, res) {
    console.log("you're hitting the route")
    res.render('signup', {msg: req.flash('message')});
  });

  // Load index page
  app.get("/user", function (req, res) {
    var id;
    if (req.user.id){
      id = req.user.id
    } else {
      id = req.session.userId
    }
<<<<<<< HEAD
    db.Task.findAll({ where: { UserId: id }, order:['createdAt'], include:[db.User] }).then(function (allTasks) {
=======
    db.Task.findAll({ where: { UserId: id }, order:[['createdAt', 'DESC']] }).then(function (allTasks) {
>>>>>>> c8c8903422f996b10433a59adb2e96f75d83b6a1
      var renderObject = onLoad(allTasks, req);
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
