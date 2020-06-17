const fs = require('fs');
console.log("testing");

let book = fs.readFileSync('./books/pride-and-prejudice.txt', 'utf8');
let aliceBook = fs.readFileSync('./books/alice.txt');
let sherlock = fs.readFileSync('./books/sherlock.txt');
let twoCities = fs.readFileSync('./books/tale-of-two-cities.txt');
let bookText = book.toString() + aliceBook.toString() + twoCities.toString();// + sherlock.toString();
bookText = bookText.replace(/\r\n/g, ' ').replace(/\s+/g, ' ').replace(/_/g, '');

const wordRegex = /\s([a-z]{4,})\s/gm;
let match;
let words = {};

// If you are reading this comments, I'm sorry. While playing myself I discovered this word and thought it best to rather remove it.
// This list will also be a place to add other words not really suitable for a light spelling game.
// If you find any words that should belong here, please open an issue or PR.
let censoredWords = ["negro"];

console.log("Hello");
var boundaryRegex = new RegExp(/[A-Z]|“|”|\.|,|!|:|;|\(|\)/);

function getSentence(word) {
  var index = bookText.indexOf(" " + word + " ");
  var sentence = bookText.slice(index - 30, index + 40).trim();
  var split = sentence.split(' ');
  sentence = split.slice(1, split.length-1).join(' ');
  var posOfWord = sentence.indexOf(word);
  var firstBackChar;
  var lastBackChar;
  
  for(let i = posOfWord-1; i >=0; i--) {
    var character = sentence.charAt(i);
    if(character.match(boundaryRegex)) {
      if(character.match(/[A-Z]/)) {
        firstBackChar = i;
      } else {
        firstBackChar = i+1;
      }
      
      break;
    }
  }
  for(let i = posOfWord + word.length + 1; i < sentence.length; i++) {
    var character = sentence.charAt(i);
    if(character.match(boundaryRegex)) {
      lastBackChar = i;
      
      break;
    }
  }

  sentence = sentence.slice(firstBackChar, lastBackChar).trim();
  sentence = sentence.replace(word, word.toUpperCase());
  return sentence;
}

while(match = wordRegex.exec(bookText)) {
  if(censoredWords.indexOf(match[1]) >= 0) {
    break;
  } else {
    words[match[1]] = getSentence(match[1]);
  }
}
console.log(Object.keys(words).length);

let finalWords = JSON.stringify(words);
fs.writeFileSync('./words-and-sentences.json', finalWords, 'utf8');

