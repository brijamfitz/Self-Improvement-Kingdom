var db = require("../models");
var onLoad = require("../public/js/onLoad")

module.exports = function (app) {

  app.get("/", function (req, res) {
    console.log("+++++++++++++++++++++++++++++++++++++>>>>>"+req.user+"<++++++++++++++++++++++++++");
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
    if (req.user){
      id = req.user.id
    } else {
      id = req.session.userId
    }
    db.Task.findAll({ where: { UserId: id } }).then(function (allTasks) {
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
