$(document).ready(function(){
    $.ajax({
        method: "GET",
        url: "/api/activity",
    }).then(function(response){
        console.log(response);
        for(var i = 0; i < 5; i++){
            var news = response[i].action;
            var tickerItem = $("<div>");
            tickerItem.addClass("ticker__item");
            tickerItem.text(news);
            $(".ticker").append(tickerItem);
        }
    })

})