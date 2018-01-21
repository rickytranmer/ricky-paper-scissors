console.log('JS works');

ready(setPageVars);

// - document.ready
function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function setPageVars() {
	let pageVars = new PageVars();
}

function PageVars() {
	this.gameMode = 'game.html';
	this.separateScore = document.getElementById('separate-score');
	this.sharedScore = document.getElementById('shared-score');
	this.vsCpu = document.getElementById('vs-cpu');
	this.twoPlayer = document.getElementById('two-player');
	
	// - Click Listeners
	document.querySelector('.go-button').addEventListener("click", startTheGame);
	this.separateScore.addEventListener("click", separateGame);
	this.sharedScore.addEventListener("click", sharedGame);
	this.vsCpu.addEventListener("click", cpuGame);
	this.twoPlayer.addEventListener("click", twoGame);
}

function startTheGame() {
	window.location = gameMode;
}

function separateGame() {
	if (pageVars.twoPlayer.classList.contains('active')) {
		gameMode = 'gameSplit.html';
	} else {
		gameMode = 'vsCPUsplit.html';
	}
	pageVars.separateScore.classList.add('active');
	pageVars.sharedScore.classList.remove('active');
}

function sharedGame() {
	if (pageVars.twoPlayer.classList.contains('active')) {
		gameMode = 'game.html';
	} else {
		gameMode = 'vsCPU.html';
	}
	pageVars.sharedScore.classList.add('active');
	pageVars.separateScore.classList.remove('active');
}

function cpuGame() {
	if (pageVars.sharedScore.classList.contains('active')) {
		gameMode = 'vsCPU.html';
	} else {
		gameMode = 'vsCPUsplit.html';
	}
	pageVars.vsCpu.classList.add('active');
	pageVars.twoPlayer.classList.remove('active');

}

function twoGame() {
	if (pageVars.sharedScore.classList.contains('active')) {
		gameMode = 'game.html';
	} else {
		gameMode = 'gameSplit.html';
	}
	pageVars.vsCpu.classList.remove('active');
	pageVars.twoPlayer.classList.add('active');
}