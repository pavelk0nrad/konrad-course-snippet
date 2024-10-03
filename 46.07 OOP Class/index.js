<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #2e8b57;
        }

        #game-board {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        #player-hand, #enemy-hand {
            display: flex;
            margin-top: 20px;
        }

        #deck, #discard-pile {
            width: 150px;
            height: 200px;
            background-color: #fff;
            margin: 20px;
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border: 2px solid black;
            position: relative;
        }

        .card {
            width: 100px;
            height: 150px;
            border: 2px solid #000;
            display: inline-block;
            text-align: center;
            line-height: 150px;
            margin: 5px;
            font-size: 24px;
            background-color: white;
            transition: transform 0.5s ease-in-out, opacity 0.5s ease;
            border-radius: 10px;
            cursor: pointer;
        }

        .flipped {
            background-color: lightgray;
        }

        .discarded-card {
            position: absolute;
            transition: transform 0.5s ease, opacity 0.5s ease;
            top: 0;
            left: 0;
        }
        .dealt {
            transform: translateY(5px);

        }
        .discard-animation {
        transform: translateY(-100px) rotate(15deg);
        opacity: 0;
        transition: transform 0.5s ease, opacity 0.5s ease;
        }
    </style>
</head>
<body>
    <div id="game-board">
        <div id="deck">Lízací balíček</div>
        <div id="discard-pile"></div>
        <div id="enemy-hand">Protihráč</div>
        <div id="player-hand">Hráčská ruka</div>
    </div>

    <script>
       class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
        this.isFaceUp = false; // Počáteční stav, karta je otočená dolů
    }

    flip() {
        this.isFaceUp = !this.isFaceUp; // Přepnutí stavu
    }

    createCardElement() {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

       

        this.updateCardDisplay(cardDiv); // Aktualizujeme zobrazení karty
        return cardDiv;
    }

    updateCardDisplay(cardElement) {
        cardElement.textContent = this.isFaceUp ? `${this.suit} ${this.value}` : 'lick'; // Zobrazit hodnotu nebo 'Card Back'
        cardElement.classList.toggle('flipped', !this.isFaceUp); // Přidat třídu pro otáčení
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
        this.currentCard = null; // Tady uchováváme aktuální kartu
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
            this.currentCard = this.cards[this.cards.length - 1]; // Nejvyšší karta
            const drawnCard = this.cards.pop(); // Odstranění karty z balíčku

            
            // Zde můžeme vytvořit element karty a přidat jej do DOM
            const cardElement = drawnCard.createCardElement();
            const deckElement = document.getElementById('deck');
            deckElement.innerHTML = ''; // Vyčistíme div decku
            deckElement.appendChild(cardElement);
            cardElement.classList.add('dealt')

            setTimeout(() => {
                cardElement.classList.remove('dealt');
            }, 100); // Přidání karty do decku

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
            card.flip(); // Otočení karty při přidání do ruky
        }
    }

    discardCard(card, discardPile) {
        const index = this.hand.indexOf(card);
        if (index > -1) {
            this.hand.splice(index, 1);
            card.discard(discardPile); // Karta bude zobrazená v odhazovacím balíčku
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
        card.flip(); // Otočení karty při odhození
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
            console.clear()
            console.log("Karty v ruce hráče:", player.hand.map(card => `${card.suit} ${card.value}`).join(", "));
            console.log("Karty v balíčku:", deck.cards.map(card => `${card.suit} ${card.value}`).join(", ") || "Prázdný balíček");
            console.log("Odhozené karty:", discard.drawnCards.map(card => `${card.suit} ${card.value}`).join(", ") || "Žádné odhozené karty");
        }
    </script>
</body>
</html>
