// Inicializace balíčku
let hearts = ['♥️7', '♥️8', '♥️9', '♥️10', '♥️J', '♥️Q', '♥️K', '♥️A'];
let diamonds = ['♦️7', '♦️8', '♦️9', '♦️10', '♦️J', '♦️Q', '♦️K', '♦️A'];
let spades = ['♣️7', '♣️8', '♣️9', '♣️10', '♣️J', '♣️Q', '♣️K', '♣️A'];
let clubs = ['♠️7', '♠️8', '♠️9', '♠️10', '♠️J', '♠️Q', '♠️K', '♠️A'];
let deck = [...hearts, ...diamonds, ...spades, ...clubs];

// Zamíchání balíčku
for (let i = deck.length - 1; i > 0; i--) {
    let shuffleCard = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[shuffleCard]] = [deck[shuffleCard], deck[i]];
}

// Inicializace hráče, nepřítele a discard pile
let player = [];
let enemy = [];
let discardPile = [];
let gameOver = false;
let playerTurn = true;

// Funkce pro stav hry
function getGameState() {
    return `
=== STAV HRY ===
Balíček: ${deck.length} karet
Odhazovací hromádka: ${discardPile.join(', ')}
Nepřítel: //Dodělej zobrazení počtu karet nepřítele

Tvoje ruka: ${player.map((card, index) => `[${index}] ${card}`).join(', ')}
================
`;
}

// Líznutí karty
function drawCard() {
    if (deck.length === 0) {
        alert('Balíček je prázdný!');
        return;
    }
    player.push(deck.pop());
}

// Hraní karty
function playCard(cardIndex) {
    if (cardIndex < 0 || cardIndex >= player.length) {
        alert('Neplatný index karty!');
        return;
    }
    const playedCard = player.splice(cardIndex, 1)[0];
    discardPile.push(playedCard);
    playerTurn = false;
}

// Tah nepřítele
function enemyTurn() {
    if (enemy.length === 0) {
        if (deck.length > 0) enemy.push(deck.pop());
        else {
            gameOver = true;
            alert('Konec hry! Balíček je prázdný.');
            return;
        }
    }
    const enemyCard = enemy.pop();
    discardPile.push(enemyCard);
    alert('Nepřítel zahrál kartu: ' + enemyCard);
    playerTurn = true;
}

// Zahájení hry
function startGame() {
    for (let i = 0; i < 5; i++) {
        player.push(deck.pop());
        enemy.push(deck.pop());
    }
    //Dodělej rozdání první karty do discard pile
}

// Hlavní smyčka hry
function gameLoop() {
    while (!gameOver) {
        if (playerTurn) {
            let action = prompt(
                getGameState() +
                'Zadej "draw" pro líznutí karty nebo "play [index]" pro zahrání karty:'
            );
            if (!action) break; // Pokud hráč zavře prompt, ukončíme hru.
            if (action.startsWith('play')) {
                const cardIndex = parseInt(action.split(' ')[1]);
                playCard(cardIndex);
            } else if (action === 'draw') {
                drawCard();
            } else {
                alert('Neplatná akce!');
            }
        } else {
            enemyTurn();
        }
        if (deck.length === 0 && player.length === 0 && enemy.length === 0) {
            gameOver = true;
            alert('Konec hry! Žádné karty nezbyly.');
        }
    }
    alert('Hra skončila!');
}

// Spuštění hry
startGame();
gameLoop();
