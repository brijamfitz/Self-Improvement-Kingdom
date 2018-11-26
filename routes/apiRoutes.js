var db = require("../models");
var passport = require("../config/passport")
var fs = require("fs");
var battle = require("../script/battleCalculations")
var activity = require("../public/js/activity")

module.exports = function (app) {

  /* ================================================================================== */
  /* LOGIN/SIGNUP ROUTES */
  /* ================================================================================== */

  // Processing the local login form
  app.post("/api/login/local", function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
      console.log("Here's the returned user: " + user);
      if (err) {
        return res.redirect('/');
      };
      if (!user) {
        return res.redirect('/');
      };
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        };
        res.redirect('/');
      })
    })(req, res, next);
  });

  // Processing the signup form
  app.post("/api/signup", passport.authenticate('local-signup', {
    successRedirect: "/",
    failureRedirect: "/",
  }));

  /* ================================================================================== */
  /* TASK ROUTES */
  /* ================================================================================== */

  // GET route for accessing task data
  app.get("/api/task/:id", function (req, res) {
    db.Task.findOne({ where: { id: req.params.id } }).then(function (task) {
      res.json(task);
    })
  });

  // POST route for creating a new task
  app.post("/api/tasks", function (req, res) {
    var newTask = {
      name: req.body.name,
      category: req.body.category,
      difficulty: req.body.difficulty,
      UserId: req.session.userId
    }
    console.log(newTask)
    db.Task.create(newTask).then(function (newTask) {
      res.json(newTask);
    });
  });

  // PUT route for editing a task
  app.put("/api/task/:id", function (req, res) {
    db.Task.update({
      name: req.body.name, difficulty: req.body.difficulty
    }, {
        where: { id: req.params.id }
      }).then(function (task) {
        res.json(task);
      })
  });

  // PUT route for completing a task
  app.put("/api/task/complete/:id", function (req, res) {
    db.Task.update({ completed: true }, { where: { id: req.params.id } }).then(function (task) {
      res.json(task);
    })
  });

  // DELETE route for removing tasks
  app.delete("/api/task/:id", function (req, res) {
    db.Task.destroy({ where: { id: req.params.id } }).then(function (task) {
      res.json(task);
    })
  });

  /* ================================================================================== */
  /* USER/ARMY ROUTES */
  /* ================================================================================== */

  // Route for getting user data from database.
  app.get("/api/user/", function (req, res) {
    db.User.findOne({ where: { id: req.session.userId } }).then(function (user) {
      res.json(user);
    })
  })

  //PUT route to update user values after combat or on task completion
  app.put("/api/user", function (req, res) {
    var pCount;
    var eComp;
    if (req.body.provinceCount) {
      pCount = req.body.provinceCount;
      eComp = true;
    } else {
      pCount = req.session.provinceCount;
      eComp = req.session.encounterCompleted;
    }
    db.User.update({
      archerCount: req.body.archerCount,
      knightCount: req.body.knightCount,
      mageCount: req.body.mageCount,
      provinceCount: pCount,
      encounterCompleted: eComp
    }, {
        where: { id: req.session.userId }
      }).then(function (user) {
        res.json(user);
      })
  });


  //update to user to show encounter has been generated
  app.put("/api/user/encounterUpdate", function (req, res) {
    db.User.update({
      encounterGenerated: req.body.encounterGenerated
    }, {
        where: { id: req.session.userId }
      }).then(function (update) {
        res.json(update);
      })
  })

  //route for txt file containing list of potential battle names
  app.get("/api/encounterNames", function (req, res) {
    fs.readFile('text/names.txt', "utf-8", (err, data) => {
      if (err) throw err;
      var nameArray = data.split(",")
      res.json(nameArray);
    });

  });

  //new encounter route
  app.post("/api/encounter", function (req, res) {
    var newEncounter = {
      knightCount: req.body.knightCount,
      mageCount: req.body.mageCount,
      archerCount: req.body.archerCount,
      encounterName: req.body.encounterName,
      UserId: req.session.userId
    };
    console.log(newEncounter);
    db.Encounter.create(newEncounter).then(function (newEncounter) {
      res.json(newEncounter);
    })
  });

  //route to get information on encounters 
  app.get("/api/encounter", function (req, res) {
    db.Encounter.findOne({ where: { UserId: req.session.userId } }).then((encounter) => {
      res.json(encounter);
    })
  })

  // PUT route to update user level-up (castle image and title)
  app.put("/api/user/progress/", function (req, res) {
    db.User.update({
      provinceCount: req.body.provinceCount,
      castle: req.body.castle,
      title: req.body.title,
    }, {
        where: { id: req.session.userId }
      }).then(function (dbResults) {
        res.json(dbResults);
      })
  });

  /* ================================================================================== */
  /* Social Routes */
  /* ================================================================================== */

  // get friend data
  app.get("/api/friends", function (req, res) {
    db.sequelize.query("SELECT Users.id, username, title, status FROM Users JOIN Friends ON ? = Friends.requestee AND username = Friends.requester AND status = 'pending' OR ? = Friends.requester AND username = Friends.requestee AND status = 'accepted' OR ? = Friends.requestee AND username = Friends.requester AND status = 'accepted'", { replacements: [req.session.username, req.session.username, req.session.username] })
      .spread((results, metaData) => {
        res.send(results)
      })
  });

  // make new friend requests
  app.post("/api/friends", function (req, res) {
    var fReq = {
      requester: req.session.username,
      status: 'pending',
      requestee: req.body.username
    }
    db.Friend.create(fReq).then(function (friends) {
      res.json(friends);
    })
  });

  // accept, reject, or delete friend requests
  app.put("/api/friends", function (req, res) {
    db.Friend.update({ 'status': req.body.status }, { where: { 'requestee': req.session.username, 'requester': req.body.username, 'status': "pending" } }).then(function (user) {
      res.json(user);
    })
  });

  // get feed data
  app.get("/api/activity", function (req, res) {
    db.sequelize.query("Select * FROM Activities JOIN Friends ON ? = Friends.requester AND  Friends.status='accepted' AND Friends.requestee = Activities.actor OR Activities.actor = Friends.requester AND Friends.status='accepted' and ? = Friends.requestee OR ? = Friends.requester AND Friends.status = 'accepted' AND category <> 'battle'", {replacements: [req.session.username, req.session.username, req.session.username]}).then(function (result, metadata) {
      res.json(result[0]);
    })
  })

  // call middle ware to parse outgoing data
  app.put("/api/activity", function (req, res) {
    res.json(activity(req));
  });

  // post feed data
  app.post("/api/activity", function (req, res) {
    db.Activity.create(req.body).then(function (activity) {
      res.json(activity);
    })
  })

    /* ================================================================================== */
  /* BATTLE ROUTES */
  /* ================================================================================== */

  //route for the battle logic to get the unit counts for user and encounter armies
  app.get("/api/battle/status/user", function(req, res){
    db.User.findOne( { where: {id: req.session.userId}}).then(function(user){
      var responseObject = {
        userStorage: user
      }
      db.Encounter.findOne( { where: {UserId: req.session.userId}}).then(function(encounter){
        responseObject.encounterStorage = encounter;
        res.json(responseObject);
      })
    })
  })

  //route used to calculate wave damage 
  app.post("/api/battle/waveCalc", function(req, res){
    //first determines who is taking turn
    isPlayer = JSON.parse(req.body.isPlayer);
  if (isPlayer === true){
    console.log("player turn")
    db.User.findOne( { where: { id: req.session.userId} }).then(function(user) {
      res.json( battle.waveCalc(user)); 
    });
  } else if (isPlayer === false){
    console.log("computer turn")
    db.Encounter.findOne( { where: {UserId: req.session.userId} }).then(function(encounter){
      res.json(battle.waveCalc(encounter));
    })
  }

  });

  //route to update user army count after wave casualties
  app.post("/api/battle/waveResult/player", function(req, res){
    //number of units the computer has killed is taken in
    var killObject = req.body;
    db.User.findOne( {where: {id: req.session.userId} }).then(function(user){
      var userObject = user;
      //determines player deaths from computer army
      var newPlayerArmy = battleCalc.waveResult(userObject, killObject);
      //update user army
      db.User.update({
        knightCount: newPlayerArmy.knightCount,
        mageCount: newPlayerArmy.mageCount,
        archerCount: newPlayerArmy.archerCount
      },
      {where:{
        id: req.session.userId
      }}).then(function(){
        res.json(newPlayerArmy);
      })

    })
  });

  //route to update encounter army ocunt after wave casualties
  app.post("/api/battle/waveResult/computer", function(req, res){
    db.Encounter.findOne( {where: {UserId: req.session.userId} }).then(function(computer){
      var computerObject = computer;
      var killObject = req.body;
      //determines computer deaths from player army
      var newComputerArmy = battleCalc.waveResult(computerObject, killObject);
      //update computer army
      db.Encounter.update({
        knightCount: newComputerArmy.knightCount,
        mageCount: newComputerArmy.mageCount,
        archerCount: newComputerArmy.archerCount
      },
      {
        where:{
          UserId: req.session.userId
        }
      }).then(function(){
        res.json(newComputerArmy);
      })
    });
  });

  

}

