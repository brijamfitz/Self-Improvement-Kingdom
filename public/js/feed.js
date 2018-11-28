$(document).ready(function(){
    $.ajax({
        method: "GET",
        url: "/api/activity",
    }).then(function(response){
        console.log(response);
        iterator = response.length - 5;
        for(var i = iterator; i < response.length; i++){
            var news = response[i].action;
            var tickerItem = $('<div class="ticker__item">' + news + '</div>');
            $(".ticker").append(tickerItem);
        }
    })
})