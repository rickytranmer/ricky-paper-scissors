console.log('appSplit.js loaded');

let p1 = new Player(1);
let p2 = new Player(2);
playerElements(p1);
playerElements(p2);

let display = new Display();
displayElements(display);

// - Start the game after a short delay
setTimeout(() => { startRound() }, 333);

function Player(id) {
	this.id = id;
	this.score = 0;
	this.choice = 0;
	this.listener = false;
	this.elements = {};
	this.scoring = { rock: 1, paper: 1, scissors: 1, all: [], elements: {} };
}
function playerElements(thisPlayer) {
	thisPlayer.elements = {
		rock: document.getElementById(thisPlayer.id + 'rock'),
		paper: document.getElementById(thisPlayer.id + 'paper'),
		scissors: document.getElementById(thisPlayer.id + 'scissors')
	};
	thisPlayer.scoring.elements = {
		rock: document.getElementById('rock-score' + thisPlayer.id),
		paper: document.getElementById('paper-score' + thisPlayer.id),
		scissors: document.getElementById('scissors-score' + thisPlayer.id),
		all: []
	};
	thisPlayer.scoring.elements.all = [ thisPlayer.scoring.elements.rock, thisPlayer.scoring.elements.paper, thisPlayer.scoring.elements.scissors ]
}

function Display() {
	this.rounds = 0;
	this.elements = {};

	// - Key press listener
	document.addEventListener('keyup', function(event) {
		const keyName = event.key;
		if ( p1.listener && ((keyName == 'q') || (keyName == 'w') || (keyName == 'e')) ) {
			disablePlayer(p1, keyName, p2);
		}
		if ( p2.listener && ((keyName == 'i') || (keyName == 'o') || (keyName == 'p')) ) {
			disablePlayer(p2, keyName, p1);
		}
	});

	// - Player 1 button inputs
	p1.elements.rock.addEventListener('click', function() {
		if (p1.listener) {
			disablePlayer(p1, 'q', p2);
		}
	});
	p1.elements.paper.addEventListener('click', function() {
		if (p1.listener) {
			disablePlayer(p1, 'w', p2);
		}
	});
	p1.elements.scissors.addEventListener('click', function() {
		if (p1.listener) {
			disablePlayer(p1, 'e', p2);
		}
	});
	
	// - Player 2 button inputs
	p2.elements.rock.addEventListener('click', function() {
		if (p2.listener) {
			disablePlayer(p2, 'i', p1);
		}
	});
	p2.elements.paper.addEventListener('click', function() {
		if (p2.listener) {
			disablePlayer(p2, 'o', p1);
		} 
	});
	p2.elements.scissors.addEventListener('click', function() {
		if (p2.listener) {
			disablePlayer(p2, 'p', p1);
		}
	});
}

function displayElements(thisDisplay) {
	thisDisplay.elements.score = document.getElementById('score-text');
	thisDisplay.elements.round = document.getElementById('round-text');
	thisDisplay.elements.rock = document.getElementById('rock-score');
	thisDisplay.elements.paper = document.getElementById('paper-score');
	thisDisplay.elements.scissors = document.getElementById('scissors-score');
	thisDisplay.elements.all = [ thisDisplay.elements.rock, thisDisplay.elements.paper, thisDisplay.elements.scissors ];
	thisDisplay.audioWin = new Audio('audio/Whpsh.m4a');
}

function startRound() {
	display.rounds++;
	display.elements.round.innerText = display.rounds;
	
	// - Reset hand input classes
	p1.elements.rock.classList.remove('disabled');
	p1.elements.paper.classList.remove('disabled');
	p1.elements.scissors.classList.remove('disabled');
	p2.elements.rock.classList.remove('disabled');
	p2.elements.paper.classList.remove('disabled');
	p2.elements.scissors.classList.remove('disabled');

	// - Check if winner - else play!
	if (p1.score >= 10) {
		gameWinner(p1);
	} else if (p2.score >= 10) {
		gameWinner(p2);
	} else {
		// - Rock, Paper, Scissors!
		setListeners(true);
	}
}

function setListeners(bool) {
	p1.listener = bool;
	p2.listener = bool;
	bool ? shakeHands() : createButtons();
}

function audioSlap() {
	display.audio = new Audio('audio/Slap.mp3');
	display.audio.play();
}

function gameWinner(thisPlayer) {
	setListeners(false);
	p1.scoring.elements.rock.innerText = 'PLAYER';
	p1.scoring.elements.paper.innerText = thisPlayer.id;
	p1.scoring.elements.scissors.innerText = 'WINS';
	p1.scoring.elements.paper.style.fontWeight = 900;

	p2.scoring.elements.rock.innerText = 'PLAYER';
	p2.scoring.elements.paper.innerText = thisPlayer.id;
	p2.scoring.elements.scissors.innerText = 'WINS';
	p2.scoring.elements.paper.style.fontWeight = 900;

	thisPlayer.elements.rock.classList.add('btn-success');
	thisPlayer.elements.paper.classList.add('btn-success');
	thisPlayer.elements.scissors.classList.add('btn-success');
}

function scoreLayout(thisPlayer) {
	let scoreLayout = Math.floor(Math.random() * 6);
	switch (scoreLayout) {
		case 0:
			thisPlayer.scoring = { rock: 1, paper: 2, scissors: 3, all: [] };
			break;
		case 1:
			thisPlayer.scoring = { rock: 1, paper: 3, scissors: 2, all: [] };
			break;
		case 2:
			thisPlayer.scoring = { rock: 2, paper: 1, scissors: 3, all: [] };
			break;
		case 3:
			thisPlayer.scoring = { rock: 2, paper: 3, scissors: 1, all: [] };
			break;
		case 4:
			thisPlayer.scoring = { rock: 3, paper: 1, scissors: 2, all: [] };
			break;
		case 5:
			thisPlayer.scoring = { rock: 3, paper: 2, scissors: 1, all: [] };
			break;
	}
	thisPlayer.scoring.all = [ thisPlayer.scoring.rock, thisPlayer.scoring.paper, thisPlayer.scoring.scissors ];
}

// - Shake hands, show pts, show round is starting
function shakeHands() {
	scoreLayout(p1);
	playerElements(p1);
	scoreLayout(p2);
	playerElements(p2);

	// - Shake animation for each hand img over period of 1 sec
	for (let i = 0; i < 3; i++) {
		setTimeout(function() {
			p1.scoring.elements.all[i].innerText = p1.scoring.all[i];
			p2.scoring.elements.all[i].innerText = p2.scoring.all[i];
			document.querySelectorAll('img')[i].style.animation = 'upDown .33s';
			document.querySelectorAll('img')[i+3].style.animation = 'upDown .33s';
			audioSlap();
		}, i*333);
		// - Reset hand animation
		setTimeout(() => { document.querySelectorAll('img')[i].style.animation = '' }, 1000-(i*333));
		setTimeout(() => { document.querySelectorAll('img')[i+3].style.animation = '' }, 1000-(i*333));
	}
}

// - Disable thisPlayer inputs, score if thatPlayer ready
function disablePlayer(thisPlayer, theirChoice, thatPlayer) {
	thisPlayer.choice = theirChoice;
	thisPlayer.elements.rock.classList.add('disabled');
	thisPlayer.elements.paper.classList.add('disabled');
	thisPlayer.elements.scissors.classList.add('disabled');
	thisPlayer.listener = false;

	if (!thatPlayer.listener) {
		console.log(`p${thatPlayer.id} finished first`);
		scoreRound();
	}
}

// - Create Back & Reset buttons
function createButtons() {
	let resetButtons = document.getElementById('reset-buttons');
	let resetBtn = document.createElement('button');
	let backBtn = document.createElement('button');

	resetButtons.style.textAlign = 'center';
	backBtn.style.margin = '1vh';
	resetBtn.style.margin = '1vh';

	backBtn.classList.add('btn-danger');
	backBtn.classList.add('btn-lg');
	backBtn.classList.add('btn');
	backBtn.innerText = 'BACK';

	resetBtn.classList.add('btn-success');
	resetBtn.classList.add('btn-lg');
	resetBtn.classList.add('btn');
	resetBtn.innerText = 'RESET';

	// - Attach to col-2 div and listen for clicks
	resetButtons.appendChild(backBtn);
	resetButtons.appendChild(resetBtn);
	resetBtn.addEventListener('click', function(){ window.location = 'gameSplit.html' });
	backBtn.addEventListener('click', function(){ window.location = 'index.html' });
}


// - Bold winning hand pts value, flash Winner's hand button
function flashWinningP(winningHand, losingHand, handScore) {
	handScore.style.fontWeight = 900;
	setTimeout(function() { display.audioWin.play(); }, 250);

	winningHand.classList.remove('disabled');
	winningHand.classList.add('btn-success');
	losingHand.classList.remove('disabled');
	losingHand.classList.add('btn-danger');

	setTimeout(function() { winningHand.classList.add('btn-outline-success'); }, 500);
	setTimeout(function() { winningHand.classList.remove('btn-outline-success'); }, 1000);
	setTimeout(function() { winningHand.classList.add('btn-outline-success'); }, 1500);
	setTimeout(function() {
		winningHand.classList.remove('btn-outline-success');
		handScore.style.fontWeight = 400;
	}, 2000);

	// - Prepare for next round
	setTimeout(function() {
		winningHand.classList.remove('btn-success');
		losingHand.classList.remove('btn-danger');
	}, 2500)
}

// - Both hands briefly flash
function flashTie(p1Hand, p2Hand) {
	p1Hand.classList.remove('disabled');
	p2Hand.classList.remove('disabled');

	setTimeout(function() { p1Hand.classList.add('btn-outline-secondary'); }, 500);
	setTimeout(function() { p1Hand.classList.remove('btn-outline-secondary'); }, 1000);
	setTimeout(function() { p2Hand.classList.add('btn-outline-secondary'); }, 500);
	setTimeout(function() { p2Hand.classList.remove('btn-outline-secondary'); }, 1000);
}

// - Determine winner, apply points
function scoreRound(){
	switch (p1.choice) {
		case 'q':
			if (p2.choice == 'i') {
				flashTie(p1.elements.rock, p2.elements.rock);
			} else if (p2.choice == 'o') {
				p2.score += p2.scoring.paper;
				flashWinningP(p2.elements.paper, p1.elements.rock, p2.scoring.elements.paper);
			} else {
				p1.score += p1.scoring.rock;
				flashWinningP(p1.elements.rock, p2.elements.scissors, p1.scoring.elements.rock);
			}
			break;
		case 'w':
			if (p2.choice == 'i') {
				p1.score += p1.scoring.paper;
				flashWinningP(p1.elements.paper, p2.elements.rock, p1.scoring.elements.paper);
			} else if (p2.choice == 'o') {
				flashTie(p1.elements.paper, p2.elements.paper);
			} else {
				p2.score += p2.scoring.scissors;
				flashWinningP(p2.elements.scissors, p1.elements.paper, p2.scoring.elements.scissors);
			}
			break;
		case 'e':
			if (p2.choice == 'i') {
				p2.score += p2.scoring.rock;
				flashWinningP(p2.elements.rock, p1.elements.scissors, p2.scoring.elements.rock);
			} else if (p2.choice == 'o') {
				p1.score += p1.scoring.scissors;
				flashWinningP(p1.elements.scissors, p2.elements.paper, p1.scoring.elements.scissors);
			} else {
				flashTie(p1.elements.scissors, p2.elements.scissors);
			}
			break;
	}

	setTimeout(function() {
		display.elements.score.innerHTML = '<span class="bigger-text">' + p1.score + '</span> vs <span class="bigger-text">' + p2.score + '</span';
		startRound();
	}, 2500);
}