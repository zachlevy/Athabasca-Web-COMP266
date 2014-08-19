/*
author: zachary levy
date: 20140818
*/

// sets the vars and holds the battle timer
function startBattle () {
	// battle pairs 
	// holds different moves, and their counters in an array
	var battlePairs = [
		{
			"attack" : "stab",
			"block" : "shield",
			"counterWorks" : true,
			"counter" : "stab",
			"mistake" : "swing low",
			"image" : "images/stab.png"
		},
		{
			"attack" : "highswing",
			"block" : "shield",
			"counterWorks" : false,
			"counter" : "sidestep",
			"mistake" : "duck",
			"image" : "images/highswing.png"
		},
		{
			"attack" : "swing",
			"block" : "swing",
			"counterWorks" : false,
			"counter" : "jump back",
			"mistake" : "duck",
			"image" : "images/swing.png"
		},
		{
			"attack" : "thrust",
			"block" : "lean back",
			"counterWorks" : true,
			"counter" : "parry",
			"mistake" : "sidestep",
			"image" : "images/thrust.png"
		}
	];

	// initialize vars
	var attackType;
	var defenceType;

	// set the button as vars
	var buttonOne = document.getElementById("button-0");
	var buttonTwo = document.getElementById("button-1");
	var buttonThree = document.getElementById("button-2");

	// set health bars as vars
	var enemyHealthBar = document.getElementById("enemy-health");
	var playerHealthBar = document.getElementById("player-health");

	// set the status text as a var
	var status = document.getElementById("battle-result-text");

	// blood
	var blood = document.getElementById("blood-overlay");

	// add all the general vars for the battle
	var gameVars = {
		"enemyHealth" : 100,
		"playerHealth" : 100,
		"enemyHealthBar" : enemyHealthBar,
		"playerHealthBar" : playerHealthBar,
		"battleOver" : false,
		"responseButtons" : [
			buttonOne,
			buttonTwo,
			buttonThree,
		],
		"status" : status,
		"blood" : blood,
	};

	// enemy makes a move before the wait interval starts
	battle(gameVars, battlePairs);
	// enemy makes a new move every 3 seconds
	var gameTime = window.setInterval(function(){
		if (!gameVars.battleOver) {
			// if that battle is not over
			// reset the status text
			gameVars.status.innerHTML = "";
			// have the player battle
			battle(gameVars, battlePairs);
		} else {
			// show the blood overlay
			gameVars.blood.style.display = "block";
		}
	}, 3000);
}

// main battle function
// takes in the general game vars
// takes in battle pairs object
function battle (gameVars, battlePairs) {
	// whether the player has already moved
	var playerMoved = false;
	// get a random battle pair index
	var randomElement = Math.floor(Math.random()*Object.keys(battlePairs).length);
	// get a random battle pair
	var battlePair = battlePairs[randomElement];
	// randomize the buttons
	var shuffledButtons = shuffle(gameVars.responseButtons);
	// set the random buttons to block, counter, and mistake
	shuffledButtons[0].innerHTML = battlePair.block;
	shuffledButtons[1].innerHTML = battlePair.counter;
	shuffledButtons[2].innerHTML = battlePair.mistake;

	// listen for clicks on each button, set player move, determine result
	shuffledButtons[0].onclick = function () {
		if (!playerMoved) {
			playerMove = battlePair.block;
			determineResult(gameVars, battlePair, playerMove);
			playerMoved = true;
		}
	};
	shuffledButtons[1].onclick = function () {
		if (!playerMoved) {
			playerMove = battlePair.counter;
			determineResult(gameVars, battlePair, playerMove);
			playerMoved = true;
		}
	};
	shuffledButtons[2].onclick = function () {
		if (!playerMoved) {
			playerMove = battlePair.mistake;
			determineResult(gameVars, battlePair, playerMove);
			playerMoved = true;
		}
	};
	// update the image to the chosen battle pair
	var gladiatorImage = document.getElementById("gladiator-img");
	gladiatorImage.src = battlePair.image;
	// remove the blood overlay
	gameVars.blood.style.display = "none";

	// wait 2.5 seconds for the player to make a move, otherwise they lose health
	setTimeout(function (){
		if (!playerMoved) {
			gameVars.status.innerHTML = "Fight Me!";
			decreaseHealth(gameVars, true);
		}
	}, 2500);
}

// change the health of the player or enemy
// update the health bar CSS
function decreaseHealth (gameVars, player) {
	if (player) {
		// if its the player
		gameVars.playerHealth -= 20;
		gameVars.blood.style.display = "block";
	} else {
		// if its the enemy
		gameVars.enemyHealth -= 20;
	}
	// update the health bar CSS
	gameVars.enemyHealthBar.style.width = gameVars.enemyHealth + "%";
	gameVars.playerHealthBar.style.width = gameVars.playerHealth + "%";
	// if the player or enemy is beaten
	if (gameVars.playerHealth <= 0) {
		gameVars.status.innerHTML = "Enemy Wins";
		gameVars.battleOver = true;
	} else if (gameVars.enemyHealth <= 0) {
		gameVars.status.innerHTML = "Player Wins";
		gameVars.battleOver = true;
	}
}

// once the button is clicked
// determine if the button pressed blocks, counters, or dodges the attack in the battle pair
function determineResult (gameVars, battlePair, playerMove) {
	switch (playerMove) {
		case battlePair.block:
			gameVars.status.innerHTML = "Coward!";
			break;
		case battlePair.counter:
			// only if the counter works, does the enemy lose health
			if (battlePair.counterWorks) {
				console.log("countered");
				gameVars.status.innerHTML = "AHHhhh";
				decreaseHealth(gameVars, false);
			} else {
				gameVars.status.innerHTML = "Almost, plebe";
				console.log("no counter");
			}
			break;
		case battlePair.mistake:
			gameVars.status.innerHTML = "Wrong Move, slave";
			decreaseHealth(gameVars, true);
			break;
	}
}

// on window load
window.onload=function(){
	// set the out-of-game vars
	// vars for the start screen
	var startButton = document.getElementById("start-game");
	var startButtonWrap = document.getElementById("start-game-wrap");
	var gladiatorGame = document.getElementById("gladiator-game");
	gladiatorGame.style.display = "none";
	// when start button is clicked
	startButton.onclick = function () {
		startButtonWrap.style.display = "none";
		gladiatorGame.style.display = "block";
		// start the main battle function
		startBattle();
	};
};


/*
source: https://github.com/coolaj86/knuth-shuffle
author: knuth-shuffle
date: 20140818
*/

// randomizes an array
function shuffle(array) {
    var currentIndex = array.length
      , temporaryValue
      , randomIndex
      ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }