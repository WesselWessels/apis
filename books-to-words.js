const fs = require('fs');

let book = fs.readFileSync('./books/pride-and-prejudice.txt', 'utf8');
let aliceBook = fs.readFileSync('./books/alice.txt');
let sherlock = fs.readFileSync('./books/sherlock.txt');
let bookText = book.toString() + aliceBook.toString() + sherlock.toString();

const wordRegex = /\s([a-z]{4,})\s/gm;
let match;
let words = {};

// If you are reading this comments, I'm sorry. While playing myself I discovered this word and thought it best to rather remove it.
// This list will also be a place to add other words not really suitable for a light spelling game.
// If you find any words that should belong here, please open an issue or PR.
let censoredWords = ["negro"];

while(match = wordRegex.exec(bookText)) {
  if(censoredWords.indexOf(match[1]) >= 0) {
    return;
  }
  let count = words[match[1]] || 0;
  words[match[1]] = count+1;
}

let finalWords = JSON.stringify(Object.keys(words).sort());

fs.writeFileSync('./words.json', finalWords, 'utf8');

