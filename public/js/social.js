$(document).ready(function () {
    $("#new-friend").hide();
    $.ajax({
        method: "GET",
        url: "/api/friends"
    }).then(function (res) {
        console.log(res)
        for (var i = 0; i < res.length; i++) {
            switch (res[i].status) {
                case "accepted":
                    showFriend(res[i]);
                    break;
                case "pending":
                    pendingFriend(res[i]);
                    break;
            }
        }
    });

    $("#add-friend").on("click", function (event) {
        event.preventDefault();
        $("#new-friend").show();
    });

    $("#fri-cancel").on("click", function (event) {
        event.preventDefault();
        $("#new-friend").hide();
    });

    $("#fri-submit").on("click", function (event) {
        event.preventDefault();
        var username = $("#fri-username").val().trim();
        $.ajax({
            method: "POST",
            url: "/api/friends",
            data: { username: username }
        }).then(function (res) {
            console.log("received rseponse");
        })
        $("#fri-username").empty();
        location.reload()
    });

    $(document).on("click", ".accept-pending", function () {
        var username = $(this).attr("name");
        socialPut('accepted', username)
        
    });

    $(".reject-pending").on("click", function (event) {
        var username = $(this).attr("name");
        socialPut('rejected', username)
    });


    function socialPut(status, username) {
        var status = status;
        $.ajax({
            method: "PUT",
            url: "/api/friends",
            data: {
                username: username,
                status: status
            }
        }).then(function () {
            location.reload();
        });
    }

    function showFriend(res) {
        console.log(res)
        var friend = $("<div>");
        friend.attr("data", res.id);
        friend.addClass("friend");
        var name = $("<h5>");
        name.text(res.username);
        name.addClass("friend-name");
        friend.append(name);
        var title = $("<h6>");
        title.addClass("text-muted friend-title");
        title.text(res.title);
        friend.append(title);
        $("#friend-zone").append(friend)
    };

    function pendingFriend(res) {
        console.log(res);
        var pending = $("<div>");
        pending.addClass("pending-friend");
        var name = $("<h5>");
        name.text(res.username);
        name.addClass("pending-friend-name");
        pending.append(name);
        var title = $("<h6>");
        title.addClass("text-muted pending-friend-title");
        title.text(res.title);
        pending.append(title);
        var acceptButton = $("<button>");
        acceptButton.attr("type", "button");
        acceptButton.attr("name", res.username);
        acceptButton.addClass("btn btn-secondary accept-pending");
        acceptButton.text("Accept");
        pending.append(acceptButton);
        var rejectButton = $("<button>");
        rejectButton.attr("type", "button");
        rejectButton.attr("name", res.username);
        rejectButton.addClass("btn btn-secondary reject-pending");
        rejectButton.text("Reject");
        pending.append(rejectButton);
        $("#friend-zone").prepend(pending);
    };

})

