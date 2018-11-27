//global variable for player army
var armyOne;

//global variable for computer army
var armyTwo;

//variable for user province total;
var provinceTotal;

//varibles for sound clips
var battleSounds;
var battleStart; 


// ===================================================================================
// Brian's added code block
// ===================================================================================
// Array of title/image hierarchy
var rankings = [
    {
      title: "Farmer (Lv. 1)",
      image: "./images/castle-1.png"
    },
    {
      title: "Mayor (Lv. 2)",
      image: "./images/castle-2.png"
    },
    {
      title: "Aristocrat (Lv. 3)",
      image: "./images/castle-3.png"
    },
    {
      title: "Baron (Lv. 4)",
      image: "./images/castle-4.png"
    },
    {
      title: "Viscount (Lv. 5)",
      image: "./images/castle-5.png"
    },
    {
      title: "Earl (Lv. 6)",
      image: "./images/castle-6.png"
    },
    {
      title: "Marquees (Lv. 7)",
      image: "./images/castle-7.png"
    },
    {
      title: "Duke (Lv. 8)",
      image: "./images/castle-8.png"
    },
    {
      title: "King (Lv. 9)",
      image: "./images/castle-9.png"
    },
    {
      title: "Emperor (Lv. 10)",
      image: "./images/castle-10.png"
    }
  ];
// ===================================================================================
// ===================================================================================


$(document).ready(function(){


    //setting sounds
    battleSounds = document.getElementById("battleEffects");
    battleStart = document.getElementById("battleStart");

    //when document loads, make ajax call for player army values
    $.ajax({
        url: "/api/user/",
        method: "GET"
    }).then(function(response){
        provinceTotal = response.provinceCount;
        armyOne = response;

        // ===================================================================================
        // Brian's added code block
        // ===================================================================================
        provinces = response.provinceCount;

        // Display the current user progress on page load depending on province count
        // If it is greater than 10 - need to use string and slice method
        if (provinceTotal <= 9) {
            var percent = provinceTotal * 10;
            // increase the progress bar based on the percentage
            $(".progress-bar").attr("style", "width:" + percent + "%");
        }
        else if (provinceTotal >= 10) {
            var percent = provinceTotal * 10;
            var percentString = percent.toString();
            console.log(percentString);
            // slice off the first character in the string to start at 0 percent again
            var newPercentage = percentString.slice(1);
            console.log(newPercentage);
            // convert that newly sliced string back into an integer
            var integerPercent = parseInt(newPercentage);
            console.log(integerPercent);
            // set percent to equal that integer
            percent = integerPercent;
            $(".progress-bar").attr("style", "width:" + percent + "%");
        }
        // ===================================================================================
        // ===================================================================================
   
    });

});

//when fight button is clicked, clear the buttons, play sounds, and begin battle simulation
$(document).on("click", "#fight-btn", function(){
    armyTwo = {
        knightCount: $("#enemy-knight-count").text(),
        mageCount: $("#enemy-mage-count").text(),
        archerCount: $("#enemy-archer-count").text()
    }

    battleSounds.play();
    battleStart.play();
    $("#battle-buttons").html("");
    $(".battle-gif").removeClass("d-none");

    battle.battleInit(armyOne, armyTwo);
});


var battle = {

    //initial function that takes the loaded objects and parses them off to local variables
    battleInit: function (playerArmy, computerArmy) {
        pKnight = playerArmy.knightCount;
        pMage = playerArmy.mageCount;
        pArcher = playerArmy.archerCount;
        cKnight = computerArmy.knightCount;
        cMage = computerArmy.mageCount;
        cArcher = computerArmy.archerCount;

        //begin calculations of waves (fourth argument checks if player or not)
        this.waveCalc();
    },

    //a calculator that checks the inflicted casualties of one side
    waveCalc: function () {
        var playerKills;
        var computerKills;
        // first an ajax call for player results
        var isPlayer = {
            isPlayer:true
        }
        $.ajax({
            url: "/api/battle/waveCalc",
            method: "POST",
            data: isPlayer
        }).then(function(response){
            playerKills = response;
            isPlayer.isPlayer = false;
            //next, an ajax call for computer results
            $.ajax({
                url: "/api/battle/waveCalc",
                method: "POST",
                data: isPlayer
            }).then(function(response){
                computerKills = response;
                battle.waveResults(playerKills, computerKills);
            });

        });
    },
    waveResults: function(playerKills, computerKills){
        // first an ajax call to update player values on the database
        $.ajax({
            url: "/api/battle/waveResult/player",
            method: "POST",
            data: computerKills
        }).then(function(response){
            var storedResults = response;
            $.ajax({
                url: "/api/battle/waveResult/computer",
                method: "POST",
                data: playerKills
            }).then(function(response){
                var secondResults = response;
                battle.playerResults(secondResults);
               battle.computerResults(storedResults);
            })
        });
    },
    //function that takes in player kills
    playerResults: function (resultObject) {
        cArcher = parseInt($("#enemy-archer-count").text());
        cKnight = parseInt($("#enemy-knight-count").text());
        cMage = parseInt($("#enemy-mage-count").text());
        deadArchers = cArcher - resultObject.archerCount;
        deadKnights = cKnight - resultObject.knightCount;
        deadMages = cMage - resultObject.mageCount;

        //check to display DODGED only for live groups
        if (deadArchers === 0 && cArcher > 0){
            $("#enemy-archer-loss").removeClass("subtractor");
            $("#enemy-archer-loss").text("(DODGED)")
        //if casualties taken, display damage done
        } else if (cArcher > 0) {
            $("#enemy-archer-loss").text("(-" + deadArchers + ")");
        }
        if (deadKnights === 0 && cKnight > 0) {
            $("#enemy-knight-loss").removeClass("subtractor");
            $("#enemy-knight-loss").text("(DODGED)");
        } else if (cKnight > 0) {
            $("#enemy-knight-loss").text("(-" + deadKnights + ")");
        }
        if (deadMages === 0 && cMage > 0) {
            $("#enemy-mage-loss").removeClass("subtractor");
            $("#enemy-mage-loss").text("(DODGED)")
        } else if (cMage > 0) {
            $("#enemy-mage-loss").text("(-" + deadMages + ")")
        };

        //fades out damage hits over jquery default of 400ms (can change please refer to jquery documentation)
        $("#enemy-archer-loss").fadeOut();
        $("#enemy-knight-loss").fadeOut();
        $("#enemy-mage-loss").fadeOut();

    },

    //function that takes in computer kills, displays them and then calls for a status check
    computerResults: function (resultObject) {
        pArcher = parseInt($("#player-archer-count").text());
        pKnight = parseInt($("#player-knight-count").text());
        pMage = parseInt($("#player-mage-count").text());
        deadArchers = pArcher - resultObject.archerCount;
        deadKnights = pKnight - resultObject.knightCount;
        deadMages = pMage - resultObject.mageCount;

        //check to display DODGED only for live groups
        if (deadArchers === 0 && pArcher > 0){
            $("#player-archer-loss").removeClass("subtractor");
            $("#player-archer-loss").text("(DODGED)  ")
        } else if (pArcher > 0) {
            $("#player-archer-loss").text("(-" + deadArchers + ")  ");
        }
        if (deadKnights === 0 && pKnight > 0) {
            $("#player-knight-loss").removeClass("subtractor");
            $("#player-knight-loss").text("(DODGED)  ");
        } else if (pKnight > 0) {
            $("#player-knight-loss").text("(-" + deadKnights + ")  ");
        }
        if (deadMages === 0 && pMage > 0) {
            $("#player-mage-loss").removeClass("subtractor");
            $("#player-mage-loss").text("(DODGED)  ")
        } else if (pMage > 0) {
            $("#player-mage-loss").text("(-" + deadMages + ")  ")
        }
        $("#player-archer-loss").fadeOut();
        $("#player-knight-loss").fadeOut();
        $("#player-mage-loss").fadeOut();
        this.statusCheck();
    },

    //a function called by the computer side's calculation of results that checks to see if one side is defeated
    statusCheck: function () {
        $.ajax({
            url: "/api/battle/status/user",
            method: "GET"
        }).then(function(response){
            pArcher = response.userStorage.archerCount;
            pKnight = response.userStorage.knightCount;
            pMage = response.userStorage.mageCount;
            cArcher = response.encounterStorage.archerCount;
            cKnight = response.encounterStorage.knightCount;
            cMage = response.encounterStorage.mageCount;

            $("#player-archer-count").text(pArcher);
            $("#player-knight-count").text(pKnight);
            $("#player-mage-count").text(pMage);

            $("#enemy-archer-count").text(cArcher);
            $("#enemy-knight-count").text(cKnight);
            $("#enemy-mage-count").text(cMage);

            //clears the text from these divs and fades them back in for preparation for new values
            setTimeout(function () {
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
            //if statements to determine if battle is over
            if (pKnight === 0 && pMage === 0 && pArcher === 0) {
                playerDefeated = true;
            }
            if (cKnight === 0 && cMage === 0 && cArcher === 0) {
                computerDefeated = true;
            }

            if (playerDefeated === true && computerDefeated === true) {
                battle.exportResults(true);
                battleSounds.pause();
            } else if (playerDefeated === true) {
                battle.exportResults(false);
                battleSounds.pause();
            } else if (computerDefeated === true) {
                battle.exportResults(true);
                battleSounds.pause();
            //if no end state reached, 1 second timeout followed by another wave
            } else {
                setTimeout(function () {
                battle.waveCalc();
                }, 1000)
            }
        });


    },

    //returns an object that contains remaining player army values
    exportResults: function(isVictory){
        var battleStatus;
        var battleName = $("#battleName").text()
        if (isVictory === true){
            battleStatus= "victorious"
            provinceTotal++;
        } else if (provinceTotal > 1){
            battleStatus= "defeated"
            provinceTotal--;
        } else {
            battleStatus= "defeated"
        };

        $.ajax({
            method:"PUT",
            url:"/api/activity",
            data: {battleStatus:battleStatus,
            category: "battle",
            battleName: battleName
        }
        }).then(function(battleActivity){
            console.log(battleActivity);
            $.ajax({
                method:"POST",
                url:"/api/activity",
                data: battleActivity
            }).then(function(){
                console.log("successful response")
            })
        });

        exportObject = {
            knightCount: pKnight,
            mageCount: pMage,
            archerCount: pArcher,
            provinceCount: provinceTotal,
            encounterCompleted: true
        }

        $("#resultModal").modal();
        $('.battle-gif').addClass("d-none");
        var endGame = $("<h5>");
        if (isVictory === false && provinceTotal === 1){
            $(endGame).text("Your army has been obliterated. You have lost your army, and are down to your last province. Prepare for your counter attack tomorrow!")
            $("#result-body").append(endGame);
        }else if (isVictory === false){
            $(endGame).text("Your army has been obliterated. Enemy forces will certainly use this opportunity to take one of your provinces. Prepare for your counter attack tomorrow.")
            $("#result-body").append(endGame);
        } else if (isVictory === true && pKnight === 0 && pMage === 0 && pArcher ===0) {
            $(endGame).text("Both armies were completely destroyed in the battle. You have gained this province, but at a great cost.")
            $("#result-body").append(endGame);
        } else {
            $(endGame).text("Victory! Your troops have vanquished the enemy! Remaining troops:")
            var knightDiv = $("<p>");
            var mageDiv = $("<p>");
            var archerDiv = $("<p>");
            $(archerDiv).text("Archers: " + pArcher);
            $(knightDiv).text("Knights: " + pKnight);
            $(mageDiv).text("Mages: " + pMage);
            $("#result-body").append(endGame);
            $("#result-body").append(archerDiv);
            $("#result-body").append(knightDiv);
            $("#result-body").append(mageDiv);
        }
        $.ajax({
            url:"/api/user",
            method: "GET",
        }).then(function(response){
            
            exportObject = {
            knightCount: response.knightCount,
            mageCount: response.mageCount,
            archerCount: response.archerCount,
            provinceCount: provinceTotal,
            encounterCompleted: true
        }
        $.ajax({
            method: "PUT",
            url: "/api/user",
            data: exportObject
        }).then(function(response){
            $.ajax({
                method: "GET",
                url: "/user",
            }).then(function(res){
                console.log(res);
            });
        });
        });
    },

    //stored player kill values
    storedKnights: 0,
    storedMages: 0,
    storedArchers: 0
}

//when modal "close" button is clicked, update player info
$(document).on("click", "#close", function(){

    // ===================================================================================
    // Brian's added block of code
    // ===================================================================================
    // provinces++;
    // display this number to the dom
    $("#province-count").text(provinceTotal);
    // mulitply the number of provinceTotal by 10 to get the percentage
    var percent = provinceTotal * 10;
    // increase the progress bar based on the percentage
    $(".progress-bar").attr("style", "width:" + percent + "%");

    if (provinceTotal === 10) {
        $.ajax({
        url: "api/user/progress/",
        type: "PUT",
        data: {
            provinceCount: provinceTotal,
            castle: rankings[1].image,
            title: rankings[1].title
        }
        }).then(function(response) {
        console.log(response);
        location.reload();
        });
        // update castle image with next level image
        $("#castle-img").attr("src", rankings[1].image);
        // update title with next level title
        $("#title").text(rankings[1].title);
        // update the progress bar with the new integer of 0 percent
        $(".progress-bar").attr("style", "width:0%");
    } else if (provinceTotal >= 11 && provinceTotal <= 19) {
        $(".progress-bar").attr("style", "width:0%");
        // convert 100 percent to a string
        var percentString = percent.toString();
        // slice off the first character in the string to start at 0 percent again
        var newPercentage = percentString.slice(1);
        // convert that newly sliced string back into an integer
        var integerPercent = parseInt(newPercentage);
        // set percent to equal that integer
        percent = integerPercent;
        $(".progress-bar").attr("style", "width:" + percent + "%");
    } else if (provinceTotal >= 20 && provinceTotal <= 29) {
        if (provinceTotal === 20) {
        $.ajax({
            url: "api/user/progress/",
            type: "PUT",
            data: {
            provinceCount: provinceTotal,
            castle: rankings[2].image,
            title: rankings[2].title
            }
        }).then(function(response) {
            console.log(response);
            location.reload();
        });
        }
        $("#castle-img").attr("src", rankings[2].image);
        // update title with next level title
        $("#title").text(rankings[2].title);
        // update the progress bar with the new integer of 0 percent
        $(".progress-bar").attr("style", "width:0%");
        var percentString = percent.toString();
        // slice off the first character in the string to start at 0 percent again
        var newPercentage = percentString.slice(1);
        // convert that newly sliced string back into an integer
        var integerPercent = parseInt(newPercentage);
        // set percent to equal that integer
        percent = integerPercent;
        $(".progress-bar").attr("style", "width:" + percent + "%");
    } else if (provinceTotal >= 30 && provinceTotal <= 39) {
        if (provinceTotal === 30) {
        $.ajax({
            url: "api/user/progress/",
            type: "PUT",
            data: {
            provinceCount: provinceTotal,
            castle: rankings[3].image,
            title: rankings[3].title
            }
        }).then(function(response) {
            console.log(response);
            location.reload();
        });
        }
        $("#castle-img").attr("src", rankings[3].image);
        // update title with next level title
        $("#title").text(rankings[3].title);
        // update the progress bar with the new integer of 0 percent
        $(".progress-bar").attr("style", "width:0%");
        var percentString = percent.toString();
        // slice off the first character in the string to start at 0 percent again
        var newPercentage = percentString.slice(1);
        // convert that newly sliced string back into an integer
        var integerPercent = parseInt(newPercentage);
        // set percent to equal that integer
        percent = integerPercent;
        $(".progress-bar").attr("style", "width:" + percent + "%");
    } else if (provinceTotal >= 40 && provinceTotal <= 49) {
        if (provinceTotal === 40) {
        $.ajax({
            url: "api/user/progress/",
            type: "PUT",
            data: {
            provinceCount: provinceTotal,
            castle: rankings[4].image,
            title: rankings[4].title
            }
        }).then(function(response) {
            console.log(response);
            location.reload();
        });
        }
        $("#castle-img").attr("src", rankings[4].image);
        // update title with next level title
        $("#title").text(rankings[4].title);
        // update the progress bar with the new integer of 0 percent
        $(".progress-bar").attr("style", "width:0%");
        var percentString = percent.toString();
        // slice off the first character in the string to start at 0 percent again
        var newPercentage = percentString.slice(1);
        // convert that newly sliced string back into an integer
        var integerPercent = parseInt(newPercentage);
        // set percent to equal that integer
        percent = integerPercent;
        $(".progress-bar").attr("style", "width:" + percent + "%");
    } else if (provinceTotal >= 50 && provinceTotal <= 59) {
        if (provinceTotal === 50) {
        $.ajax({
            url: "api/user/progress/",
            type: "PUT",
            data: {
            provinceCount: provinceTotal,
            castle: rankings[5].image,
            title: rankings[5].title
            }
        }).then(function(response) {
            console.log(response);
            location.reload();
        });
        }
        $("#castle-img").attr("src", rankings[5].image);
        // update title with next level title
        $("#title").text(rankings[5].title);
        // update the progress bar with the new integer of 0 percent
        $(".progress-bar").attr("style", "width:0%");
        var percentString = percent.toString();
        // slice off the first character in the string to start at 0 percent again
        var newPercentage = percentString.slice(1);
        // convert that newly sliced string back into an integer
        var integerPercent = parseInt(newPercentage);
        // set percent to equal that integer
        percent = integerPercent;
        $(".progress-bar").attr("style", "width:" + percent + "%");
    } else if (provinceTotal >= 60 && provinceTotal <= 69) {
        if (provinceTotal === 60) {
        $.ajax({
            url: "api/user/progress/",
            type: "PUT",
            data: {
            provinceCount: provinceTotal,
            castle: rankings[6].image,
            title: rankings[6].title
            }
        }).then(function(response) {
            console.log(response);
            location.reload();
        });
        }
        console.log("sixties");
        $("#castle-img").attr("src", rankings[6].image);
        // update title with next level title
        $("#title").text(rankings[6].title);
        // update the progress bar with the new integer of 0 percent
        $(".progress-bar").attr("style", "width:0%");
        var percentString = percent.toString();
        // slice off the first character in the string to start at 0 percent again
        var newPercentage = percentString.slice(1);
        // convert that newly sliced string back into an integer
        var integerPercent = parseInt(newPercentage);
        // set percent to equal that integer
        percent = integerPercent;
        $(".progress-bar").attr("style", "width:" + percent + "%");
    } else if (provinceTotal >= 70 && provinceTotal <= 79) {
        if (provinceTotal === 70) {
        $.ajax({
            url: "api/user/progress/",
            type: "PUT",
            data: {
            provinceCount: provinceTotal,
            castle: rankings[7].image,
            title: rankings[7].title
            }
        }).then(function(response) {
            console.log(response);
            location.reload();
        });
        }
        $("#castle-img").attr("src", rankings[7].image);
        // update title with next level title
        $("#title").text(rankings[7].title);
        // update the progress bar with the new integer of 0 percent
        $(".progress-bar").attr("style", "width:0%");
        var percentString = percent.toString();
        // slice off the first character in the string to start at 0 percent again
        var newPercentage = percentString.slice(1);
        // convert that newly sliced string back into an integer
        var integerPercent = parseInt(newPercentage);
        // set percent to equal that integer
        percent = integerPercent;
        $(".progress-bar").attr("style", "width:" + percent + "%");
    } else if (provinceTotal >= 80 && provinceTotal <= 89) {
        if (provinceTotal === 80) {
        $.ajax({
            url: "api/user/progress/",
            type: "PUT",
            data: {
            provinceCount: provinceTotal,
            castle: rankings[8].image,
            title: rankings[8].title
            }
        }).then(function(response) {
            console.log(response);
            location.reload();
        });
        }
        $("#castle-img").attr("src", rankings[8].image);
        // update title with next level title
        $("#title").text(rankings[8].title);
        // update the progress bar with the new integer of 0 percent
        $(".progress-bar").attr("style", "width:0%");
        var percentString = percent.toString();
        // slice off the first character in the string to start at 0 percent again
        var newPercentage = percentString.slice(1);
        // convert that newly sliced string back into an integer
        var integerPercent = parseInt(newPercentage);
        // set percent to equal that integer
        percent = integerPercent;
        $(".progress-bar").attr("style", "width:" + percent + "%");
    } else if (provinceTotal >= 90 && provinceTotal <= 99) {
        if (provinceTotal === 90) {
        $.ajax({
            url: "api/user/progress/",
            type: "PUT",
            data: {
            provinceCount: provinceTotal,
            castle: rankings[9].image,
            title: rankings[9].title
            }
        }).then(function(response) {
            console.log(response);
            location.reload();
        });
        }
        $("#castle-img").attr("src", rankings[9].image);
        // update title with next level title
        $("#title").text(rankings[9].title);
        // update the progress bar with the new integer of 0 percent
        $(".progress-bar").attr("style", "width:0%");
        var percentString = percent.toString();
        // slice off the first character in the string to start at 0 percent again
        var newPercentage = percentString.slice(1);
        // convert that newly sliced string back into an integer
        var integerPercent = parseInt(newPercentage);
        // set percent to equal that integer
        percent = integerPercent;
        $(".progress-bar").attr("style", "width:" + percent + "%");
    } else if (provinceTotal >= 100) {
        $.ajax({
        url: "api/user/progress/",
        type: "PUT",
        data: {
            provinceCount: provinceTotal,
            castle: rankings[9].image,
            title: rankings[9].title
        }
        }).then(function(response) {
        console.log(response);
        // location.reload();
        });
        $("#castle-img").attr("src", rankings[9].image);
        // update title with next level title
        $("#title").text(rankings[9].title);
        // update the progress bar with the new integer of 0 percent
        // $(".progress-bar").attr("style", "width:0%");
        var percentString = percent.toString();
        // slice off the first character in the string to start at 0 percent again
        var newPercentage = percentString.slice(1);
        // convert that newly sliced string back into an integer
        var integerPercent = parseInt(newPercentage);
        // set percent to equal that integer
        percent = integerPercent;
        $(".progress-bar").attr("style", "width:" + percent + "%");
    }
    // ===================================================================================
    // ===================================================================================

    location.reload();
});
    
