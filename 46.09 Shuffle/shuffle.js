class Deck {
  
  constructor() {
        this.cards = [];
        this.currentCard = null; 
        this.loadCards();
        this.shuffle();
    }
  
  shuffle() {
                for (let i = this.cards.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
                }
            }
}
