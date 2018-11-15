$(function() {

  $(".task-form .task-input").on("focus", function() {
    $(".task-options").removeClass("d-none")
  })

  $(".task-form").on("submit", function(event) {
    event.preventDefault();

    var currentCat = $(this).data('category');

    var newTask = {
      name: $(this).find('.task-input').val().trim(),
      difficulty: $(this).find("input:checked").val(),
      currentCat: 1
    }
    $.ajax("/api/tasks", {
      type: "POST",
      data: newTask
    }).then(
      function() {
        console.log("created new task");
        location.reload();
      }
    );
  });
});