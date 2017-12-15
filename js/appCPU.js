console.log('JS works');

var audio = new Audio('audio/Slap.mp3');
var audioWin = new Audio('audio/Whpsh.m4a');
var audioLose = new Audio('audio/screech.mp3');
var audioWinGame = new Audio('audio/ohyeah.wav');

var p1Score = 0;
var p2Score = 0;
var rounds = 0;
var p1Choice = '';
var p2Choice = '';
var p1Listener = false;

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
	twoRock.classList.add('disabled');
	twoPaper.classList.add('disabled');
	twoScissors.classList.add('disabled');

	// - Check if winner - else play!
	if (p1Score >= 15) {
		console.log('p1 wins the game');
		audioWinGame.play();
		p1Listener = false;

		oneRock.classList.add('btn-success');
		onePaper.classList.add('btn-success');
		oneScissors.classList.add('btn-success');

		rockScoreP.innerText = 'PLAYER';
		paperScoreP.innerText = '1';
		scisssorsScoreP.innerText = 'WINS';
		paperScoreP.style.fontWeight = 900;

		createButtons();
	} else if (p2Score >= 15) {
		console.log('CPU wins the game');
		audioLose.play();
		p1Listener = false;

		twoRock.classList.add('btn-success');
		twoPaper.classList.add('btn-success');
		twoScissors.classList.add('btn-success');

		rockScoreP.innerText = 'COMPUTER';
		paperScoreP.innerText = 'PLAYER';
		scisssorsScoreP.innerText = 'WINS';
		paperScoreP.style.fontWeight = 900;

		createButtons();
	} else {
		//Rock, Paper, Scissors!
		p1Listener = true;
		shakeHands();
	}
}

// - Shake hands, show pts, show round is starting
function shakeHands() {
	rockScore = Math.floor((Math.random() * 6) + 1);
	paperScore = Math.floor((Math.random() * 6) + 1);
	scissorsScore = Math.floor((Math.random() * 6) + 1);
	audio = new Audio('audio/Slap.mp3');
	console.log(rockScore + ' ' + paperScore + ' ' + scissorsScore);

	document.querySelectorAll('img')[0].style.animation = 'upDown .33s';
	rockScoreP.innerText = rockScore + 'pts';
	audio.play();
	setTimeout(function() {
		document.querySelectorAll('img')[1].style.animation = 'upDown .33s';
		paperScoreP.innerText = paperScore + 'pts';
		audio = new Audio('audio/Slap.mp3');
		audio.play();
	}, 333);
	setTimeout(function() {
		document.querySelectorAll('img')[2].style.animation = 'upDown .33s';
		scisssorsScoreP.innerText = scissorsScore + 'pts';
		audio = new Audio('audio/Slap.mp3');
		audio.play();
	}, 666);
	setTimeout(function() { 
		for (let i = 0; i < 3; i++) {
			document.querySelectorAll('img')[i].style.animation = '';
		}
	}, 1000);
}

// - Disable p1 inputs, score if p2 ready
function disableOne() {
	oneRock.classList.add('disabled');
	onePaper.classList.add('disabled');
	oneScissors.classList.add('disabled');
	p1Listener = false;
	cpuLogic();
}


// - Decides CPU choice
function cpuLogic() {
	// - Decision making is based on random #1-6, selects one of the hand pts
	var logicNum = Math.floor(Math.random() * 3);
	var lowPts, midPts, highPts;

	if ((rockScore >= paperScore) && (rockScore >= scissorsScore)) {
		highPts = rockScore;
		p2Choice = 'i';
		if (paperScore >= scissorsScore) {
			midPts = paperScore;
			lowPts = scissorsScore;
		} else {
			lowPts = paperScore;
			midPts = scissorsScore;
		}
	} else if ((paperScore >= rockScore) && (paperScore >= scissorsScore)) {
		highPts = paperScore;
		p2Choice = 'o';

		if (rockScore >= scissorsScore) {
			midPts = rockScore;
			lowPts = scissorsScore;
		} else {
			lowPts = rockScore;
			midPts = scissorsScore;
		}
	} else if ((scissorsScore >= rockScore) && (scissorsScore >= paperScore)) {
		highPts = scissorsScore;
		p2Choice = 'p';

		if (rockScore >= paperScore) {
			midPts = rockScore;
			lowPts = paperScore;
		} else {
			lowPts = rockScore;
			midPts = paperScore;
		}
	}
	console.log(lowPts + ' ' + midPts + ' ' + highPts + ' ' + p2Choice);

	switch (logicNum) {
		case 0:
			logicNum = rockScore;
			break;
		case 1:
			logicNum = paperScore;
			break;
		case 2:
			logicNum = scissorsScore;
			break;
	}
	console.log('logicNum ' + logicNum);

	switch (logicNum) {
		case 1: 	// - Automatically lose
			if (p1Choice == 'q') {
				p2Choice = 'p';
			} else if (p1Choice == 'w') {
				p2Choice = 'i';
			} else {
				p2Choice = 'o';
			}
			break;
		case 2: 	// - Goes for lowest points
			if (lowPts == rockScore) {
				p2Choice = 'i';
			} else if (lowPts == paperScore) {
				p2Choice = 'o';
			} else {
				p2Choice = 'p';
			}
			break;
		case 3: 	// - Goes for median points
			if (midPts == rockScore) {
				p2Choice = 'i';
			} else if (midPts == paperScore) {
				p2Choice = 'o';
			} else {
				p2Choice = 'p';
			}
			break;
		case 4: 	// - Goes for highest points
			if (highPts == rockScore) {
				p2Choice = 'i';
			} else if (highPts == paperScore) {
				p2Choice = 'o';
			} else {
				p2Choice = 'p';
			}
			break;
		case 5: 	// - Goes for hand that beats highest
			if (highPts == rockScore) {
				p2Choice = 'o';
			} else if (highPts == paperScore) {
				p2Choice = 'p';
			} else {
				p2Choice = 'i';
			}
			break;
		case 6: 	// - Automatically win
			if (p1Choice == 'q') {
				p2Choice = 'o';
			} else if (p1Choice == 'w') {
				p2Choice = 'p';
			} else {
				p2Choice = 'i';
			}
			break;
	}

	scoreRound();
}


// - Create Back & Reset buttons
function createButtons() {
	var resetButtons = document.getElementById('reset-buttons');
	var resetBtn = document.createElement('button');
	var backBtn = document.createElement('button');

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
	resetBtn.addEventListener('click', function(){ window.location = 'vsCPU.html' });
	backBtn.addEventListener('click', function(){ window.location = 'index.html' });
}


// - Bold winning hand pts value, flash Winner's hand button
function flashWinningP(winningHand, losingHand, handScore) {
	handScore.style.fontWeight = 900;
	setTimeout(function() { audioWin.play(); }, 250);

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
				p1Choice = keyName;
				disableOne();
				break;
		}
	}
});

// - Click Listeners
oneRock.addEventListener('click', function() {
	if (p1Listener) {
		p1Choice = 'q';
		disableOne();
	}
});
onePaper.addEventListener('click', function() {
	if (p1Listener) {
		p1Choice = 'w';
		disableOne();
	}
});
oneScissors.addEventListener('click', function() {
	if (p1Listener) {
		p1Choice = 'e';
		disableOne();
	}
});


// - Start the game (after a short delay, and after audio loads)
setTimeout(function() { audio.addEventListener("canplay", startRound()); }, 333);
