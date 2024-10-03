<script>
       class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.isFaceUp = false; 
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
        cardElement.textContent = this.isFaceUp ? `${this.suit} ${this.value}` : 'lick'; 
        cardElement.classList.toggle('flipped', !this.isFaceUp); 
    }

    discard(discardPileElement) {
        const discardedCardElement = this.createCardElement();
        discardPileElement.innerHTML = '';
        discardPileElement.appendChild(discardedCardElement);
    }
}


        class Deck {
    constructor() {
        this.cards = [];
        this.currentCard = null; /
        this.loadCards();
    }

    loadCards() {
        const cardData = [
            { "suit": "♥", "value": "7", "color": "red" },
            { "suit": "♥", "value": "8", "color": "red" },
            { "suit": "♥", "value": "9", "color": "red" },
            { "suit": "♥", "value": "10", "color": "red" },
            { "suit": "♥", "value": "J", "color": "red" },
            { "suit": "♥", "value": "Q", "color": "red" },
            { "suit": "♥", "value": "K", "color": "red" },
            { "suit": "♥", "value": "A", "color": "red" },

            { "suit": "♦", "value": "7", "color": "red" },
            { "suit": "♦", "value": "8", "color": "red" },
            { "suit": "♦", "value": "9", "color": "red" },
            { "suit": "♦", "value": "10", "color": "red" },
            { "suit": "♦", "value": "J", "color": "red" },
            { "suit": "♦", "value": "Q", "color": "red" },
            { "suit": "♦", "value": "K", "color": "red" },
            { "suit": "♦", "value": "A", "color": "red" },

            { "suit": "♠", "value": "7", "color": "black" },
            { "suit": "♠", "value": "8", "color": "black" },
            { "suit": "♠", "value": "9", "color": "black" },
            { "suit": "♠", "value": "10", "color": "black" },
            { "suit": "♠", "value": "J", "color": "black" },
            { "suit": "♠", "value": "Q", "color": "black" },
            { "suit": "♠", "value": "K", "color": "black" },
            { "suit": "♠", "value": "A", "color": "black" },

            { "suit": "♣", "value": "7", "color": "black" },
            { "suit": "♣", "value": "8", "color": "black" },
            { "suit": "♣", "value": "9", "color": "black" },
            { "suit": "♣", "value": "10", "color": "black" },
            { "suit": "♣", "value": "J", "color": "black" },
            { "suit": "♣", "value": "Q", "color": "black" },
            { "suit": "♣", "value": "K", "color": "black" },
            { "suit": "♣", "value": "A", "color": "black" }
        ];

        this.cards = cardData.map(card => new Card(card.suit, card.value));
    }

    drawCard() {
        if (this.cards.length > 0) {
            // Uložíme aktuální kartu
            this.currentCard = this.cards[this.cards.length - 1]; 
            const drawnCard = this.cards.pop(); 

            
         
            const cardElement = drawnCard.createCardElement();
            const deckElement = document.getElementById('deck');
            deckElement.innerHTML = ''; 
            deckElement.appendChild(cardElement);
            cardElement.classList.add('dealt')

            setTimeout(() => {
                cardElement.classList.remove('dealt');
            }, 100);

            return drawnCard;
        } else {
            alert("Lízací balíček je prázdný!");
            return null;
        }
    }
}


class Player {
    constructor(discard) {
        this.hand = [];
        this.discard = discard;
    }

    addCardToHand(card) {
        if (card) {
            this.hand.push(card);
            console.log(card)
            card.flip(); 
        }
    }

    discardCard(card, discardPile) {
        const index = this.hand.indexOf(card);
        if (index > -1) {
            this.hand.splice(index, 1);
            card.discard(discardPile); 
            this.discard.addDrawnCard(card);
            logGameState();
        }
    }
}


class Discard {
    constructor() {
        this.drawnCards = [];
    }

    addDrawnCard(card) {
        card.flip();
        this.drawnCards.push(card);
    }
}


        const deck = new Deck();
        const discard = new Discard();
        const player = new Player(discard);
        const discardPileElement = document.getElementById('discard-pile');

        logGameState();
        document.getElementById('deck').addEventListener('click', () => {
            const card = deck.drawCard();
            if (card) {
                player.addCardToHand(card);
                const cardElement = card.createCardElement();
                cardElement.addEventListener('click', () => {
                    player.discardCard(card, discardPileElement);
                    updatePlayerHandUI();
                });
                updatePlayerHandUI(cardElement);
                logGameState();
            }
        });

        function updatePlayerHandUI() {
    const playerHandElement = document.getElementById('player-hand');
    playerHandElement.innerHTML = '';
    player.hand.forEach(card => {
        const cardElement = card.createCardElement();
        playerHandElement.appendChild(cardElement);
        cardElement.addEventListener('click', () => {
            player.discardCard(card, discardPileElement);
            updatePlayerHandUI();
        });
    });
}


        function logGameState() {
            console.log("Karty v ruce hráče:", player.hand.map(card => `${card.suit} ${card.value}`).join(", "));
            console.log("Karty v balíčku:", deck.cards.map(card => `${card.suit} ${card.value}`).join(", ") || "Prázdný balíček");
            console.log("Odhozené karty:", discard.drawnCards.map(card => `${card.suit} ${card.value}`).join(", ") || "Žádné odhozené karty");
        }
    </script>
