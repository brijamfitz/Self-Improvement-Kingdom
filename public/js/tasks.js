$(function() {

  $(".task-form .task-input").on("focus", function() {
    $(this).parent().siblings(".task-options").removeClass("d-none")
  })

  $(".task-form").on("submit", function(event) {
    event.preventDefault();

    var newTask = {
      name: $(this).find('.task-input').val().trim(),
      difficulty: $(this).find("input:checked").val(),
      category: $(this).data('category')
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