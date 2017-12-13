console.log('JS works');

var twoPlayerMode, sharedMode = true;
var gameMode = 'game.html';

function startTheGame() {
	window.location = gameMode;
}

function separateGame() {
	//TODO - Check if 2player/CPU
	gameMode = 'gameSplit.html'
	document.getElementById('separate-score').classList.add('active');
	document.getElementById('shared-score').classList.remove('active');
}

function sharedGame() {
	//TODO - Check if 2player/CPU
	gameMode = 'game.html'
	document.getElementById('shared-score').classList.add('active');
	document.getElementById('separate-score').classList.remove('active');
}

document.getElementById('start-button').addEventListener("click", startTheGame);

document.getElementById('separate-score').addEventListener("click", separateGame);
document.getElementById('shared-score').addEventListener("click", sharedGame);

//TODO - Add event listeners for each button to change gameMode
//TODO										 to add/remove 'active' class

//BRAINSTORM
//sound effects / change sound effects?
//change points required to win
//input name