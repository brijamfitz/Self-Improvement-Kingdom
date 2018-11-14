
module.exports = function (app) {
  // splash checks if user is registered, if so redirects to user's page
  app.get("/", function (req, res) {
    if (req.user) {
      res.redirect("/api/user");
    } else {
      res.redirect("/login")
    }
  });

  // Getting the local login form
  app.get("/login", function (req, res) {
    if(req.user){
      res.redirect("api/user");
    } else {
      res.render('login');
    }
  });


  // Getting the signup form
  app.get("/signup", function(req, res){
    console.log("you're hitting the route")
    res.render('signup', {msg: "Time to get to work!"});
});

  app.get("/user", function(req, res){
    console.log('here I am in the profile page');

   res.redirect("/api/user")
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render('404');
  });
};
