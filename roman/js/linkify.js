/*
source: http://jsfiddle.net/hakim/Ht6Ym/
author: hakim
date: 20140723
*/
// on window load
window.onload=function(){
	// set true if the browser supports the perspective alteration
	var supports3DTransforms =  document.body.style['webkitPerspective'] !== undefined || document.body.style['MozPerspective'] !== undefined;
	// function to transform elements
	function linkify( selector ) {
		// if browser supports transform, else print failure to console
	    if( supports3DTransforms ) {
	        // get all elements that match the selector
	        var nodes = document.querySelectorAll( selector );
	        // for each element
	        for( var i = 0, len = nodes.length; i < len; i++ ) {
	            var node = nodes[i];
	            // if the class doesn't already roll
	            if( !node.className || !node.className.match( /roll/g ) ) {
	            	// dynamically add roll class to selector elements
	                node.className += ' roll';
	                /*
	                uncomment next line to roll all elements that match selector, otherwise you'll have to wrap text with
	                <span data-title="roll text"></span>
	                */
	                //node.innerHTML = '<span data-title="'+ node.text +'">' + node.innerHTML + '</span>';
	            }
	        };
	    } else {
	    	console.log ("failture, browser doesn't support 3d");
	    }
	}
	// set which html elements you want to have scroll effect
	linkify( 'h1' );
	linkify( 'h2' );
	linkify( 'h3' );
}