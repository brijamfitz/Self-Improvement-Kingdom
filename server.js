require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("./config/passport");
var db = require("./models");
var flash = require("flash")
var app = express();
var PORT = process.env.PORT || 8080;
var session = require("express-session");
var Sequelize = require("sequelize");
var SequelizeStore = require('connect-session-sequelize')(session.Store);

var sequelize = new Sequelize (
  process.env.DB_name,
  process.env.DB_username,
  process.env.DB_password,
  {"dialect": "mysql",
"storage": "./session.sqlite"}
);

var myStore = new SequelizeStore({
  db: sequelize,
});

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({ 
  secret: 'taskmanagerkingdom', 
  resave: false,
  saveUninitialized: true, 
  cookie:{secure: false} ,
  store: myStore
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(flash);

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
myStore.sync();

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

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
