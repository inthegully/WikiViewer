$(document).ready(function() {
    $('#searchField').keypress(function(e) {
        if (e.which == 13) {
            var articleSubject = $("#searchField").val();
            getArticles(articleSubject);
            $("input").val('');
            $(".article-box").empty();
        }
    });

    function getArticles(articleSubject) {
        $.ajax({
            method: "GET",
            url: "https://en.wikipedia.org/w/api.php?",
            data: {
                action: "query",
                list: "search",
                format: "json",
                srsearch: articleSubject
            },
            dataType: "jsonp",
            success: function(response) {
                postArticles(response);
            }
        });
    }

    function postArticles(response) {
        if (response.query.search) {
            for (var i = 0; i < response.query.search.length; i++) {
                var articleTitle = response.query.search[i].title;
                var articleDescription = response.query.search[i].snippet;
                var articleUrl = "https://en.wikipedia.org/wiki/" + articleTitle.replace(/ /g, "_");
                $(".article-box").append("<div class='entry-box'><div class='article-space'><a class='link-title' href='" + articleUrl + "'>" + articleTitle + "</a>" + "<p class='description'>" + articleDescription + "</p>" + "</div></div>")
            }
        } else {
            for (var i = 0; i < response.query.random.length; i++) {
                var articleTitle = response.query.random[i].title;
                var articleUrl = "https://en.wikipedia.org/wiki/" + articleTitle.replace(/ /g, "_");
                $(".article-box").append("<div class='entry-box'><div class='article-space'><a class='link-title' href='" + articleUrl + "'>" + articleTitle + "</a>" + "</div></div>")
            }
        }
    }

    function getRandomArticles() {
        $.ajax({
            method: "GET",
            url: "https://en.wikipedia.org/w/api.php?",
            data: {
                action: "query",
                list: "random",
                format: "json",
                rnlimit: "10",
                rnnamespace: "0"
            },
            dataType: "jsonp",
            success: function(response) {
                postArticles(response);
                console.log(response);
            }
        });
    }

    $("#randomButton").click(function() {
        getRandomArticles();
        $(".article-box").empty();
    });
});
