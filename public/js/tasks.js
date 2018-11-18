$(function() {
  
  $('[data-toggle="tooltip"]').tooltip()

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

  $(".edit-task-form").on("submit", function(event) {
    event.preventDefault();

    var id = $(this).parent().attr('data-id');
    console.log(id);

    var editedTask = {
      name: $(this).find('.task-input').val().trim(),
      difficulty: $(this).find("input:checked").val()
    }

    console.log(editedTask);

    $.ajax({
      url: "/api/task/edit/" + id,
      type: "PUT",
      data: editedTask
    }).then(
      function() {
        console.log("edited task");
        location.reload();
      }
    );
  });

  $(".checkbox-link").on("click", function() {
    $(this).parents(".task-view").addClass("d-none")
    $(this).parents(".task-view").siblings(".troop-select").removeClass("d-none")
  })

  $(".btn-delete").on("click", function() {
    var id = $(this).parents("li").attr('data-id');
    $.ajax({
      url: "api/task/" + id,
      type: "DELETE"
    }).then(
      function() {
        location.reload();
      }
    );
  })

  $(".btn-edit").on("click", function() {
    $(this).parent().addClass("d-none")
    $(this).parent().siblings(".edit-task-form").removeClass('d-none')
    var id = $(this).parents("li").attr('data-id');
    var task;
    $.ajax({
      url: "api/tasks/difficulty/" + id,
      method: "GET",
      task: task
    }).then(
      function(task) {
        var $difficultyOption = $('[data-id="' + id + '"]').find('[value="' + task.difficulty + '"]');
        $difficultyOption.attr("checked", true);
        $difficultyOption.addClass("active");
      }
    );
  })

  $(".btn-cancel").on("click", function(event) {
    event.preventDefault()
    $(this).parents(".edit-task-form").addClass("d-none")
    $(this).parents(".edit-task-form").siblings(".task-view").removeClass("d-none")
  })
});