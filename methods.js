// Instantiate classes using pseudoclassical pattern 
var playingCards = function() {
  this.deck = [];
  this.dealtCards = {};
}

// Create a new deck of 52 cards 
playingCards.prototype.createDeck = function() {
  var face = 'A23456789TJQK';
  var suit = 'hcds';
  for (var s = 0; s < suit.length; s++) {
    for (var f = 0; f < face.length; f++) {
      this.deck.push(face[f] + suit[s]);
    }
  }
  return this.deck;
}

// Shuffle existing deck 
playingCards.prototype.shuffleDeck = function() {
  var currentIndex = this.countDeck();
  var tempValue;
  var randomIndex;
  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex--);
    tempValue = this.deck[currentIndex];
    this.deck[currentIndex] = this.deck[randomIndex];
    this.deck[randomIndex] = tempValue;
  }
  return this.cards;
}

// Randomly draw a card from the deck 
playingCards.prototype.drawCard = function() {
  var randomCard = Math.floor(Math.random() * 52);
  return this.deck.splice(randomCard, 1)[0]; 
}

// Add a card back into the deck 
playingCards.prototype.addCard = function(card) {
  this.deck.push(card);
}

// Count the number of cards in the deck 
playingCards.prototype.countDeck = function() {
  return this.deck.length; 
}

// Calculate a particular card's value 
// This assumes that Aces are a value of 10 
playingCards.prototype.calculateValue = function(card) {
  var face = card[0];
  if (!isNaN(face)) {
    return Number(face);
  } else {
    return 10;
  }
}

// Compare two cards and return the higher value card
// If the card values are equal, return 'same'
playingCards.prototype.compareCards = function(card1, card2) {
  var face1 = this.calculateValue(card1);
  var face2 = this.calculateValue(card2);
  if (face1 === face2) {
    return 'same';
  } else {
    return face1 > face2 ? card1 : card2;
  }
}

// Deals cards from the deck according to number of players and desired cards per player
playingCards.prototype.dealCards = function(numPlayers, numCards) {
  var playerCards = [];
  for (var i = 0; i < numPlayers; i++) {
    for (var j = 0; j < numCards; j++) {
      var newCard = this.drawCard(); 
      playerCards.push(newCard); 
    }
    this.dealtCards['Player ' + (i + 1)] = playerCards;
    playerCards = [];
  }
  return this.dealtCards;  
}

// Resets the dealt cards and creates a new deck of cards 
playingCards.prototype.resetDeck = function() {
  this.dealtCards = {}; 
  return this.createDeck(); 
}

