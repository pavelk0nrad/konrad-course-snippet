
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
                const cardData = [
                    { suit: "♥", value: "7" }, { suit: "♥", value: "8" },
                    { suit: "♥", value: "9" }, { suit: "♥", value: "10" },
                    { suit: "♥", value: "J" }, { suit: "♥", value: "Q" },
                    { suit: "♥", value: "K" }, { suit: "♥", value: "A" },
                    { suit: "♦", value: "7" }, { suit: "♦", value: "8" },
                    { suit: "♦", value: "9" }, { suit: "♦", value: "10" },
                    { suit: "♦", value: "J" }, { suit: "♦", value: "Q" },
                    { suit: "♦", value: "K" }, { suit: "♦", value: "A" },
                    { suit: "♠", value: "7" }, { suit: "♠", value: "8" },
                    { suit: "♠", value: "9" }, { suit: "♠", value: "10" },
                    { suit: "♠", value: "J" }, { suit: "♠", value: "Q" },
                    { suit: "♠", value: "K" }, { suit: "♠", value: "A" },
                    { suit: "♣", value: "7" }, { suit: "♣", value: "8" },
                    { suit: "♣", value: "9" }, { suit: "♣", value: "10" },
                    { suit: "♣", value: "J" }, { suit: "♣", value: "Q" },
                    { suit: "♣", value: "K" }, { suit: "♣", value: "A" }
                ];
                this.cards = cardData.map(card => new Card(card.suit, card.value));
            }

            shuffle() {
                for (let i = this.cards.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
                }
            }

            drawCard() {
                if (this.cards.length > 0) {
                    return this.cards.pop();
                } else {
                    alert("Lízací balíček je prázdný!");
                    return null;
                }
            }
        }

        class DiscardPile {
            constructor() {
                this.card = null;
                this.displayDiscardedCard();
            }

            discard(card) {
                this.card = card;
                this.displayDiscardedCard();
            }

            displayDiscardedCard() {
                const discardPile = document.getElementById('discard-pile');
                discardPile.innerHTML = ''; // Clear previous card
                if (this.card) {
                    const cardElement = this.card.createCardElement();
                    discardPile.appendChild(cardElement);
                }
            }
        }

        class Player {
            constructor(discardPile) {
                this.hand = [];
                this.discardPile = discardPile; 
            }

            addCardToHand(card) {
                this.hand.push(card);
                card.flip(); // Flip for player
                const cardElement = card.createCardElement();
                const playerHand = document.getElementById('player-hand');
                playerHand.appendChild(cardElement);

                cardElement.addEventListener('click', () => {
                    this.discardCard(card, cardElement);
                });
            }

            addEnemyCardToHand(card) {
                this.hand.push(card);
                const cardElement = card.createCardElement();
                const enemyHand = document.getElementById('enemy-hand');
                enemyHand.appendChild(cardElement);
            }

            discardCard(card, cardElement) {
                const topDiscard = this.discardPile.card;

                if (!topDiscard || 
                    topDiscard.textContent === '' || 
                    card.suit === topDiscard.suit || 
                    card.value === topDiscard.value) {
                    
                    const index = this.hand.indexOf(card);
                    if (index > -1) {
                        this.hand.splice(index, 1);
                        this.discardPile.discard(card);
                        cardElement.remove(); 
                    } else {
                        console.log("Karta není v ruce.");
                    }
                } else {
                    alert("Nelze zahodit kartu. Musí odpovídat barvou nebo hodnotou.");
                }
            }
        }

        class Game {
            constructor() {
                this.deck = new Deck();
                this.discardPile = new DiscardPile(); 
                this.player = new Player(this.discardPile);
                this.enemy = new Player(this.discardPile); 
                this.init();
            }

            init() {
                // Draw initial cards for player and enemy
                for (let i = 0; i < 4; i++) {
                    const playerCard = this.deck.drawCard();
                    if (playerCard) {
                        // Flip the first player card face down
                        if (this.player.hand.length === 0) {
                            this.player.addCardToHand(playerCard);
                            playerCard.isFaceUp = true; // First card face down
                        } else {
                            this.player.addCardToHand(playerCard);
                        }

                        const enemyCard = this.deck.drawCard();
                        if (enemyCard) this.enemy.addEnemyCardToHand(enemyCard);
                    }
                }

                // Draw the first card to initialize the discard pile
                const firstDiscardCard = this.deck.drawCard();
                if (firstDiscardCard) {
                    this.discardPile.discard(firstDiscardCard);
                }

                // Handle drawing a new card for the player
                document.getElementById('deck').addEventListener('click', () => {
                    const playerCard = this.deck.drawCard();
                    if (playerCard) this.player.addCardToHand(playerCard);
                });
            }
        }

        // Start the game
        new Game();
    </script>
