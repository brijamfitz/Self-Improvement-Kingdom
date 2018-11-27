$(document).ready(function () {
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



    $(".request-alliance").on("submit", function (event) {
        event.preventDefault();
        var username = $("#fri-username").val().trim();
        $.ajax({
            method: "POST",
            url: "/api/friends",
            data: { username: username }
        }).then(function (res) {
            console.log("received rseponse");
        })
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
        var title = $('<h6 class="text-muted friend-title">' + res.title + '</h6>');
        friend.append(title);
        var deleteButton = $('<button class="btn btn-danger reject-pending" type="button" name=' + res.username + '>Delete</button>');
        friend.append(deleteButton);
        $("#friend-zone").append(friend)
    };

    function pendingFriend(res) {
        var pending = $("<div>");
        pending.addClass("pending-friend");
        var name = $('<h5 class="pending-friend-name">' + res.username + '</h5>');
        pending.append(name);
        var title = $('<h6 class="text-muted pending-friend-title">' + res.title + '</h6>');
        title.addClass("text-muted pending-friend-title");
        title.text(res.title);
        pending.append(title);
        var acceptButton = $('<button class="btn btn-secondary accept-pending mr-1" type="button" name=' + res.username + '>Accept</button>');
        pending.append(acceptButton);
        var rejectButton = $('<button class="btn btn-danger reject-pending" type="button" name=' + res.username + '>Reject</button>');
        pending.append(rejectButton);
        $("#friend-zone").prepend(pending);
    };
})

