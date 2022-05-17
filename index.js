const prompt = require("prompt");
const chalk =require('chalk')
const fiveLetterWords = require("./words.json");
prompt.start();

function getRandomWord() {
  return fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)].toUpperCase();
}
async function getGuess() {
  const { guess } = await prompt.get(["guess"]);
  return guess.toUpperCase();
}

function showWordWithHighlights(expectedWord, guess) {
    let res = '';
    [...guess].forEach((v, i) => {
        if (v === expectedWord[i]) {res +=chalk.bgGreen.black(v)}
        if (expectedWord.includes(v)) { res += chalk.bgYellow.black(v) }
        else res +=chalk.bgRed.black(v)
        
        
    })
    console.log(res)
}

async function playGame() {
  const expectedWord = getRandomWord();
  let guessesLeft = 6;

  do {
    let guess = await getGuess();

    if (guess === expectedWord) {
      console.log("congratulations");
      return;
    } else {
      showWordWithHighlights(expectedWord, guess);
      console.log("Guesses left " + guessesLeft);
      guessesLeft--;
    }
  } while (guessesLeft > 0);
  console.log("you lost message");
}

playGame();
