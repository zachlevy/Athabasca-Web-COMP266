/*
author: zachary levy
date: 20140928
*/

// set my rotten tomatoes api app id as a global var
var rtClientId = 'bj5z4xza8ac3thtys8gugwcg';

// on window load
$().ready(function(){
	console.log("ready to rotten tomatoes!");

	// tags to search
    var tags = ["ancient rome"];
    // search all the tags
    for (var i in tags) {
		searchMovieTags(tags[i]);
    }
});

// display json on the page for debugging
function showRottenResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
	//$("#rotten-gallery").html("<pre>" + responseString + "</pre>");
}

// hit rotten tomatoes for the photos
function searchMovieTags (tag) {
	// rotten tomatoes api url for getting photos with the tag
	var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=' + tag.replace(/ /g, '+').toLowerCase() + '&apikey=' + rtClientId + '&page_limit=20&page=1&callback=?';

	// get the resposne from the rotten tomatoes api
	$.getJSON(url, function (response) {
		//console.log(response);
		showRottenResponse(response.movies);
		renderMovies(response.movies);
	});
}

// render the movies on the page
function renderMovies(movies) {
	// for each movie
	for (var i in movies) {
		// add a movie image to the gallery
		$("#rotten-gallery").append("<div class=\"movie\"><div class=\"movie-left\"><img src=\"" + movies[i].posters.original + "\" /></div><div class=\"movie-info\"><h3>" + movies[i].title + "</h3><p>" + movies[i].year + "</p><a href=\"" + movies[i].links.alternate + "\" target=\"_blank\">Source</a></div>");
		//console.log("<div class=\"third\"><img src=\"" + movies[i].posters.original + "\" /><div class=\"movie-info\"><h3>" + movies[i].title + " (" + movies[i].year + ")</h3></div><a href=\"" + movies[i].links.alternate + "\" target=\"_blank\">Source</a></div>");
	}
}
