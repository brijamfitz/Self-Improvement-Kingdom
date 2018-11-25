module.exports = function (input) {
    var localBattle;
    var battleActivity = {};
    if (input.body.category === "battle") {
        var localBattle = {
            user: input.session.username,
            category: "battle",
            encounterName: input.body.encounterName,
            battleStatus: input.body.battleStatus,
        };  
        if (localBattle.battleStatus) {
            battleActivity.actor = localBattle.user;
            battleActivity.category = "battle";
            battleActivity.action = "" + localBattle.user + " has been " + localBattle.battleStatus + " at the battle of " + localBattle.encounterName;
            $.ajax({
                method: "POST",
                url: "/api/activity",
                data: battleActivity
            }).then(function(res){
                console.log("new battle pushed");
            })
        };
    }
}

