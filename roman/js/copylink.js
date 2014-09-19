/*
author: zachary levy
date: 20140919
*/
// on window load
$(function() {
	//console.log("ready");
	// for each link thats part of the normal content
	$("section a").each(function () {
		// check if there is a link
		// check if the link is not external
		if ((typeof $(this).attr("href") == typeof undefined)
			|| $(this).attr("href") === false
			|| $(this).attr("href").indexOf("http") == -1) {
			// skip. continue to next interation of for loop
			return true;
		}
		// wrap the link in order to add 
		$(this).wrap( "<div class=\"link-wrap\"></div>" );
		// add the copy source link
		// set the link to the text that will be copied
		$(this).parent().append(
			"<a class=\"copy-link "
			+ ($(this).attr("class") ? $(this).attr("class") : "")
			+ "\" data-clipboard-text=\""
			+ $(this).attr("href")
			+ "\">Copy Source</a>");
	});
	
	// set vars to every link we just created
	var client = new ZeroClipboard( $("section a.copy-link") );

	// from docs for ZeroClipboard
	client.on( "ready", function( readyEvent ) {
		console.log("ZeroClipboard SWF is ready!");
		client.on( "aftercopy", function( event ) {
			// `this` === `client`
			// `event.target` === the element that was clicked
			event.target.innerHTML = "Copied!";
			} );
		} );
});


