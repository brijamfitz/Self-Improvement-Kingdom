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
        encounterGen.exportObject.battleName = "The Battle of " + nameArray[randomizer].trim();
        encounterGen.troopTotals(genArmy);

    },
    //static array used to help with random generation
    typeArray: ["knight", "mage", "archer"],
    //the object that gets exported at the end of the script, is updated as troops are
    exportObject: {
        knightCount: 0,
        mageCount: 0,
        archerCount: 0,
        battleName: this.name
    },
    exportFunction: function(){
        console.log(encounterGen.exportObject);
        return encounterGen.exportObject;
    }

}

$(document).ready(function(){
    
    $.ajax({
        method: "GET",
        url: "/api/encounterNames"
      }).then(function(result){
        nameArray = result.toString().split(",")
        var playerKnights = $("#player-knight-count").text();
        var playerMages = $("#player-mage-count").text();
        var playerArchers = $("#player-archer-count").text();
        var armyTotal = parseInt(playerKnights) + parseInt(playerMages) + parseInt(playerArchers);
        var provinceTotal = 10;
        encounterGen.encounterInit(armyTotal, provinceTotal);
        var exportedObject = encounterGen.exportFunction();
        $("#battleName").text(exportedObject.battleName);
        console.log(exportedObject);
        
    });

});