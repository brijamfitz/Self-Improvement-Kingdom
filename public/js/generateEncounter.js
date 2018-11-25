nameArray = [];


var encounterGen = {
    //takes in initial values, takes total player army size and total player provinces to calculate
    encounterInit: function(armyTotal, provinceTotal){
        //determines the max and min size of the base army(10% above or 20% below)
        armyCeiling = Math.round(armyTotal * 1.1);
        armyFloor = Math.round(armyTotal / 1.2);
        //actual base army size
        baseArmy = Math.floor(Math.random() * (armyCeiling - armyFloor)) + armyFloor;
        //multiplier determined by province count, more provinces = harder encounters
        multiplier = Math.round(provinceTotal/10)
        if (multiplier === 0){
            multiplier = 1;
        }
        multiplier = multiplier/10 + 1;
        //actual army total of new army
        genArmy = Math.round(baseArmy*multiplier)
        this.nameGeneration();
    },
    troopTotals: function(armySize){
        //first determines the army size
        armyLeft = armySize;
        //generates a random number to determine which troop type is filled first
        chooser = Math.floor(Math.random() * 3);
        //stores the first pick and then splices it from type array to keep from repeating
        firstPick = this.typeArray[chooser];
        this.typeArray.splice(chooser, 1)
        //runs troopGen on the first time, then subtracts from army total
        var firstCount = this.troopGen(armyLeft, firstPick, false);
        armyLeft = armyLeft - firstCount;
        //same as first chooser, one less option
        chooser = Math.floor(Math.random() * 2);
        secondPick = this.typeArray[chooser];
        this.typeArray.splice(chooser, 1);
        var secondCount = this.troopGen(armyLeft, secondPick, false);
        armyLeft = armyLeft - secondCount;
        //no other choice for last one
        thirdPick = this.typeArray[0];
        this.troopGen(armyLeft, thirdPick, true);
        this.exportFunction();
    },
    //function that does the actual generation of troop numbers, takes the max, type picked, and a flag checking if its the last one
    troopGen: function(ceiling, typePicked, isLast){
        if (isLast === false){
            troops = Math.floor(Math.random() * ceiling);
        // if last pick, will just set remaining troops as value
        } else {
            troops = ceiling;
        }
        //runs a check based on type to see where the value will be stored in the export object
        if (typePicked === "knight"){
            this.exportObject.knightCount = troops;
        }
        else if (typePicked === "mage"){
            this.exportObject.mageCount = troops;
        }
        else if (typePicked === "archer"){
            this.exportObject.archerCount = troops;
        }
        return troops;
    },
    nameGeneration: function() {
        randomizer = Math.floor(Math.random() * 199);
        this.exportObject.encounterName = "The Battle of " + nameArray[randomizer].trim();
        encounterGen.troopTotals(genArmy);

    },
    //static array used to help with random generation
    typeArray: ["knight", "mage", "archer"],
    //the object that gets exported at the end of the script, is updated as troops are  added
    exportObject: {
        knightCount: 0,
        mageCount: 0,
        archerCount: 0,
        encounterName: "test"
    },
    exportFunction: function(){
        console.log(encounterGen.exportObject);
        $.ajax({
            method: "POST",
            url: "/api/encounter",
            data: encounterGen.exportObject
        }).then(function(result){
            console.log("here?")
            console.log(result);
            return encounterGen.exportObject;
            
        })
        
    }

}

//function used to display encounters in their appropriate locations
function displayEncounter(encounterObject){
    $("#battleName").text(encounterObject.encounterName);
    $("#enemy-archer-count").text(encounterObject.archerCount);
    $("#enemy-mage-count").text(encounterObject.mageCount);
    $("#enemy-knight-count").text(encounterObject.knightCount);
}

//script for when page loads
$(document).ready(function(){
    
    //get user information to see if they completed an encounter or not
    $.ajax({
        method: "GET",
        url: "/api/user"
    }).then(function(result){
        //all player army saved to variables
        var playerKnights = result.knightCount;
        var playerMages = result.mageCount;
        var playerArchers = result.archerCount;
        var provinceTotal = result.provinceCount;
        var armyTotal = playerKnights + playerMages + playerArchers;
        console.log(armyTotal);
        console.log(provinceTotal);
        //check to see if an encounter was completed today
        if ((result.encounterCompleted === false)&&(armyTotal > 1)){
            //check to see if encounter was generated
            if (result.encounterGenerated === false){
                //calls api for text file containing random name generator
                $.ajax({
                    method: "GET",
                    url: "/api/encounterNames"

                  }).then(function(result){
                    //split up text file by ,
                    nameArray = result.toString().split(",");
                    //generate new encounter based upon existing values
                    encounterGen.encounterInit(armyTotal, provinceTotal);
                    var exportedObject = encounterGen.exportObject;
                    //display encounter on page
                    displayEncounter(exportedObject);                
                    //object to update user page
                    var encounterUpdate = {
                        encounterGenerated: true
                    }
                    $.ajax({
                        method: "PUT",
                        url: "/api/user/encounterUpdate",
                        data: encounterUpdate
                    }).then(function(result){
                        console.log(result);
                    })
                });
            // if encounter already generated, take existing values and display on page
            } else {

                 $.ajax({
                     method: "GET",
                     url:"/api/encounter/"
                 }).then(function(result){
                    displayEncounter(result);
                 })
            }
        //displays if battle already completed
        } else {
            $("#encounter-card").html("");
            var newDiv = $("<div>");
            if(armyTotal == 0){
                $(newDiv).text("Your forces are too weak to attempt battle, perform some tasks and bolster your forces.")
            } else {
                $(newDiv).text("Encounter already completed today, come back tomorrow!");
            }
            $(newDiv).addClass("text-align-center");
            $("#encounter-card").append(newDiv);
        }
    })
    
   

});