# RICKY // PAPER // SCISSORS

## [PLAY ME](https://rickytranmer.github.io/wdi-project-1/)

[Trello](https://trello.com/b/enXXdmEj/wdi-6-project-1) & [Wireframes](https://drive.google.com/open?id=1szioAdYoNQNIWoCWDdpcaTEwnO5-bF2E)

## A Twist on a Classic
Most of today's 2D fighters still rely on some form of Rock, Paper, Scissors (Attack, Block, Grab).  The option a player chooses is based on weighted criteria.  This game seeks to bring that idea to its simplest form.  Your choices will have different point values (1-6 / standard dice roll), but your opponent will know them, too.  Play ends when a player reaches 15 points.

### Weighted Options
Should you pick the hand worth the most points?  What if your opponent guesses (or 'reads') your option?  This dynamic is opened up even more in the separate scoring mode.  Each player will have their own point values they could earn.  Now the question is do you go for your big points, or block your opponent's?

### Development
This game uses HTML, CSS, JS, & Bootstrap.  This project gave excellent practice for generating and sticking to User Stories, SCRUM meeting participation, & agile development.

### Inspiration
I came up with the idea for this game while trying to think of simplifying the fighting game idea of [Yomi](http://forums.shoryuken.com/discussion/113407/yomi-thread-yomi-the-japanese-word-for-reading-the-mind-of-your-opponent).  That link is for a card game, but the logic translates well to fighting games.  Yomi itself if based on fighting game concepts.

### CPU Logic
Rather than choose a random hand, the CPU will base it's decision on the point values available.  It selecets one of the point values to determine which 'logicNum' to use.  You can use this tiny bit of information to choose the best hand each round.
	- 1) automatically lose
	- 2) go for the lowest pts
	- 3) go for the median pts
	- 4) go for the highest pts
	- 5) go for the hand that beats the highest pts
	- 6) automatically lose