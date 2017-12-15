console.log('JS works');

var twoPlayerMode, sharedMode = true;
var gameMode = 'game.html';

function startTheGame() {
	window.location = gameMode;
}

function separateGame() {
	if (document.getElementById('two-player').classList.contains('active')) {
		gameMode = 'gameSplit.html';
	} else {
		gameMode = 'vsCPUsplit.html';
	}
	document.getElementById('separate-score').classList.add('active');
	document.getElementById('shared-score').classList.remove('active');
}

function sharedGame() {
	if (document.getElementById('two-player').classList.contains('active')) {
		gameMode = 'game.html';
	} else {
		gameMode = 'vsCPU.html';
	}
	document.getElementById('shared-score').classList.add('active');
	document.getElementById('separate-score').classList.remove('active');
}

function cpuGame() {
	if (document.getElementById('shared-score').classList.contains('active')) {
		gameMode = 'vsCPU.html';
	} else {
		gameMode = 'vsCPUsplit.html';
	}
	document.getElementById('vs-cpu').classList.add('active');
	document.getElementById('two-player').classList.remove('active');

}

function twoGame() {
	if (document.getElementById('shared-score').classList.contains('active')) {
		gameMode = 'game.html';
	} else {
		gameMode = 'gameSplit.html';
	}
	document.getElementById('vs-cpu').classList.add('active');
	document.getElementById('two-player').classList.remove('active');
}

// - Click listeners
document.querySelector('.go-button').addEventListener("click", startTheGame);
document.getElementById('separate-score').addEventListener("click", separateGame);
document.getElementById('shared-score').addEventListener("click", sharedGame);
document.getElementById('vs-cpu').addEventListener("click", cpuGame);
document.getElementById('two-player').addEventListener("click", twoGame);