
$(function() {
// ==================================================================================================
// DATABASE TESTING WITH DUMMY DATA
// ==================================================================================================
// Ajax call to grab user army counts and display to both encounter card and user info bar
$.ajax({
  method: "GET",
  url: "/api/user/all"
}).then(function(response) {
  console.log(response);
  var user = response;
  $("#user-archer-count").text(user.archerCount);
  $("#user-knight-count").text(user.knightCount);
  $("#user-mage-count").text(user.mageCount);
  $("#encounter-archer-count").text(user.archerCount);
  $("#encounter-knight-count").text(user.knightCount);
  $("#encounter-mage-count").text(user.mageCount);
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