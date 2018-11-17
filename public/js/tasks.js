$(function() {
<<<<<<< HEAD
 
=======
  
  $('[data-toggle="tooltip"]').tooltip()

>>>>>>> refs/heads/develop
  $(".task-input").on("click", function() {
    console.log("Task input clicked")
    $(this).parent().siblings(".task-options").removeClass("d-none")
  })

  $(".task-form").on("submit", function(event) {
    event.preventDefault();
    var newTask = {
      name: $(this).find('.task-input').val().trim(),
      difficulty: $(this).find("input:checked").val(),
      category: $(this).data('category'),
    }

    $.ajax("/api/tasks", {
      type: "POST",
      data: newTask
    }).then(
      function(res) {
        console.log("created new task");
        location.reload(res);
      }
    );
  });

  $(".btn-delete").on("click", function() {
    var id = $(this).parent().attr('data-id');
    console.log(id)
    $.ajax({
      url: "api/task/" + id,
      type: "DELETE"
    }).then(
      function() {
        location.reload();
      }
    );
  })
});