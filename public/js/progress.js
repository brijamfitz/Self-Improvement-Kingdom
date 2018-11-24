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

// When document loads, make ajax call for province values
$.ajax({
  url: "/api/user/",
  method: "GET"
}).then(function(response) {
  console.log(response);
  console.log(response.provinceCount);
  provinces = response.provinceCount;

  // Display the current user progress on page load depending on province count
  // If it is greater than 10 - need to use string and slice method
  if (provinces <= 9) {
    var percent = provinces * 10;
    // increase the progress bar based on the percentage
    $(".progress-bar").attr("style", "width:" + percent + "%");
  }
  else if (provinces >= 10) {
    var percent = provinces * 10;
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
});

// Button click represents winning an encounter for testing purposes
$("#progress-test").on("click", function() {
  // increase province count by 1 with each encounter win
  provinces++;
  // display this number to the dom
  $("#province-count").text(provinces);
  // mulitply the number of provinces by 10 to get the percentage
  var percent = provinces * 10;
  // increase the progress bar based on the percentage
  $(".progress-bar").attr("style", "width:" + percent + "%");

  if (provinces === 10) {
    $.ajax({
      url: "api/user/progress/",
      type: "PUT",
      data: {
        provinceCount: provinces,
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
  } else if (provinces >= 11 && provinces <= 19) {
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
  } else if (provinces >= 20 && provinces <= 29) {
    if (provinces === 20) {
      $.ajax({
        url: "api/user/progress/",
        type: "PUT",
        data: {
          provinceCount: provinces,
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
  } else if (provinces >= 30 && provinces <= 39) {
    if (provinces === 30) {
      $.ajax({
        url: "api/user/progress/",
        type: "PUT",
        data: {
          provinceCount: provinces,
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
  } else if (provinces >= 40 && provinces <= 49) {
    if (provinces === 40) {
      $.ajax({
        url: "api/user/progress/",
        type: "PUT",
        data: {
          provinceCount: provinces,
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
  } else if (provinces >= 50 && provinces <= 59) {
    if (provinces === 50) {
      $.ajax({
        url: "api/user/progress/",
        type: "PUT",
        data: {
          provinceCount: provinces,
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
  } else if (provinces >= 60 && provinces <= 69) {
    if (provinces === 60) {
      $.ajax({
        url: "api/user/progress/",
        type: "PUT",
        data: {
          provinceCount: provinces,
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
  } else if (provinces >= 70 && provinces <= 79) {
    if (provinces === 70) {
      $.ajax({
        url: "api/user/progress/",
        type: "PUT",
        data: {
          provinceCount: provinces,
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
  } else if (provinces >= 80 && provinces <= 89) {
    if (provinces === 80) {
      $.ajax({
        url: "api/user/progress/",
        type: "PUT",
        data: {
          provinceCount: provinces,
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
  } else if (provinces >= 90 && provinces <= 99) {
    if (provinces === 90) {
      $.ajax({
        url: "api/user/progress/",
        type: "PUT",
        data: {
          provinceCount: provinces,
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
  } else if (provinces >= 100) {
    $.ajax({
      url: "api/user/progress/",
      type: "PUT",
      data: {
        provinceCount: provinces,
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
    // $(".progress-bar").attr("style", "width:" + percent + "%");
  }
});