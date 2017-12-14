console.log('JS works');

var twoPlayerMode, sharedMode = true;
var gameMode = 'game.html';

function startTheGame() {
	window.location = gameMode;
}

function separateGame() {
	//TODO - Check if 2player/CPU (if I make a separate score CPU mode)
	gameMode = 'gameSplit.html'
	document.getElementById('separate-score').classList.add('active');
	document.getElementById('shared-score').classList.remove('active');
	document.getElementById('two-player').classList.add('active');
	document.getElementById('vs-cpu').classList.remove('active');
}

function sharedGame() {
	// - Check if 2player/CPU
	if (document.getElementById('two-player').classList.contains('active')) {
		gameMode = 'game.html';
	} else {
		gameMode = 'vsCPU.html';
	}
	document.getElementById('shared-score').classList.add('active');
	document.getElementById('separate-score').classList.remove('active');
}

function cpuGame() {
	gameMode = 'vsCPU.html';
	document.getElementById('shared-score').classList.add('active');
	document.getElementById('separate-score').classList.remove('active');
	document.getElementById('vs-cpu').classList.add('active');
	document.getElementById('two-player').classList.remove('active');

}

function twoGame() {
	gameMode = 'game.html';
	document.getElementById('two-player').classList.add('active');
	document.getElementById('vs-cpu').classList.remove('active');
}

// - Click listeners
document.querySelector('.go-button').addEventListener("click", startTheGame);
document.getElementById('separate-score').addEventListener("click", separateGame);
document.getElementById('shared-score').addEventListener("click", sharedGame);
document.getElementById('vs-cpu').addEventListener("click", cpuGame);
document.getElementById('two-player').addEventListener("click", twoGame);