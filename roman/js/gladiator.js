/*
author: zachary levy
date: 20140818
*/
// on window load
window.onload=function(){
	function startBattle () {
		var attackType;
		var defenceType;
		var battlePairs = {
				"stab" : {
				"block" : "shield",
				"counter" : "sweeplegs",
				"image" : "images/stab.png"
			},
				"highswing" : {
				"block" : "sidestep",
				"counter" : null,
				"image" : "images/highswing.png"
			}
		};
		var enemyHealth;
		var playerHealth;
		var reactionTimer;
		var battleOver;
		var repeater = setInterval(battle(),1000);
		clearInterval(repeater);
	}

	function battle () {
		console.log("test");
	}
	



	
};