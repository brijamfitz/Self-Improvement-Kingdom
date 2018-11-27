$(document).ready(function () {
    $("#new-friend").hide();
    function getFriends() {
        $.ajax({
            method: "GET",
            url: "/api/friends"
        }).then(function (res) {
            console.log(res)
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].status)
                switch (res[i].status) {
                    case "accepted":
                        showFriend(res[i]);
                        break;
                    case "pending":
                        pendingFriend(res[i]);
                        break;
                }
            }
        })
    };

    getFriends();



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

    $(document).on("click", ".reject-pending", function () {
        var username = $(this).attr("name");
        socialPut('rejected', username)
    });

    $(document).on("click", ".delete-friend", function () {
        var username = $(this).attr("name");
        socialPut('deleted', username)
    })


    function socialPut(status, username) {
        var status = status;
        console.log(status)
        $.ajax({
            method: "PUT",
            url: "/api/friends",
            data: {
                username: username,
                status: status
            }
        }).then(function () {
            $.ajax({
                method: "PUT",
                url: "/api/activity",
                data: {
                    username: username,
                    status: status,
                    category: "friend"
                }
            }).then(function (response) {
                $.ajax({
                    method: "POST",
                    url: "/api/activity",
                    data: response
                }).then(function () {
                    console.log("successful response");
                })
            })
        });
    }

    function showFriend(res) {
        console.log(res)
        var friend = $("<div>");
        friend.attr("data", res.id);
        friend.addClass("friend mb-2");
        var name = $("<h5>");
        name.text(res.username);
        name.addClass("friend-name");
        friend.append(name);
        var title = $("<h6>");
        title.addClass("text-muted friend-title");
        title.text(res.title);
        friend.append(title);
        var deleteButton = $("<button>");
        deleteButton.attr("type", "button");
        deleteButton.attr("name", res.username);
        deleteButton.addClass("btn btn-secondary delete-friend");
        deleteButton.text("Delete");
        friend.append(deleteButton);
        $("#friend-zone").append(friend)
    };

    function pendingFriend(res) {
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

