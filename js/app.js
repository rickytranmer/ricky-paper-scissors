console.log('JS works');

var p1Score = 0;
var p2Score = 0;
var rounds = 0;
var p1Choice = 'd';
var p2Choice = 'd';
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
	randomPoints();
	//Rock, Paper, Scissors!
	p1Listener = true;
	p2Listener = true;
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

// - Disable player one inputs
function disableOne() {
	oneRock.classList.add('disabled');
	onePaper.classList.add('disabled');
	oneScissors.classList.add('disabled');
	p1Listener = false;
}

// - Disable player two inputs
function disableTwo() {
	twoRock.classList.add('disabled');
	twoPaper.classList.add('disabled');
	twoScissors.classList.add('disabled');
	p2Listener = false;
}

function flashWinningP(winningHand, losingHand) {
	winningHand.classList.remove('disabled');
	winningHand.classList.add('btn-success');
	losingHand.classList.remove('disabled');
	losingHand.classList.add('btn-danger');

	setTimeout(function() { winningHand.classList.add('btn-outline-success'); }, 500);
	setTimeout(function() { winningHand.classList.remove('btn-outline-success'); }, 1000);
	setTimeout(function() { winningHand.classList.add('btn-outline-success'); }, 1500);
	setTimeout(function() { winningHand.classList.remove('btn-outline-success'); }, 2000);
}

function flashTie(p1Hand, p2Hand) {
	p1Hand.classList.remove('disabled');
	p2Hand.classList.remove('disabled');
	
	setTimeout(function() { p1Hand.classList.add('btn-outline-secondary'); }, 500);
	setTimeout(function() { p1Hand.classList.remove('btn-outline-secondary'); }, 1000);
	setTimeout(function() { p2Hand.classList.add('btn-outline-secondary'); }, 500);
	setTimeout(function() { p2Hand.classList.remove('btn-outline-secondary'); }, 1000);
}

// -
function scoreRound(){
	switch (p1Choice) {
		case 'q':
			if (p2Choice == 'i') {
				flashTie(oneRock, twoRock);
			} else if (p2Choice == 'o') {
				p2Score += paperScore;
				flashWinningP(twoPaper, oneRock);
			} else {
				p1Score += rockScore;
				flashWinningP(oneRock, twoScissors);
			}
			break;
		case 'w':
			if (p2Choice == 'i') {
				p1Score += paperScore;
				flashWinningP(onePaper, twoRock);
			} else if (p2Choice == 'o') {
				flashTie(onePaper, twoPaper);
			} else {
				p2Score += scissorsScore;
				flashWinningP(twoScissors,onePaper);
			}
			break;
		case 'e':
			if (p2Choice == 'i') {
				p2Score += rockScore;
				flashWinningP(twoRock, oneScissors);
			} else if (p2Choice == 'o') {
				p1Score += scissorsScore;
				flashWinningP(oneScissors, twoPaper);
			} else {
				flashTie(oneScissors, twoScissors);
			}
			break;
	}

	// - Print new score
	scoreText.innerHTML = '<span class="bigger-text">' + p1Score + '</span> vs <span class="bigger-text">' + p2Score + '</span';
}

// Key Listener
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
		if (!p2Listener) {
			console.log('p2 finished first');
			scoreRound();
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
		if (!p1Listener) {
			console.log('p1 finished first');
			scoreRound();
		}
	}

	console.log(p1Choice + ' ' + p2Choice);
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
