for (let i = 0; i < deck.length; i++) {
    let shuffleCard = Math.floor((Math.random() * deck.length))
    let temp = deck[i]
    let mixedCard = deck[shuffleCard]
    deck[i] = deck[shuffleCard];
    deck[shuffleCard] = temp;
}
//Fisher-Yates-Shuffle Algoritmus
// for (let i = deck.length - 1; i > 0; i--) {
//     let shuffleCard = Math.floor(Math.random() * (i + 1)); // Správný rozsah pro náhodný index
//     let temp = deck[i];
//     deck[i] = deck[shuffleCard];
//     deck[shuffleCard] = temp;
// }
