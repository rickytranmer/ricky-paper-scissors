console.log('app.js loaded');

let p1 = new Player(1);
let p2 = new Player(2);
let display = new Display();

// - Start the game after a short delay
setTimeout(() => { startRound() }, 333);

// - New player
function Player(id) {
	this.id = id;
	this.score = 0;
	this.choice = '';
	this.listener = false;
	this.elements = {
		rock: document.getElementById(this.id + 'rock'),
		paper: document.getElementById(this.id + 'paper'),
		scissors: document.getElementById(this.id + 'scissors')
	};
}

// - Counters, display elements, and event listeners
function Display() {
	this.rounds = 0;
	this.score = { rock: 1, paper: 1, scissors: 1, all: [] };
	this.elements = {
		score: document.getElementById('score-text'),
		round: document.getElementById('round-text'),
		rock: document.getElementById('rock-score'),
		paper: document.getElementById('paper-score'),
		scissors: document.getElementById('scissors-score')
	};
	this.elements.all = [ this.elements.rock, this.elements.paper, this.elements.scissors ];
	this.audioWin = new Audio('audio/Whpsh.m4a');

	// - Key press listener, check if q, w, e (P1) OR i, o, p (P2)
	document.addEventListener('keyup', function(event) {
		const keyName = event.key;
		if ( p1.listener && ((keyName == 'q') || (keyName == 'w') || (keyName == 'e')) ) {
			disablePlayer(p1, keyName, p2);
		}
		if ( p2.listener && ((keyName == 'i') || (keyName == 'o') || (keyName == 'p')) ) {
			disablePlayer(p2, keyName, p1);
		}
	});

	// - Player 1 click listeners
	p1.elements.rock.addEventListener('click', ()=> {
		if (p1.listener) {
			disablePlayer(p1, 'q', p2);
		}
	});
	p1.elements.paper.addEventListener('click', ()=> {
		if (p1.listener) {
			disablePlayer(p1, 'w', p2);
		}
	});
	p1.elements.scissors.addEventListener('click', ()=> {
		if (p1.listener) {
			disablePlayer(p1, 'e', p2);
		}
	});
	
	// - Player 2 click listeners
	p2.elements.rock.addEventListener('click', ()=> {
		if (p2.listener) {
			disablePlayer(p2, 'i', p1);
		}
	});
	p2.elements.paper.addEventListener('click', ()=> {
		if (p2.listener) {
			disablePlayer(p2, 'o', p1);
		} 
	});
	p2.elements.scissors.addEventListener('click', ()=> {
		if (p2.listener) {
			disablePlayer(p2, 'p', p1);
		}
	});
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
	let scoreLayout = Math.floor(Math.random() * 6);
	switch (scoreLayout) {
		case 0:
			display.score = { rock: 1, paper: 2, scissors: 3, all: [] };
			break;
		case 1:
			display.score = { rock: 1, paper: 3, scissors: 2, all: [] };
			break;
		case 2:
			display.score = { rock: 2, paper: 1, scissors: 3, all: [] };
			break;
		case 3:
			display.score = { rock: 2, paper: 3, scissors: 1, all: [] };
			break;
		case 4:
			display.score = { rock: 3, paper: 1, scissors: 2, all: [] };
			break;
		case 5:
			display.score = { rock: 3, paper: 2, scissors: 1, all: [] };
			break;
	}
	display.score.all = [ display.score.rock, display.score.paper, display.score.scissors ];

	// - Shake animation for each hand img over period of 1 sec
	for (let i = 0; i < 3; i++) {
		setTimeout(()=> {
			display.elements.all[i].innerText = display.score.all[i];
			document.querySelectorAll('img')[i].style.animation = 'upDown .333s';
			audioSlap();
		}, i*333);
		// - Reset hand animation
		setTimeout(() => { document.querySelectorAll('img')[i].style.animation = '' }, 1000-(i*333));
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
	resetBtn.addEventListener('click', ()=> { window.location = 'game.html' });
	backBtn.addEventListener('click', ()=> { window.location = 'index.html' });
}

// - Flash winning hand button, and bold winning hand pts value
function flashWinningP(winningHand, losingHand, handScore) {
	handScore.style.fontWeight = 900;
	setTimeout(()=> { display.audioWin.play() }, 250);

	winningHand.classList.remove('disabled');
	winningHand.classList.add('btn-success');
	losingHand.classList.remove('disabled');
	losingHand.classList.add('btn-danger');

	setTimeout(()=> { winningHand.classList.add('btn-outline-success') }, 500);
	setTimeout(()=> { winningHand.classList.remove('btn-outline-success') }, 1000);
	setTimeout(()=> { winningHand.classList.add('btn-outline-success') }, 1500);
	setTimeout(()=> { winningHand.classList.remove('btn-outline-success') }, 2000);

	// - Prepare for next round
	setTimeout(()=> {
		handScore.style.fontWeight = 400;
		winningHand.classList.remove('btn-success');
		losingHand.classList.remove('btn-danger');
	}, 2500);
}

// - Both hands briefly flash during tie
function flashTie(p1Hand, p2Hand) {
	p1Hand.classList.remove('disabled');
	p2Hand.classList.remove('disabled');
	setTimeout(()=> {
		p1Hand.classList.add('btn-outline-secondary');
		p2Hand.classList.add('btn-outline-secondary');
	}, 500);
	setTimeout(()=> {
		p1Hand.classList.remove('btn-outline-secondary');
		p2Hand.classList.remove('btn-outline-secondary');
	}, 1000);
}

// - Determine winner, apply points
function scoreRound(){
	switch (p1.choice) {
		case 'q': 										//P1 - ROCK
			if (p2.choice == 'i') { 					//P2 - ROCK
				flashTie(p1.elements.rock, p2.elements.rock);
			} else if (p2.choice == 'o') { 		//P2 - PAPER
				p2.score += display.score.paper;
				flashWinningP(p2.elements.paper, p1.elements.rock, display.elements.paper);
			} else {													//P2 - SCISSORS
				p1.score += display.score.rock;
				flashWinningP(p1.elements.rock, p2.elements.scissors, display.elements.rock);
			}
			break;
		case 'w': 										//P1 - PAPER
			if (p2.choice == 'i') { 					//P2 - ROCK
				p1.score += display.score.paper;
				flashWinningP(p1.elements.paper, p2.elements.rock, display.elements.paper);
			} else if (p2.choice == 'o') { 		//P2 - PAPER
				flashTie(p1.elements.paper, p2.elements.paper);
			} else {													//P2 - SCISSORS
				p2.score += display.score.scissors;
				flashWinningP(p2.elements.scissors, p1.elements.paper, display.elements.scissors);
			}
			break;
		case 'e': 										//P1 - SCISSORS
			if (p2.choice == 'i') { 					//P2 - ROCK
				p2.score += display.score.rock;
				flashWinningP(p2.elements.rock, p1.elements.scissors, display.elements.rock);
			} else if (p2.choice == 'o') { 		//P2 - PAPER
				p1.score += display.score.scissors;
				flashWinningP(p1.elements.scissors, p2.elements.paper, display.elements.scissors);
			} else {													//P2 - SCISSORS
				flashTie(p1.elements.scissors, p2.elements.scissors);
			}
			break;
	}

	setTimeout(()=> {
		display.elements.score.innerHTML = '<span class="bigger-text">' + p1.score + '</span> vs <span class="bigger-text">' + p2.score + '</span>';
		startRound();
	}, 2500);
}