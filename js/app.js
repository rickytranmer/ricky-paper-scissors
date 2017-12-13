console.log('JS works');

var p1Score = 0;
var p2Score = 0;
var rounds = -1;
var p1Choice = '';
var p2Choice = '';
var p1Listener = false;
var p2Listener = false;

var scoreText = document.getElementById('score-text');
var roundText = document.getElementById('round-text');
console.log(scoreText);
console.log(roundText);

var rockScoreP = document.getElementById('rock-score');
var paperScoreP = document.getElementById('paper-score');
var scisssorsScoreP = document.getElementById('scissors-score');
var rockScore, paperScore, scissorsScore = 1;
console.log(rockScoreP);
console.log(paperScoreP);
console.log(scisssorsScoreP);

var oneRock = document.getElementById('one-rock');
var onePaper = document.getElementById('one-paper');
var oneScissors = document.getElementById('one-scissors');
console.log(oneRock);
console.log(onePaper);
console.log(oneScissors);

var twoRock = document.getElementById('two-rock');
var twoPaper = document.getElementById('two-paper');
var twoScissors = document.getElementById('two-scissors');
console.log(twoRock);
console.log(twoPaper);
console.log(twoScissors);

function startRound() {
	rounds++;
	roundText.innerText = rounds;
	
	// - Reset hand input classes
	oneRock.classList.remove('disabled');
	onePaper.classList.remove('disabled');
	oneScissors.classList.remove('disabled');
	twoRock.classList.remove('disabled');
	twoPaper.classList.remove('disabled');
	twoScissors.classList.remove('disabled');

	// - Check if winner - else play!
	if (p1Score >= 15) {
		console.log('p1 wins the game');
		oneRock.classList.add('btn-success');
		onePaper.classList.add('btn-success');
		oneScissors.classList.add('btn-success');

		rockScoreP.innerText = 'PLAYER';
		paperScoreP.innerText = '1';
		scisssorsScoreP.innerText = 'WINS';
		paperScoreP.style.fontWeight = 900;
	} else if (p2Score >= 15) {
		console.log('p1 wins the game');
		twoRock.classList.add('btn-success');
		twoPaper.classList.add('btn-success');
		twoScissors.classList.add('btn-success');

		rockScoreP.innerText = 'PLAYER';
		paperScoreP.innerText = '2';
		scisssorsScoreP.innerText = 'WINS';
		paperScoreP.style.fontWeight = 900;
	} else {
		//Rock, Paper, Scissors!
		p1Listener = true;
		p2Listener = true;
		randomPoints();
	}
}

// - Store 3 randoms in 3 score display <p>'s & 3 variables
function randomPoints() {
	rockScore = Math.floor((Math.random() * 5) + 1);
	paperScore = Math.floor((Math.random() * 5) + 1);
	scissorsScore = Math.floor((Math.random() * 5) + 1);
	console.log(rockScore + ' ' + paperScore + ' ' + scissorsScore);
	rockScoreP.innerText = rockScore + 'pts';
	paperScoreP.innerText = paperScore + 'pts';
	scisssorsScoreP.innerText = scissorsScore + 'pts';
}

// - Disable p1 inputs, score if p2 ready
function disableOne() {
	oneRock.classList.add('disabled');
	onePaper.classList.add('disabled');
	oneScissors.classList.add('disabled');
	p1Listener = false;

	if (!p2Listener) {
		console.log('p2 finished first');
		scoreRound();
	}
}

// - Disable p2 inputs, score if p1 ready
function disableTwo() {
	twoRock.classList.add('disabled');
	twoPaper.classList.add('disabled');
	twoScissors.classList.add('disabled');
	p2Listener = false;

	if (!p1Listener) {
		console.log('p1 finished first');
		scoreRound();
	}
}


// - Bold winning hand pts value, flash Winner's hand button
function flashWinningP(winningHand, losingHand, handScore) {
	handScore.style.fontWeight = 900;

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
	switch (p1Choice) {
		case 'q':
			if (p2Choice == 'i') {
				flashTie(oneRock, twoRock);
			} else if (p2Choice == 'o') {
				p2Score += paperScore;
				flashWinningP(twoPaper, oneRock, paperScoreP);
			} else {
				p1Score += rockScore;
				flashWinningP(oneRock, twoScissors, rockScoreP);
			}
			break;
		case 'w':
			if (p2Choice == 'i') {
				p1Score += paperScore;
				flashWinningP(onePaper, twoRock, paperScoreP);
			} else if (p2Choice == 'o') {
				flashTie(onePaper, twoPaper);
			} else {
				p2Score += scissorsScore;
				flashWinningP(twoScissors,onePaper, scisssorsScoreP);
			}
			break;
		case 'e':
			if (p2Choice == 'i') {
				p2Score += rockScore;
				flashWinningP(twoRock, oneScissors, rockScoreP);
			} else if (p2Choice == 'o') {
				p1Score += scissorsScore;
				flashWinningP(oneScissors, twoPaper, scisssorsScoreP);
			} else {
				flashTie(oneScissors, twoScissors);
			}
			break;
	}

	setTimeout(function() {
		scoreText.innerHTML = '<span class="bigger-text">' + p1Score + '</span> vs <span class="bigger-text">' + p2Score + '</span';
		startRound();
	}, 2500);
}

// - Key Listener
document.addEventListener('keyup', function(event) {
	const keyName = event.key;
	if ( p1Listener && ((keyName == 'q') || (keyName == 'w') || (keyName == 'e')) ) {
		console.log(keyName + ' pressed');
		switch (keyName) {
			case 'q':
			case 'w':
			case 'e':
				disableOne();
				p1Choice = keyName;
				break;
		}
	}

	if ( p2Listener && ((keyName == 'i') || (keyName == 'o') || (keyName == 'p')) ) {
		console.log(keyName + ' pressed');
		switch (keyName) {
			case 'i':
			case 'o':
			case 'p':
				disableTwo();
				p2Choice = keyName;
				break;
		}
	}
	if ((p1Choice) || (p2Choice)) {
		console.log(p1Choice + ' ' + p2Choice);
	} else {
		console.log('invalid input (caps lock?)');
	}
});

// - Click Listeners
	// Player 1
oneRock.addEventListener('click', function() {
	if (p1Listener) {
		p1Choice = 'q';
		disableOne();
	} else {
		console.log('p2 finished first');
		scoreRound();
	}
});
onePaper.addEventListener('click', function() {
	if (p1Listener) {
		p1Choice = 'w';
		disableOne();
	} else {
		console.log('p2 finished first');
		scoreRound();
	}
});
oneScissors.addEventListener('click', function() {
	if (p1Listener) {
		p1Choice = 'e';
		disableOne();
	} else {
		console.log('p2 finished first');
		scoreRound();
	}
});

	// Player 2
twoRock.addEventListener('click', function() {
	if (p2Listener) {
		p2Choice = 'i';
		disableTwo();
	} else {
		console.log('p1 finished first');
		scoreRound();
	}
});
twoPaper.addEventListener('click', function() {
	if (p2Listener) {
		p2Choice = 'o';
		disableTwo();
	} else {
		console.log('p1 finished first');
		scoreRound();
	}
});
twoScissors.addEventListener('click', function() {
	if (p2Listener) {
		disableTwo();
		p2Choice = 'p';
	} else {
		console.log('p1 finished first');
		scoreRound();
	}
});


startRound();


// TODO List - Functions
// - event listeners
// - ignore input
// - score after both input
// - score round
// - red for loser, green for winner
// - add pts, increase rounds



//score round
//randomize points
//event listener for buttons
//- remove ability to take in new inputs
	//index.html
//change 'active' if button is clicked
//event listener for start
