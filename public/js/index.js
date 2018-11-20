$(function() {
// ==================================================================================================
// DATABASE TESTING WITH DUMMY DATA
// ==================================================================================================
// Ajax call to grab user army counts and display to both encounter card and user info bar
$.ajax({
  method: "GET",
  url: "/api/user"
}).then(function(response) {
  console.log(response);
  var user = response[0];
  $("#user-archer-count").append(user.archerCount);
  $("#user-knight-count").append(user.knightCount);
  $("#user-mage-count").append(user.mageCount);
  $("#encounter-archer-count").append(user.archerCount);
  $("#encounter-knight-count").append(user.knightCount);
  $("#encounter-mage-count").append(user.mageCount);
});

$("#fight-btn").on("click", function() {
  $(".battle-buttons").addClass("d-none");
})

// Other dynamic data that needs to be displayed
  // User name
  // User image
  // User progress bar
  // Encounter name/description
  // Encounter results in Fight modal
  // Encounter reward in modal or on card itself?

// Randomly generated data that needs to be displayed
  // Enemy army counts

})