console.log('JS works');

let pageVars = new PageVars();

function PageVars() {
	this.gameMode = 'game.html';
	this.separateScore = document.getElementById('separate-score');
	this.sharedScore = document.getElementById('shared-score');
	this.vsCpu = document.getElementById('vs-cpu');
	this.twoPlayer = document.getElementById('two-player');
	
	// - Click Listeners
	document.querySelector('#start-button').addEventListener("click", startTheGame);
	this.separateScore.addEventListener("click", separateGame);
	this.sharedScore.addEventListener("click", sharedGame);
	this.vsCpu.addEventListener("click", cpuGame);
	this.twoPlayer.addEventListener("click", twoGame);
}

function startTheGame() {
	debugger;
	window.location = pageVars.gameMode;
}

function separateGame() {
	if (pageVars.twoPlayer.classList.contains('active')) {
		pageVars.gameMode = 'gameSplit.html';
	} else {
		pageVars.gameMode = 'vsCPUsplit.html';
	}
	pageVars.separateScore.classList.add('active');
	pageVars.sharedScore.classList.remove('active');
}

function sharedGame() {
	if (pageVars.twoPlayer.classList.contains('active')) {
		pageVars.gameMode = 'game.html';
	} else {
		pageVars.gameMode = 'vsCPU.html';
	}
	pageVars.sharedScore.classList.add('active');
	pageVars.separateScore.classList.remove('active');
}

function cpuGame() {
	if (pageVars.sharedScore.classList.contains('active')) {
		pageVars.gameMode = 'vsCPU.html';
	} else {
		pageVars.gameMode = 'vsCPUsplit.html';
	}
	pageVars.vsCpu.classList.add('active');
	pageVars.twoPlayer.classList.remove('active');

}

function twoGame() {
	if (pageVars.sharedScore.classList.contains('active')) {
		pageVars.gameMode = 'game.html';
	} else {
		pageVars.gameMode = 'gameSplit.html';
	}
	pageVars.vsCpu.classList.remove('active');
	pageVars.twoPlayer.classList.add('active');
}

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/ricky-paper-scissors/rps-sw.js');
  });
}