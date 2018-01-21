console.log('app.js loaded');

let p1 = new Player(1);
let p2 = new Player(2);
playerElements(p1);
playerElements(p2);

let display = new Display();
displayElements(display);

// - Start the game after a short delay
setTimeout(function() { startRound() }, 333);

// - New player
function Player(id) {
	this.id = id;
	this.score = 0;
	this.choice = '';
	this.listener = false;
	this.elements = {};
}
// - Player hand inputs
function playerElements(thisPlayer) {
	thisPlayer.elements = {
		rock: document.getElementById(thisPlayer.id + 'rock'),
		paper: document.getElementById(thisPlayer.id + 'paper'),
		scissors: document.getElementById(thisPlayer.id + 'scissors')
	};
}

// - Counters, display elements, and event listeners
function Display() {
	this.rounds = 0;
	this.score = { rock: 1, paper: 1, scissors: 1, all: [] };
	this.elements = {};

	// - Key press listener
	document.addEventListener('keyup', function(event) {
		const keyName = event.key;
		if ( p1.listener && ((keyName == 'q') || (keyName == 'w') || (keyName == 'e')) ) {
			console.log(keyName + ' pressed');
			switch (keyName) {
				case 'q':
				case 'w':
				case 'e':
					p1.choice = keyName;
					disablePlayer(p1, p2);
					break;
			}
		}

		if ( p2.listener && ((keyName == 'i') || (keyName == 'o') || (keyName == 'p')) ) {
			console.log(keyName + ' pressed');
			switch (keyName) {
				case 'i':
				case 'o':
				case 'p':
					p2.choice = keyName;
					disablePlayer(p2, p1);
					break;
			}
		}
		if ((p1.choice) || (p2.choice)) {
			console.log(p1.choice + ' ' + p2.choice);
		} else {
			console.log('invalid input (caps lock?)');
		}
	});

	// - Player 1 button inputs
	p1.elements.rock.addEventListener('click', function() {
		if (p1.listener) {
			p1.choice = 'q';
			disablePlayer(p1, p2);
		}
	});
	p1.elements.paper.addEventListener('click', function() {
		if (p1.listener) {
			p1.choice = 'w';
			disablePlayer(p1, p2);
		}
	});
	p1.elements.scissors.addEventListener('click', function() {
		if (p1.listener) {
			p1.choice = 'e';
			disablePlayer(p1, p2);
		}
	});
	
	// - Player 2 button inputs
	p2.elements.rock.addEventListener('click', function() {
		if (p2.listener) {
			p2.choice = 'i';
			disablePlayer(p2, p1);
		}
	});
	p2.elements.paper.addEventListener('click', function() {
		if (p2.listener) {
			p2.choice = 'o';
			disablePlayer(p2, p1);
		} 
	});
	p2.elements.scissors.addEventListener('click', function() {
		if (p2.listener) {
			p2.choice = 'p';
			disablePlayer(p2, p1);
		}
	});
}
// - Game info
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
	if (p1.score >= 15) {
		gameWinner(p1);
	} else if (p2.score >= 15) {
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
	console.log(`p${thisPlayer.id} wins the game`);
	setListeners(false);
	display.elements.rock.innerText = 'PLAYER';
	display.elements.paper.innerText = thisPlayer.id;
	display.elements.scissors.innerText = 'WINS';
	display.elements.paper.style.fontWeight = 900;
	thisPlayer.elements.rock.classList.add('btn-success');
	thisPlayer.elements.paper.classList.add('btn-success');
	thisPlayer.elements.scissors.classList.add('btn-success');
}

// - Shake hands, show pts, show round is starting
function shakeHands() {
	display.score.rock = Math.floor((Math.random() * 6) + 1);
	display.score.paper = Math.floor((Math.random() * 6) + 1);
	display.score.scissors = Math.floor((Math.random() * 6) + 1);
	display.score.all = [ display.score.rock, display.score.paper, display.score.scissors ];
	console.log(display.score.all);

	// - Shake animation for each hand img over period of 1 sec
	for (let i = 0; i < 3; i++) {
		setTimeout(function() {
			display.elements.all[i].innerText = display.score.all[i] + 'pts';
			document.querySelectorAll('img')[i].style.animation = 'upDown .33s';
			audioSlap();
		}, i*333);
		// - Reset hand animation
		setTimeout(function() { document.querySelectorAll('img')[i].style.animation = '' }, 1000-(i*333));
	}
}

// - Disable thisPlayer inputs, score if thatPlayer ready
function disablePlayer(thisPlayer, thatPlayer) {
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
	backBtn.style.margin = '20px';
	resetBtn.style.margin = '20px';

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
	resetBtn.addEventListener('click', function() { window.location = 'game.html' });
	backBtn.addEventListener('click', function() { window.location = 'index.html' });
}


// - Flash winning hand button, and bold winning hand pts value
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
	}, 2500);
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
				p2.score += display.score.paper;
				flashWinningP(p2.elements.paper, p1.elements.rock, display.elements.paper);
			} else {
				p1.score += display.score.rock;
				flashWinningP(p1.elements.rock, p2.elements.scissors, display.elements.rock);
			}
			break;
		case 'w':
			if (p2.choice == 'i') {
				p1.score += display.score.paper;
				flashWinningP(p1.elements.paper, p2.elements.rock, display.elements.paper);
			} else if (p2.choice == 'o') {
				flashTie(p1.elements.paper, p2.elements.paper);
			} else {
				p2.score += display.score.scissors;
				flashWinningP(p2.elements.scissors,p1.elements.paper, display.elements.scissors);
			}
			break;
		case 'e':
			if (p2.choice == 'i') {
				p2.score += display.score.rock;
				flashWinningP(p2.elements.rock, p1.elements.scissors, display.elements.rock);
			} else if (p2.choice == 'o') {
				p1.score += display.score.scissors;
				flashWinningP(p1.elements.scissors, p2.elements.paper, display.elements.scissors);
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