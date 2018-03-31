console.log('appSplit.js loaded');
// CONTSTRUCTOR FUNCTIONS
// - Player
function Player(id) {
	this.id = id;
	this.score = 0;
	this.choice = 0;
	this.listener = false;
	this.elements = {
		rock: document.getElementById(this.id + 'rock'),
		paper: document.getElementById(this.id + 'paper'),
		scissors: document.getElementById(this.id + 'scissors')
	};
	this.scoring = { rock: 1, paper: 1, scissors: 1, all: [] };
	this.scoringElements = {
		rock: document.getElementById('rock-score' + this.id),
		paper: document.getElementById('paper-score' + this.id),
		scissors: document.getElementById('scissors-score' + this.id),
		all: []
	};
	this.scoringElements.all = [ this.scoringElements.rock, this.scoringElements.paper, this.scoringElements.scissors ];
	this.gameWinner = ()=> {
		setListeners(false);
		p1.scoringElements.rock.innerText = 'PLAYER';
		p1.scoringElements.paper.innerText = this.id;
		p1.scoringElements.scissors.innerText = 'WINS';
		p1.scoringElements.paper.style.fontWeight = 900;

		p2.scoringElements.rock.innerText = 'PLAYER';
		p2.scoringElements.paper.innerText = this.id;
		p2.scoringElements.scissors.innerText = 'WINS';
		p2.scoringElements.paper.style.fontWeight = 900;

		this.elements.rock.classList.add('btn-success');
		this.elements.paper.classList.add('btn-success');
		this.elements.scissors.classList.add('btn-success');
	}
	this.scoreLayout = ()=> {
		let scoreLayout = Math.floor(Math.random() * 6);
		switch (scoreLayout) {
			case 0:
				this.scoring = { rock: 1, paper: 2, scissors: 3, all: [] };
				break;
			case 1:
				this.scoring = { rock: 1, paper: 3, scissors: 2, all: [] };
				break;
			case 2:
				this.scoring = { rock: 2, paper: 1, scissors: 3, all: [] };
				break;
			case 3:
				this.scoring = { rock: 2, paper: 3, scissors: 1, all: [] };
				break;
			case 4:
				this.scoring = { rock: 3, paper: 1, scissors: 2, all: [] };
				break;
			case 5:
				this.scoring = { rock: 3, paper: 2, scissors: 1, all: [] };
				break;
		}
		this.scoring.all = [ this.scoring.rock, this.scoring.paper, this.scoring.scissors ];
	}
}

function Display() {
	this.rounds = 0;
	this.elements = {
		score: document.getElementById('score-text'),
		round: document.getElementById('round-text'),
		rock: document.getElementById('rock-score'),
		paper: document.getElementById('paper-score'),
		scissors: document.getElementById('scissors-score')
	};
	this.elements.all = [ this.elements.rock, this.elements.paper, this.elements.scissors ];
	this.audioWin = new Audio('audio/Whpsh.m4a');

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
	
	// - Player 2 button inputs
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
		p1.gameWinner();
	} else if (p2.score >= 10) {
		p2.gameWinner();
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

// - Shake hands, show pts, show round is starting
function shakeHands() {
	p1.scoreLayout();
	p2.scoreLayout();

	// - Shake animation for each hand img over period of 1 sec
	for (let i = 0; i < 3; i++) {
		setTimeout(()=> {
			p1.scoringElements.all[i].innerText = `${p1.scoring.all[i]}pts`;
			p2.scoringElements.all[i].innerText = `${p2.scoring.all[i]}pts`;
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
	resetBtn.addEventListener('click', ()=>{ window.location = 'gameSplit.html' });
	backBtn.addEventListener('click', ()=>{ window.location = 'index.html' });
}


// - Bold winning hand pts value, flash Winner's hand button
function flashWinningPlayer(winningHand, losingHand, handScore) {
	handScore.style.fontWeight = 900;
	setTimeout(()=> { display.audioWin.play(); }, 250);

	winningHand.classList.remove('disabled');
	winningHand.classList.add('btn-success');
	losingHand.classList.remove('disabled');
	losingHand.classList.add('btn-danger');

	setTimeout(()=> { winningHand.classList.add('btn-outline-success'); }, 500);
	setTimeout(()=> { winningHand.classList.remove('btn-outline-success'); }, 1000);
	setTimeout(()=> { winningHand.classList.add('btn-outline-success'); }, 1500);
	setTimeout(()=> {
		winningHand.classList.remove('btn-outline-success');
		handScore.style.fontWeight = 400;
	}, 2000);

	// - Prepare for next round
	setTimeout(()=> {
		winningHand.classList.remove('btn-success');
		losingHand.classList.remove('btn-danger');
	}, 2500)
}

// - Both hands briefly flash
function flashTie(p1Hand, p2Hand) {
	p1Hand.classList.remove('disabled');
	console.log(document.querySelectorAll('img'));
	p2Hand.classList.remove('disabled');

	//TODO - Hide the other hand images, only show the hand that the players chose
	setTimeout(()=> { p1Hand.classList.add('btn-outline-secondary'); }, 500);
	setTimeout(()=> { p2Hand.classList.add('btn-outline-secondary'); }, 500);
	setTimeout(()=> { p1Hand.classList.remove('btn-outline-secondary'); }, 1000);
	setTimeout(()=> { p2Hand.classList.remove('btn-outline-secondary'); }, 1000);
}

// - Determine winner, apply points
function scoreRound() {
	switch (p1.choice) {
		case 'q':
			if (p2.choice == 'i') {
				flashTie(p1.elements.rock, p2.elements.rock);
			} else if (p2.choice == 'o') {
				p2.score += p2.scoring.paper;
				flashWinningPlayer(p2.elements.paper, p1.elements.rock, p2.scoringElements.paper);
			} else {
				p1.score += p1.scoring.rock;
				flashWinningPlayer(p1.elements.rock, p2.elements.scissors, p1.scoringElements.rock);
			}
			break;
		case 'w':
			if (p2.choice == 'i') {
				p1.score += p1.scoring.paper;
				flashWinningPlayer(p1.elements.paper, p2.elements.rock, p1.scoringElements.paper);
			} else if (p2.choice == 'o') {
				flashTie(p1.elements.paper, p2.elements.paper);
			} else {
				p2.score += p2.scoring.scissors;
				flashWinningPlayer(p2.elements.scissors, p1.elements.paper, p2.scoringElements.scissors);
			}
			break;
		case 'e':
			if (p2.choice == 'i') {
				p2.score += p2.scoring.rock;
				flashWinningPlayer(p2.elements.rock, p1.elements.scissors, p2.scoringElements.rock);
			} else if (p2.choice == 'o') {
				p1.score += p1.scoring.scissors;
				flashWinningPlayer(p1.elements.scissors, p2.elements.paper, p1.scoringElements.scissors);
			} else {
				flashTie(p1.elements.scissors, p2.elements.scissors);
			}
			break;
	}

	setTimeout(()=> {
		display.elements.score.innerHTML = '<span class="bigger-text">' + p1.score + '</span> vs <span class="bigger-text">' + p2.score + '</span';
		startRound();
	}, 2500);
}

// - Create player and display objects
let p1 = new Player(1);
let p2 = new Player(2);
let display = new Display();

// - Start the game after a short delay
setTimeout(()=> { startRound() }, 333);