const CronJob = require('cron').CronJob;

var db = require("../models");

var userArray = [];
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//functions
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//constructor for object used to update user data within database
function UserObject(provinceCount, id, username){
	this.provinceCount = provinceCount;
	this.id = id;
	this.username = username;
};

//updates the database with UserObject information
function updateData(array){
	for (i = 0; i < array.length; i++){
		//all users updated with new province counts and encounter flags reset
		db.User.update({
			provinceCount: array[i].provinceCount,
			encounterCompleted: false,
			encounterGenerated: false
		}, 
		{where:{id: array[i].id}}).then(function(){
		});
	}
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//begin script
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
console.log('Before job instantiation');
//cron time control, currently rigged for 11:59PM(23:59) every day
const job = new CronJob("59 23 * * *", function() {
	db.User.findAll().then(function(user) {
		console.log("Finding users")
		// user will be an array of all user instances
		for (i = 0; i < user.length; i++){
			var newObject = new UserObject(user[i].provinceCount, user[i].id, user[i].username);
			//if the user does not complete the encounter, they will lose a province
			if (user[i].encounterCompleted === false){
				newObject.provinceCount--;
				console.log(newObject);			
			}
		userArray.push(newObject)
		}
		updateData(userArray);

	});

});
console.log('After job instantiation');
job.start();