function drawCard(){
    temp = deck[lastItem]
    deck.pop()
    player.push(temp)

    playerLastItem = player.length -1;
    lastItem = deck.length -1;
    gameState()
}

function playCard(){
    playerTemp = player[playerLastItem]
    player.pop()
    discardPile.push(playerTemp)
    lastItem = deck.length -1;
    playerLastItem = player.length -1;
    gameState()
}

function gameState(){
    document.write('<p>Deck: <br>', deck, '</p><br>')
    document.write('<p>Player hand: <br>', player, '</p><br>')
    document.write('<p>Discard Pile: <br>', discardPile, '</p><br>')
    document.write('<hr>')
    if (gameOver == true){
        document.write("Game Over!")
    }
}
