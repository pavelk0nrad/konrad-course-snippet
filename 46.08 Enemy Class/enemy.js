 <script>

        const turn = false;


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

            // Otočení karty při přidání do ruky
            card.flip();

            // Vytvoření a přidání elementu do hráčovy ruky
            const playerHandElement = document.getElementById('player-hand');
            const cardElement = card.createCardElement();

            // Nastavení počátečních vlastností pro animaci
            cardElement.style.transform = 'scale(0.5) translateY(50px)';
            cardElement.style.opacity = '0';
            cardElement.style.transition = 'transform 0.5s ease, opacity 0.5s ease';

            // Přidání elementu do DOM
            playerHandElement.appendChild(cardElement);

            // Nastavení animace po vykreslení prvku
            requestAnimationFrame(() => {
                cardElement.style.transform = 'scale(1) translateY(0)';
                cardElement.style.opacity = '1';
            });

            // Přidání event listeneru pro možnost odhození karty
            cardElement.addEventListener('click', () => {
                this.discardCard(card, document.getElementById('discard-pile'));
                updatePlayerHandUI();
            });
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

class Enemy {
            constructor(discard) {
                this.hand = [];
                this.discard = discard;
            }

            addCardToHand(card) {
                this.hand.push(card); // Přidání karty do ruky
                const cardElement = card.createCardElement();
                const enemyHand = document.getElementById('enemy-hand');
                enemyHand.appendChild(cardElement);
                cardElement.classList.add('pop-animation'); // Přidání animace pro zobrazení karty
            }
            
        }

        document.addEventListener('DOMContentLoaded', function () {
    const turn = false;
    const discardPileElement = document.getElementById('discard-pile'); // Přidejte odkaz na hromádku zahazování
    const enemy = new Enemy(discardPileElement); // Vytvořte instanci Enemy s odkazem na hromádku zahazování

    // ... (ostatní kód, jako je třída Card a Deck)

    // Tlačítko pro líznutí karty
    document.getElementById('draw-enemy-card').onclick = function () {
        const card = deck.drawCard(); // Ujistěte se, že deck je definován a inicializován
        if (card) {
            enemy.addCardToHand(card); // Přidejte kartu do ruky protihráče
        }
    };
});



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
