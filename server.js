require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("./config/passport");
var db = require("./models");
var flash = require("connect-flash")
var app = express();
var PORT = process.env.PORT || 8080;
var session = require("express-session");
var Sequelize = require("sequelize");
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var cron = require("./script/cron")

var myStore = new SequelizeStore({
  db: db.sequelize,
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({
  secret: 'taskmanagerkingdom',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: myStore
}));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());



// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };


// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

myStore.sync();
// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
