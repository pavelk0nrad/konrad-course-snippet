

let hearts = ['♥️7', '♥️8', '♥️9', '♥️10', '♥️J', '♥️Q', '♥️K', '♥️A']
let diamonds = ['♦️7', '♦️8', '♦️9', '♦️10', '♦️J', '♦️Q', '♦️K', '♦️A']
let spades = ['♣️7', '♣️8', '♣️9', '♣️10', '♣️J', '♣️Q', '♣️K', '♣️A'];
let clubs = ['♠️7', '♠️8', '♠️9', '♠️10', '♠️J', '♠️Q', '♠️K', '♠️A'];


let deck = [...hearts, ...diamonds, ...spades, ...clubs];

let player = [
];

let enemy = [

];

document.write('<p>Deck: <br>', deck, '<br></p>')

let temp
let lastItem = deck.length -1;



temp = deck[lastItem]
deck.pop()
player.push(temp)
lastItem = deck.length -1;

temp = deck[lastItem]
deck.pop()
player.push(temp)
lastItem = deck.length -1;

temp = deck[lastItem]
console.log(temp)
deck.pop()
player.push(temp)
lastItem = deck.length -1;

temp = deck[lastItem]
console.log(temp)
deck.pop()
player.push(temp)
lastItem = deck.length -1;

document.write('<p>After Draw: <br>', deck, '<br></p>')
document.write('<p>Player hand: <br>', player, '</p>')

//drawCard function
//playCard function

