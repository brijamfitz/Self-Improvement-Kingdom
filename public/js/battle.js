var armyOne;
var battleSounds;
var battleStart; 
var battleGif = $('<img class="battle-gif" src="./images/crossed-swords.png">');
// test values for the computer army
var armyTwo = {
    knightCount: 3,
    mageCount: 2,
    archerCount: 1
}

//on document ready, completes an AJAX call to set armyOne as the army
$(document).ready(function(){
    battleSounds = document.getElementById("battleEffects");
    battleStart = document.getElementById("battleStart");
    $.ajax({
        url: "/api/army",
        method: "GET"
    }).then(function(response){
        armyOne = response;
    });
});

$(document).on("click", "#fight-btn", function(){
    battleSounds.play();
    battleStart.play();
    $("#battle-buttons").html("");
    $("#fight-flee").append(battleGif);

     battle.battleInit(armyOne, armyTwo);
});


var battle = {

    //initial function that takes the loaded objects and parses them off to local variables
    battleInit: function(playerArmy, computerArmy){
        pKnight = playerArmy.knightCount;
        pMage = playerArmy.mageCount;
        pArcher = playerArmy.archerCount;
        cKnight = computerArmy.knightCount;
        cMage = computerArmy.mageCount;
        cArcher = computerArmy.archerCount;
        this.updateCounts();

        //begin calculations of waves (fourth argument checks if player or not)
        this.waveCalc(pKnight, pMage, pArcher, true);
        this.waveCalc(cKnight, cMage, cArcher, false);
    },

    //a calculator that checks the inflicted casualties of one side
    waveCalc: function(knightCalc, mageCalc, archerCalc, isPlayer){
        var deadKnights = 0;
        var deadMages = 0;
        var deadArchers = 0;
        //calculates for each knight if they hit their target or not
        for (i = 0; i < knightCalc; i++){
            knightRoll = Math.floor((Math.random() * 100) + 1);
            if (knightRoll <= 3){
                deadKnights++;
            }
            else if (knightRoll <= 6){
                deadMages++;
            }
            else if (knightRoll <= 15){
                deadArchers++;
            };
        };
        
        //calculates for each mage if they hit their target or not
        for (i = 0; i < mageCalc; i++){
            mageRoll = Math.floor((Math.random() * 100) + 1);
            if (mageRoll <= 3){
                deadMages++;
            }
            else if (mageRoll <= 6){
                deadArchers++;
            }
            else if (mageRoll <= 15){
                deadKnights++;
            };
        };
        //calculates for each archer if they hit their target or not
        for (i = 0; i < archerCalc; i++){
            archerRoll = Math.floor((Math.random() * 100) + 1);
            if (archerRoll <= 3){
                deadArchers++;
            }
            else if (archerRoll <= 6){
                deadKnights++;
            }
            else if (archerRoll <= 15){
                deadMages++;
            };
        };
        //if the first part of wave(player turn), stores all player kills for casualty calculation after the computer turn
        if (isPlayer === true){
            this.storedKnights = deadKnights;
            this.storedMages = deadMages;
            this.storedArchers = deadArchers;
        } else {
            //fires both results at the same time
            this.playerResults(this.storedKnights, this.storedMages, this.storedArchers)
            this.computerResults(deadKnights, deadMages, deadArchers)
        };
    },

    //function that takes in player kills
    playerResults: function(knightResult, mageResult, archerResult){
        //first a check to make sure that the player doesn't kill more than the enemy has
        if (knightResult > cKnight){
            knightResult = cKnight;
        };
        if (mageResult > cMage){
            mageResult = cMage;
        };
        if (archerResult > cArcher){
            archerResult = cArcher;
        };
        if (archerResult === 0 && cArcher > 0){
            $("#enemy-archer-loss").removeClass("subtractor");
            $("#enemy-archer-loss").text("(DODGED)")
        } else if (cArcher > 0) {
            $("#enemy-archer-loss").text("(-" + archerResult + ")");
        }
        if (knightResult === 0 && cKnight > 0){
            $("#enemy-knight-loss").removeClass("subtractor");
            $("#enemy-knight-loss").text("(DODGED)");
        } else if (cKnight > 0)  {
            $("#enemy-knight-loss").text("(-" + knightResult + ")");
        }
        if (mageResult === 0 && cMage > 0){
            $("#enemy-mage-loss").removeClass("subtractor");
            $("#enemy-mage-loss").text("(DODGED)")
        } else if (cMage > 0)  {
            $("#enemy-mage-loss").text("(-" + mageResult + ")")
        }
        
        ;
        $("#enemy-archer-loss").fadeOut();
        $("#enemy-knight-loss").fadeOut();
        $("#enemy-mage-loss").fadeOut();
        //a check to see if no casualties are taken
        if (knightResult === 0 && mageResult === 0 && archerResult === 0){
            console.log("Enemy forces took no casualties!");
        } else {
            console.log("Enemy forces lost " + knightResult + " Knights, " + mageResult + " Mages, and " + archerResult + " Archers!" );
        };
        //enemy forces updated
        cKnight = cKnight - knightResult;
        cMage = cMage - mageResult;
        cArcher = cArcher - archerResult;
        console.log("COMPUTER TOTAL: KNIGHTS: " + cKnight + " MAGES: " + cMage + " ARCHERS: " + cArcher);
    },

    //function that takes in computer kills, displays them and then calls for a status check
    computerResults: function(knightResult, mageResult, archerResult){

        //first a check to make sure that the computer doesn't lose more troops than they have
        if (knightResult > pKnight){
            knightResult = pKnight;
        }
        if (mageResult > pMage){
            mageResult = pMage;
        }
        if (archerResult > pArcher){
            archerResult = pArcher;
        };
        if (archerResult === 0 && pArcher > 0){
            $("#player-archer-loss").removeClass("subtractor");
            $("#player-archer-loss").text("(DODGED)  ")
        } else if (pArcher > 0)  {
            $("#player-archer-loss").text("(-" + archerResult + ")  ");
        }
        if (knightResult === 0 && pKnight > 0){
            $("#player-knight-loss").removeClass("subtractor");
            $("#player-knight-loss").text("(DODGED)  ");
        } else if (pKnight > 0)  {
            $("#player-knight-loss").text("(-" + knightResult + ")  ");
        }
        if (mageResult === 0 && pMage > 0){
            $("#player-mage-loss").removeClass("subtractor");
            $("#player-mage-loss").text("(DODGED)  ")
        } else if (pMage > 0)  {
            $("#player-mage-loss").text("(-" + mageResult + ")  ")
        }
        $("#player-archer-loss").fadeOut();
        $("#player-knight-loss").fadeOut();
        $("#player-mage-loss").fadeOut();
        //a check to see if no casulaties are taken
        if (knightResult === 0 && mageResult === 0 && archerResult === 0){
            console.log("Your forces took no casualties!");
        } else {
            console.log("Your forces lost " + knightResult + " Knights, " + mageResult + " Mages, and " + archerResult + " Archers!" );
        };
        //player forces updated
        pKnight = pKnight - knightResult;
        pMage = pMage - mageResult;
        pArcher = pArcher - archerResult;
        console.log("PLAYER TOTAL: KNIGHTS: " + pKnight + " MAGES: " + pMage + " ARCHERS: " + pArcher);
        this.updateCounts();
        this.statusCheck();
    },

    //a function called by the computer side's calculation of results that checks to see if one side is defeated
    statusCheck: function(){
        //clears the text from these divs and fades them back in for preparation for new values
        setTimeout(function(){
            $("#player-archer-loss").addClass("subtractor");
            $("#player-knight-loss").addClass("subtractor");
            $("#player-mage-loss").addClass("subtractor");
            $("#enemy-archer-loss").addClass("subtractor");
            $("#enemy-knight-loss").addClass("subtractor");
            $("#enemy-mage-loss").addClass("subtractor");
            $("#player-archer-loss").text("");
            $("#player-knight-loss").text("");
            $("#player-mage-loss").text("");
            $("#enemy-archer-loss").text("");
            $("#enemy-knight-loss").text("");
            $("#enemy-mage-loss").text("");
            $("#player-archer-loss").fadeIn("fast");
            $("#player-knight-loss").fadeIn("fast");
            $("#player-mage-loss").fadeIn("fast");
            $("#enemy-archer-loss").fadeIn("fast");
            $("#enemy-knight-loss").fadeIn("fast");
            $("#enemy-mage-loss").fadeIn("fast");
        }, 400);

        //used to determine end state 
        var playerDefeated = false;
        var computerDefeated = false;
        if (pKnight === 0 && pMage === 0 && pArcher === 0){
            playerDefeated = true;
        }
        if (cKnight ===0 && cMage === 0 && cArcher === 0){
            computerDefeated = true;
        }

        if (playerDefeated === true && computerDefeated === true){
            console.log("The dust settles on the aftermath of the battle, both sides lay completely defeated. You won this battle, but at what cost?");
            this.exportResults(true);
            battleSounds.pause();
        } else if (playerDefeated === true){
            console.log("The retreat horn is called, but it is too late! Your forces have been obliterated and you have lost the battle!");
            this.exportResults(false);
            battleSounds.pause();
        } else if (computerDefeated === true){
            console.log("Your troops cheer, the enemy lays vanquished before your army!");
            this.exportResults(true);
            battleSounds.pause();
        } else {
            console.log("====================WAVE END====================")
            setTimeout(function() {
                battle.waveCalc(pKnight, pMage, pArcher, true);
                battle.waveCalc(cKnight, cMage, cArcher, false);
            }, 1000)

        }
        
    },
    updateCounts: function(){
        $("#player-knight-count").text(pKnight);
        $("#player-mage-count").text(pMage);
        $("#player-archer-count").text(pArcher);
        $("#enemy-knight-count").text(cKnight);
        $("#enemy-mage-count").text(cMage);
        $("#enemy-archer-count").text(cArcher);
    },

    //returns an object that contains remaining player army values
    exportResults: function(isVictory){
        $("#resultModal").modal();
        $(battleGif).remove();
        var newPlayerResults = {
            knightCount: pKnight,
            mageCount: pMage,
            archerCount: pArcher,
            isVictorious: isVictory
        };
        var endGame = $("<div>");
        if (newPlayerResults.isVictorious === false){
            $(endGame).text("Your army has been obliterated. Enemy forces will certainly use this opportunity to take one of your provinces, prepare for your counter attack tomorrow.")
            $("#result-body").append(endGame);
        } else if (newPlayerResults.isVictorious === true && pKnight === 0 && pMage === 0 && pArcher ===0) {
            $(endGame).text("Both armies were completely destroyed in the fighting. You have gained this province, but at a great cost.")
            $("#result-body").append(endGame);
        } else {
            $(endGame).text("Victory! Your troops have vanquished the enemy! Remaining troops:")
            var knightDiv = $("<p>");
            var mageDiv = $("<p>");
            var archerDiv = $("<p>");
            $(archerDiv).text("Remaining Archers: " + pArcher);
            $(knightDiv).text("Remaining Knights: " + pKnight);
            $(mageDiv).text("Remaining Mages: " + pMage);
            $("#result-body").append(endGame);
            $("#result-body").append(archerDiv);
            $("#result-body").append(knightDiv);
            $("#result-body").append(mageDiv);
        }
        console.log(newPlayerResults);
        return newPlayerResults;
    },

    //stored player kill values
    storedKnights: 0,
    storedMages: 0,
    storedArchers: 0
}

