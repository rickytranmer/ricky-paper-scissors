console.log('JS works');

var audio = new Audio('audio/Slap.mp3'); //http://soundbible.com/2047-Banana-Slap.html
var audioWin = new Audio('audio/Whpsh.m4a');
var audioLose = new Audio('audio/screech.mp3');

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

var rockScoreP1 = document.getElementById('rock-score1');
var paperScoreP1 = document.getElementById('paper-score1');
var scisssorsScoreP1 = document.getElementById('scissors-score1');
var rockScore1, paperScore1, scissorsScore1 = 1;
console.log(rockScoreP1);
console.log(paperScoreP1);
console.log(scisssorsScoreP1);

var rockScoreP2 = document.getElementById('rock-score2');
var paperScoreP2 = document.getElementById('paper-score2');
var scisssorsScoreP2 = document.getElementById('scissors-score2');
var rockScore2, paperScore2, scissorsScore2 = 1;
console.log(rockScoreP2);
console.log(paperScoreP2);
console.log(scisssorsScoreP2);

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
		oneRock.classList.add('btn-success');
		onePaper.classList.add('btn-success');
		oneScissors.classList.add('btn-success');
		p1Listener = false;

		rockScoreP1.innerText = 'PLAYER';
		paperScoreP1.innerText = '1';
		scisssorsScoreP1.innerText = 'WINS';
		paperScoreP1.style.fontWeight = 900;

		rockScoreP2.innerText = 'PLAYER';
		paperScoreP2.innerText = '1';
		scisssorsScoreP2.innerText = 'WINS';
		paperScoreP2.style.fontWeight = 900;

		createButtons();
	} else if (p2Score >= 15) {
		console.log('CPU wins the game');
		audioLose.play();
		p1Listener = false;

		twoRock.classList.add('btn-success');
		twoPaper.classList.add('btn-success');
		twoScissors.classList.add('btn-success');

		rockScoreP1.innerText = 'PLAYER';
		paperScoreP1.innerText = '2';
		scisssorsScoreP1.innerText = 'WINS';
		paperScoreP1.style.fontWeight = 900;

		rockScoreP2.innerText = 'PLAYER';
		paperScoreP2.innerText = '2';
		scisssorsScoreP2.innerText = 'WINS';
		paperScoreP2.style.fontWeight = 900;

		createButtons();
	} else {
		//Rock, Paper, Scissors!
		p1Listener = true;
		shakeHands();
	}
}

// - Shake hands, show pts, show round is starting
function shakeHands() {
	rockScore1 = Math.floor((Math.random() * 6) + 1);
	paperScore1 = Math.floor((Math.random() * 6) + 1);
	scissorsScore1 = Math.floor((Math.random() * 6) + 1);
	rockScore2 = Math.floor((Math.random() * 6) + 1);
	paperScore2 = Math.floor((Math.random() * 6) + 1);
	scissorsScore2 = Math.floor((Math.random() * 6) + 1);
	audio = new Audio('audio/Slap.mp3');
	
	document.querySelectorAll('img')[0].style.animation = 'upDown .33s';
	document.querySelectorAll('img')[3].style.animation = 'upDown .33s';
	rockScoreP1.innerText = rockScore1 + 'pts';
	rockScoreP2.innerText = rockScore2 + 'pts';
	audio.play();

	setTimeout(function() {
		audio = new Audio('audio/Slap.mp3');
		document.querySelectorAll('img')[1].style.animation = 'upDown .33s';
		document.querySelectorAll('img')[4].style.animation = 'upDown .33s';
		paperScoreP1.innerText = paperScore1 + 'pts';
		paperScoreP2.innerText = paperScore2 + 'pts';
		audio.play();
	}, 333);
	setTimeout(function() {
		audio = new Audio('audio/Slap.mp3');
		document.querySelectorAll('img')[2].style.animation = 'upDown .33s';
		document.querySelectorAll('img')[5].style.animation = 'upDown .33s';
		scisssorsScoreP1.innerText = scissorsScore1 + 'pts';
		scisssorsScoreP2.innerText = scissorsScore2 + 'pts';
		audio.play();
	}, 666);
	setTimeout(function() { 
		for (let i = 0; i < 6; i++) {
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


//TODO - CPU Logic
function cpuLogic() {
	var lowPts1, midPts1, highPts1;
	var lowPts2, midPts2, highPts2;
	// - Assign logicNum (select from pts values), which determines thought process
	var logicNum = Math.floor(Math.random() * 6);
	switch (logicNum) {
		case 0:
			logicNum = rockScore1;
			break;
		case 1:
			logicNum = paperScore1;
			break;
		case 2:
			logicNum = scissorsScore1;
			break;
		case 3:
			logicNum = rockScore2;
			break;
		case 4:
			logicNum = paperScore2;
			break;
		case 5:
			logicNum = scissorsScore2;
			break;
	}
	console.log('logicNum ' + logicNum);

	if ((rockScore1 >= paperScore1) && (rockScore1 >= scissorsScore1)) {
		highPts1 = rockScore1;		if (paperScore1 >= scissorsScore1) {
			midPts1 = paperScore1;
			lowPts1 = scissorsScore1;
		} else {
			lowPts1 = paperScore1;
			midPts1 = scissorsScore1;
		}
	} else if ((paperScore1 >= rockScore1) && (paperScore1 >= scissorsScore1)) {
		highPts1 = paperScore1;
		if (rockScore1 >= scissorsScore1) {
			midPts1 = rockScore1;
			lowPts1 = scissorsScore1;
		} else {
			lowPts1 = rockScore1;
			midPts1 = scissorsScore1;
		}
	} else if ((scissorsScore1 >= rockScore1) && (scissorsScore1 >= paperScore1)) {
		highPts1 = scissorsScore1;
		if (rockScore1 >= paperScore1) {
			midPts1 = rockScore1;
			lowPts1 = paperScore1;
		} else {
			lowPts1 = rockScore1;
			midPts1 = paperScore1;
		}
	}
	if ((rockScore2 >= paperScore2) && (rockScore2 >= scissorsScore2)) {
		highPts2 = rockScore2;		if (paperScore2 >= scissorsScore2) {
			midPts2 = paperScore2;
			lowPts2 = scissorsScore2;
		} else {
			lowPts2 = paperScore2;
			midPts2 = scissorsScore2;
		}
	} else if ((paperScore2 >= rockScore2) && (paperScore2 >= scissorsScore2)) {
		highPts2 = paperScore2;
		if (rockScore2 >= scissorsScore2) {
			midPts2 = rockScore2;
			lowPts2 = scissorsScore2;
		} else {
			lowPts2 = rockScore2;
			midPts2 = scissorsScore2;
		}
	} else if ((scissorsScore2 >= rockScore2) && (scissorsScore2 >= paperScore2)) {
		highPts2 = scissorsScore2;
		if (rockScore2 >= paperScore2) {
			midPts2 = rockScore2;
			lowPts2 = paperScore2;
		} else {
			lowPts2 = rockScore2;
			midPts2 = paperScore2;
		}
	}

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
		case 2: 	// - Go for p1 highest
			if (highPts1 == rockScore1) {
				p2Choice = 'i';
			} else if (highPts1 == paperScore1) {
				p2Choice = 'o';
			} else {
				p2Choice = 'p';
			}
			break;
		case 3: 	// - Go for cpu highest
			if (highPts2 == rockScore2) {
				p2Choice = 'i';
			} else if (highPts2 == paperScore2) {
				p2Choice = 'o';
			} else {
				p2Choice = 'p';
			}
			break;
		case 4: 	// - Beat p1 highest
			if (highPts1 == rockScore1) {
				p2Choice = 'o';
			} else if (highPts1 == paperScore1) {
				p2Choice = 'p';
			} else {
				p2Choice = 'i';
			}
			break;
		case 5: 	// - Beat cpu highest
			if (highPts2 == rockScore2) {
				p2Choice = 'o';
			} else if (highPts2 == paperScore2) {
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
	resetBtn.addEventListener('click', function(){ window.location = 'vsCPUsplit.html' });
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
				p2Score += paperScore2;
				flashWinningP(twoPaper, oneRock, paperScoreP2);
			} else {
				p1Score += rockScore1;
				flashWinningP(oneRock, twoScissors, rockScoreP1);
			}
			break;
		case 'w':
			if (p2Choice == 'i') {
				p1Score += paperScore1;
				flashWinningP(onePaper, twoRock, paperScoreP1);
			} else if (p2Choice == 'o') {
				flashTie(onePaper, twoPaper);
			} else {
				p2Score += scissorsScore2;
				flashWinningP(twoScissors, onePaper, scisssorsScoreP2);
			}
			break;
		case 'e':
			if (p2Choice == 'i') {
				p2Score += rockScore2;
				flashWinningP(twoRock, oneScissors, rockScoreP2);
			} else if (p2Choice == 'o') {
				p1Score += scissorsScore1;
				flashWinningP(oneScissors, twoPaper, scisssorsScoreP1);
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
