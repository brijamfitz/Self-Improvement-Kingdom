module.exports = battleCalc = {
    waveCalc: function (armyObject) {
        var deadKnights = 0;
        var deadMages = 0;
        var deadArchers = 0;
        //calculates for each knight if they hit their target or not
        for (i = 0; i < armyObject.knightCount; i++) {
            knightRoll = Math.floor((Math.random() * 100) + 1);
            if (knightRoll <= 3) {
                deadKnights++;
            }
            else if (knightRoll <= 6) {
                deadMages++;
            }
            else if (knightRoll <= 15) {
                deadArchers++;
            };
        };

        //calculates for each mage if they hit their target or not
        for (i = 0; i < armyObject.mageCount; i++) {
            mageRoll = Math.floor((Math.random() * 100) + 1);
            if (mageRoll <= 3) {
                deadMages++;
            }
            else if (mageRoll <= 6) {
                deadArchers++;
            }
            else if (mageRoll <= 15) {
                deadKnights++;
            };
        };
        //calculates for each archer if they hit their target or not
        for (i = 0; i < armyObject.archerCount; i++) {
            archerRoll = Math.floor((Math.random() * 100) + 1);
            if (archerRoll <= 3) {
                deadArchers++;
            }
            else if (archerRoll <= 6) {
                deadKnights++;
            }
            else if (archerRoll <= 15) {
                deadMages++;
            };
        };
        var returnObject = {
            deadKnights: deadKnights,
            deadMages: deadMages,
            deadArchers: deadArchers
        }

        console.log(returnObject);
        return returnObject;
    },
    waveResult: function(armyObject, killData){
        var newArmy = {
            knightCount: 0,
            mageCount: 0,
            archerCount: 0
        }

    //check to make sure that the player doesnt lose more knights than they have
      if (killData.deadKnights > armyObject.knightCount){
        killData.deadKnights = armyObject.knightCount;
        newArmy.knightCount = 0
      } else {
        newArmy.knightCount = armyObject.knightCount - killData.deadKnights;
      }

      if (killData.deadMages > armyObject.mageCount){
        killData.deadMages = armyObject.mageCount
        newArmy.mageCount = 0
      } else {
        newArmy.mageCount = armyObject.mageCount - killData.deadMages;
      }

      if (killData.deadArchers > armyObject.archerCount){
          killData.deadArchers = armyObject.archerCount;
        newArmy.archerCount = 0
      } else {
        newArmy.archerCount = armyObject.archerCount - killData.deadArchers;
      }
      console.log(newArmy);
      return newArmy;
    }
}
