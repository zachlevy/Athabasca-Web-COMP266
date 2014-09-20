/*
author: zachary levy
date: 20140928
*/

// set my instagram api app id as a global var
var igClientId = '7d29312535224d3595e36dada4747179';

// on window load
$().ready(function(){
	console.log("ready to instagram!");

	// tags to search
    var tags = ["ancientrome", "romanhistory", "romangladiator"];
    // search all the tags
    for (var i in tags) {
		searchTag(tags[i]);
    }
});

// display json on the page for debugging
function showInstagramResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    // $("#instagram-gallery").html("<pre>" + responseString + "</pre>");
}

// hit instagram for the photos
function searchTag (tag) {
	// instagram api url for getting photos with the tag
	var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent/?client_id=' + igClientId + '&count=12&callback=?';

	// get the resposne from the instagram api
	$.getJSON(url, function (response) {
		// 
		showInstagramResponse(response.data);
		renderPhotos(response.data);
	});
}

// render the photos on the page
function renderPhotos(grams) {
	// for each instagram
	for (var i in grams) {
		// add an image to the gallery
		$("#instagram-gallery").append("<div class=\"third\"><img src=\"" + grams[i].images.standard_resolution.url + "\" /><a href=\"" + grams[i].link + "\" target=\"_blank\">Source</a></div>");
	}
}
