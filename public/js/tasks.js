/* ======================================================================================== */
/* Function declarations */
/* ======================================================================================== */

function createTask(newTask) {
  $.ajax("/api/tasks", {
    type: "POST",
    data: newTask
  }).then(
    function() {
      console.log("created new task");
      location.reload();
    }
  );
}

function deleteTask(id) {
  $.ajax({
    url: "api/task/" + id,
    type: "DELETE"
  }).then(
    function() {
      location.reload();
    }
  );
}

function completeTask(id) {
  $.ajax({
    url: "/api/task/complete/" + id,
    type: "PUT"
  }).then(function() {
    console.log("compeleted task");
    location.reload();
  })
}

function editTask(id, editedTask) {
  $.ajax({
    url: "/api/task/" + id,
    type: "PUT",
    data: editedTask
  }).then(
    function() {
      console.log("edited task");
      location.reload();
    }
  );
}

function presetEditDifficulty(id, difficulty) {
  // Select difficulty radio by task id and difficulty
  var $difficultyOption = $('[data-id="' + id + '"]').find('[value="' + difficulty + '"]');

  // Pre-select the corresponding difficulty
  $difficultyOption.attr("checked", true);
  $difficultyOption.addClass("active");
}

function updateArmy(taskId, userId, difficulty, bonusType, troopSelected) {
  var archersRecruited = 0
  var knightsRecruited = 0
  var magesRecruited = 0

  // Increment recruit counter for bonus troop type
  if (bonusType == "archer") {
    archersRecruited++;
  } else if (bonusType == "knight") {
    knightsRecruited++;
  } else if (bonusType == "mage") {
    magesRecruited++;
  }

  // Increment recruit counter based on selection
  if (troopSelected == "archer") {
    archersRecruited+= difficulty
  } else if (troopSelected == "knight") {
    knightsRecruited+= difficulty
  } else if (troopSelected == "mage") {
    magesRecruited+= difficulty
  }

  var user;
  $.ajax({
    url: "api/user/",
    method: "GET",
    user: user
  }).then(function(user) {
    // Calculate new toop totals and store in object
    var newArmyObj = {
      archerCount: user.archerCount + archersRecruited,
      knightCount: user.knightCount + knightsRecruited,
      mageCount: user.mageCount + magesRecruited
    }
  
    // Send put request to update user's army with new totals
    $.ajax({
      url: "/api/user",
      type: "PUT",
      data: newArmyObj
    }).then(function() {
      console.log("compeleted task");
    })

    completeTask(taskId);
  })
}

/* ======================================================================================== */
/* Begin jQuery functionality */
/* ======================================================================================== */
$(function() {
  
  // Initialize tooltips
  $('[data-toggle="tooltip"]').tooltip()

  // Handler to show full task form when input is clicked
  $(".task-input").on("click", function() {
    $(this).parent().siblings(".task-options").removeClass("d-none")
  })

  // Handler for creating a new task on task-form submission
  $(".task-form").on("submit", function(event) {
    event.preventDefault()
    var newTask = {
      name: $(this).find('.task-input').val().trim(),
      difficulty: $(this).find("input:checked").val(),
      category: $(this).data('category'),
    }
    if (parseInt(newTask.name.length) > 100) {
      alert("The text you entered is too long.")
    } else {
      createTask(newTask)
    }
  })

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
  // Handler for editing tasks
  $(".edit-task-form").on("submit", function(event) {
    event.preventDefault();
    var id = $(this).parent().data('id');
    var editedTask = {
      name: $(this).find('.task-input').val().trim(),
      difficulty: $(this).find("input:checked").val()
    }

    editTask(id, editedTask)
  })

  // Handler for displaying reward selection when task is checked off
  $(".checkbox-link").on("click", function() {
    $(this).parents(".task-view").addClass("d-none")
    $(this).parents(".task-view").siblings(".troop-select").removeClass("d-none")
  })

  // Handler for updating player army on troop selection
  $(".btn-troop-select").on("click", function() {
    var taskId = $(this).parents(".task-container").data('id')
    var userId = $(this).parents(".task-container").data('user-id')
    var difficulty = $(this).parents(".task-container").data("difficulty")
    var bonusType = $(this).parents('.troop-select').data("troop")
    var troopSelected = $(this).data("troop")

    updateArmy(taskId, userId, difficulty, bonusType, troopSelected)
  })

  // Handler for deleting tasks
  $(".btn-delete").on("click", function() {
    var id = $(this).parents(".task-container").data('id')

    deleteTask(id)
  })

  // Handler for displaying edit view with pre-selected difficulty
  $(".btn-edit").on("click", function() {
    $(this).parent().addClass("d-none")
    $(this).parent().siblings(".edit-task-form").removeClass('d-none')
    var id = $(this).parents(".task-container").data('id')
    var difficulty = $(this).parents(".task-container").data("difficulty")

    presetEditDifficulty(id, difficulty)
  })

  // Handler for resetting task view when editing is canceled
  $(".btn-cancel").on("click", function(event) {
    event.preventDefault()
    $(this).parents(".edit-task-form").addClass("d-none")
    $(this).parents(".edit-task-form").siblings(".task-view").removeClass("d-none")
  });
