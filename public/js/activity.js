// Middleware for parsing various activities for the activity model which will be used by the feed
module.exports = function (input) {

    // Battle feed stuff
    var localBattle;
    var battleActivity = {};
    if (input.body.encounterName) {
        input.session.encounterName = input.body.encounterName;
    };
    if (input.body.category === "battle") {
        localBattle = {
            user: input.session.username,
            category: "battle",
            battleStatus: input.body.battleStatus,
            battleName: input.body.battleName
        };
        if (localBattle.battleStatus) {
            battleActivity.actor = localBattle.user;
            battleActivity.category = "battle";
            battleActivity.action = "" + localBattle.user + " has been " + localBattle.battleStatus + " at " + input.body.battleName;
            console.log(battleActivity);
            return battleActivity;
        };
    }

    // Friend feed stuff
    var friendActivity = {};
    if (input.body.category === "friend") {
        switch (input.body.status) {
            case ("accepted"):
                friendActivity.actor = input.session.username;
                friendActivity.category = "friend";
                friendActivity.action = "" + input.session.username + " and " + input.body.username + " are now allies!";
                break;
            case ("rejected"):
                friendActivity.actor = input.session.username;
                friendActivity.category = "friend";
                friendActivity.action = "" + input.session.username + " has rejected " + input.body.username + "'s offer of alliance! Ill tidings indeed...";
                break;
            case ("deleted"):
                friendActivity.actor = input.session.username;
                friendActivity.category = "friend";
                friendActivity.action = "" + input.session.username + " has terminated their alliance with " + input.body.username + ".  War is likely brewing sire, guard your borders well.";
                break;
        };
        return friendActivity;

    }

}

