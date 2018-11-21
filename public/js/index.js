

$(function() {
var battleLogic = require("battle.js");



  $(function() {
  var playerObject={
    playerArmy : {
      knightCount: 0,
      archerCount: 0,
      mageCount: 0,
    },
    title: "",
    provinceCount: 0,
    encounterCompleted: false,  
  };
  var pArmy= playerObject.playerArmy 
   
    $.ajax({
    method: "GET",
    url: "/api/user"
  }).then(function(response) {
    pArmy.knightCount = response.knightCount;
    pArmy.archerCount = response.archerCount;
    pArmy.mageCount = response.mageCount;
    playerObject.title = response.title;
    playerObject.provinceCount = response.provinceCount;
    playerObject.encounterCompleted = response.encounterCompleted;
      $.ajax({
        method: "GET",
        url: "api/encounter"
      }).then(function(response){
       var eArmy = {
         knightCount: response.knightCount,
         archerCount: response.archerCount,
         mageCount: response.mageCount
       }
      })
  });
  
  battleLogic(pArmy, eArmy)
  
  
  });

})