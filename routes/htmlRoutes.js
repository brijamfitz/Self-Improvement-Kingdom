
module.exports = function (app) {
  // splash checks if user is registered, if so redirects to user's page
  app.get("/", function (req, res) {
    if (req.user) {
      res.redirect("/user");
    } else {
      res.redirect("/login")
    }
  });

  // Getting the local login form
  app.get("/login", function (req, res) {
      res.render('login', {message: req.flash('info','message')});
      console.log(req.flash('info','message'))
    }
  );

  // Getting the signup form
  app.get("/signup", function(req, res){
    console.log("you're hitting the route")
    res.render('signup', {msg: "Time to get to work!"});
});

 // the "main" page displaying our user's info and stuff
  app.get("/user", function(req, res){
      // data is returned parsed to faciliatate front end integration
    res.render('index',
    {data: {
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

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render('404');
  });
};
