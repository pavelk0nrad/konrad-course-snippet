
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.isFaceUp = false; // Výchozí stav
    }

    flip() {
        this.isFaceUp = !this.isFaceUp;
    }

    createCardElement() {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        this.updateCardDisplay(cardDiv);
        return cardDiv;
    }

    updateCardDisplay(cardElement) {
        cardElement.textContent = this.isFaceUp ? `${this.suit} ${this.value}` : '';
        cardElement.classList.toggle('flipped', !this.isFaceUp);
    }
}

class Deck {
    constructor() {
        this.cards = [];
        this.loadCards();
        this.shuffle();
    }

    loadCards() {
        const suits = ["♥", "♦", "♠", "♣"];
        const values = ["7", "8", "9", "10", "J", "Q", "K", "A"];
        this.cards = suits.flatMap(suit => values.map(value => new Card(suit, value)));
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    drawCard() {
        if (this.cards.length === 0) {
            alert("Karty v balíčku došly! Přesouvám karty z odhazovacího balíčku.");
            this.refillFromDiscardPile();
        }
        return this.cards.pop();
    }

    refillFromDiscardPile() {
        const discardPileElement = document.getElementById('discard-pile');
        const discardedCard = game.discardPile.card;

        if (discardedCard) {
            this.cards = [discardedCard, ...game.discardPile.previousCards.reverse()];
            game.discardPile.clear();
        } else {
            alert("Žádné karty v odhazovacím balíčku!");
        }
    }
}


class DiscardPile {
    constructor() {
        this.card = null;
        this.previousCards = [];
    }

    discard(card) {
        if (this.card) {
            this.previousCards.push(this.card); // Uloží aktuální kartu do historie
        }
        this.card = card;
        card.isFaceUp = true; // Karty v odhazovacím balíčku jsou vždy viditelné
        this.displayDiscardedCard();
    }

    displayDiscardedCard() {
        const discardPile = document.getElementById('discard-pile');
        discardPile.innerHTML = '';
        if (this.card) {
            const cardElement = this.card.createCardElement();
            discardPile.appendChild(cardElement);
        }
    }

    clear() {
        this.card = null;
        this.previousCards = [];
        this.displayDiscardedCard();
    }
}


class Player {
    constructor(discardPile, isAI = false) {
        this.hand = [];
        this.discardPile = discardPile;
        this.isAI = isAI;
    }

    addCard(card) {
        if (!this.isAI) card.isFaceUp = true; // Karty hráče jsou viditelné
        this.hand.push(card);

        const handElement = this.isAI ? document.getElementById('enemy-hand') : document.getElementById('player-hand');
        const cardElement = card.createCardElement();

        if (!this.isAI) {
            cardElement.addEventListener('click', () => this.playCard(card, cardElement));
        }

        handElement.appendChild(cardElement);
    }

    playCard(card, cardElement) {
    const topCard = this.discardPile.card;

    if (!topCard || card.suit === topCard.suit || card.value === topCard.value) {
        this.discardPile.discard(card);
        this.hand.splice(this.hand.indexOf(card), 1);
        cardElement.remove();

        if (this.hand.length === 0) {
            game.stateDisplay.showWinner(this.isAI ? 'enemy' : 'player');
            setTimeout(() => location.reload(), 2000);
        } else {
            game.endTurn();
        }
    } else {
        game.stateDisplay.updateState("Nemůžeš hrát touto kartou!");
    }
}

}
class GameStateDisplay {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
    }

    updateState(message) {
        this.element.textContent = message;
        this.element.style.color = message.includes("Nemůžeš hrát") ? "red" : "black";
    }

    showWinner(winner) {
        this.updateState(winner === 'player' ? 'Vyhrál jsi!' : 'Nepřítel vyhrál!');
        this.element.style.color = "green";
    }
}

class Game {
    constructor() {
        this.deck = new Deck();
        this.discardPile = new DiscardPile();
        this.player = new Player(this.discardPile, false);
        this.enemy = new Player(this.discardPile, true);
        this.isPlayerTurn = true;
        this.stateDisplay = new GameStateDisplay('game-state'); // Instance GameStateDisplay

        this.init();
    }

    init() {
        for (let i = 0; i < 4; i++) {
            this.player.addCard(this.deck.drawCard());
            this.enemy.addCard(this.deck.drawCard());
        }

        const firstCard = this.deck.drawCard();
        if (firstCard) {
            firstCard.isFaceUp = true; // První karta v odhazovacím balíčku je viditelná
            this.discardPile.discard(firstCard);
        }

        document.getElementById('deck').addEventListener('click', () => this.playerDrawCard());
        this.updateTurnIndicator();
    }

    playerDrawCard() {
        if (!this.isPlayerTurn) return;
        const card = this.deck.drawCard();
        if (card) this.player.addCard(card);
        this.endTurn();
    }

    enemyTurn() {
        const topCard = this.discardPile.card;

        const playableCard = this.enemy.hand.find(card => card.suit === topCard.suit || card.value === topCard.value);
        if (playableCard) {
            const cardElement = document.querySelector(`#enemy-hand .card:nth-child(${this.enemy.hand.indexOf(playableCard) + 1})`);
            this.enemy.playCard(playableCard, cardElement);
        } else {
            const card = this.deck.drawCard();
            if (card) this.enemy.addCard(card);
        }

        this.isPlayerTurn = true;
        this.updateTurnIndicator();
    }

    endTurn() {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.updateTurnIndicator();

        if (!this.isPlayerTurn) {
            setTimeout(() => this.enemyTurn(), 1000);
        }
    }

    updateTurnIndicator() {
        if (this.isPlayerTurn) {
            this.stateDisplay.updateState('Hráč je na tahu.');
        } else {
            this.stateDisplay.updateState('Nepřítel je na tahu.');
        }
    }
}

// Spuštění hry
const game = new Game();
