console.log('JS works');

var twoPlayerMode, sharedMode = true;
var gameMode = 'game.html'

function startTheGame () {
	window.location = gameMode;
}

document.getElementById('start-button').addEventListener("click", startTheGame);

//TODO - Add event listeners for each button to change gameMode
//TODO										 to add/remove 'active' class

//BRAINSTORM
//sound effects / change sound effects?
//change points required to win
//input name