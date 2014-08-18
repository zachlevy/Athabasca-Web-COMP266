/*
author: zachary levy
date: 20140818
*/
// on window load
function startBattle () {
	var attackType;
	var defenceType;
	var battlePairs = [
		{
			"attack" : "stab",
			"block" : "shield",
			"counterWorks" : true,
			"counter" : "parry",
			"mistake" : "swing low",
			"image" : "http://placehold.it/500x300&text=Stab"
		},
		{
			"attack" : "highswing",
			"block" : "shield",
			"counterWorks" : false,
			"counter" : "sidestep",
			"mistake" : "duck",
			"image" : "http://placehold.it/500x300&text=High%20Swing"
		},
		{
			"attack" : "sweep legs",
			"block" : "jump back",
			"counterWorks" : false,
			"counter" : "jump up",
			"mistake" : "duck",
			"image" : "http://placehold.it/500x300&text=Sweep%20Legs"
		},
		{
			"attack" : "thrust",
			"block" : "lean back",
			"counterWorks" : true,
			"counter" : "parry",
			"mistake" : "sidestep",
			"image" : "http://placehold.it/500x300&text=Thrust"
		}
	];

	// set the button as vars
	var buttonOne = document.getElementById("button-0");
	var buttonTwo = document.getElementById("button-1");
	var buttonThree = document.getElementById("button-2");

	var enemyHealthBar = document.getElementById("enemy-health");
	var playerHealthBar = document.getElementById("player-health");

	// set the status text as a var
	var status = document.getElementById("battle-result-text");

	// blood
	var blood = document.getElementById("blood-overlay");

	// add all the vars for the battle
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
	// 
	var reactionTimer;

	// enemy makes a move before the wait interval starts
	battle(gameVars, battlePairs);
	// enemy makes a new move every 3 seconds
	var gameTime = window.setInterval(function(){
		if (!gameVars.battleOver) {
			gameVars.status.innerHTML = "";
			battle(gameVars, battlePairs);
		} else {
			gameVars.blood.style.display = "block";
		}
	}, 3000);
}

function battle (gameVars, battlePairs) {
	var playerMoved = false;
	// get a random battle pair
	var randomElement = Math.floor(Math.random()*Object.keys(battlePairs).length);
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
	// udpate the image with the attack
	var gladiatorImage = document.getElementById("gladiator-img");
	gladiatorImage.src = battlePair.image;
	gameVars.blood.style.display = "none";

	setTimeout(function (){
		if (!playerMoved) {
			gameVars.status.innerHTML = "Fight Me!";
			decreaseHealth(gameVars, true);
		}
	}, 2500);
}

// change the healthbar
function decreaseHealth (gameVars, player) {
	if (player) {
		gameVars.playerHealth -= 20;
		gameVars.blood.style.display = "block";
	} else {
		gameVars.enemyHealth -= 20;
	}
	gameVars.enemyHealthBar.style.width = gameVars.enemyHealth + "%";
	gameVars.playerHealthBar.style.width = gameVars.playerHealth + "%";
	console.log("playerHealth: " + gameVars.playerHealth);
	console.log("enemyHealth: " + gameVars.enemyHealth);
	if (gameVars.playerHealth <= 0) {
		gameVars.status.innerHTML = "Enemy Wins";
		console.log("Enemy wins");
		gameVars.battleOver = true;
	} else if (gameVars.enemyHealth <= 0) {
		gameVars.status.innerHTML = "Player Wins";
		console.log("Player wins");
		gameVars.battleOver = true;
	}
}

// once the button is clicked
function determineResult (gameVars, battlePair, playerMove) {
	switch (playerMove) {
		case battlePair.block:
			gameVars.status.innerHTML = "Coward!";
			break;
		case battlePair.counter:
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
	var startButton = document.getElementById("start-game");
	var startButtonWrap = document.getElementById("start-game-wrap");
	var gladiatorGame = document.getElementById("gladiator-game");
	gladiatorGame.style.display = "none";
	startButton.onclick = function () {
		startButtonWrap.style.display = "none";
		gladiatorGame.style.display = "block";
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