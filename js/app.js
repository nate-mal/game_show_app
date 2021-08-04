// game brain

const qwerty = document.querySelector("#qwerty");
const phrase = document.getElementById("phrase");
const ulPhrase = phrase.querySelector("ul");
let missed = 0;

// remove overlay and display game banner

const startGame = document.querySelector(".btn__reset");

startGame.addEventListener("click", (e) => {
  const overlay = startGame.parentNode;
  overlay.style.display = "none";
});

// set 5 phrases in the phrases array

const phrases = [
  "A Cold Day in Hell",
  "Curiosity Killed The Cat",
  "Needle In a Haystack",
  "Hit Below The Belt",
  "A Cold Fish",
];

// this function takes an array as an parameter and returns a random element of it as an array of characters
function getRandomPhraseAsArray(arr) {
  const randomNb = Math.floor(Math.random() * arr.length);
  let randomPhrase = arr[randomNb].split("");
  return randomPhrase;
}
// this function takes an array of characters and  wraps  each character in a list 'li' item and append it to the ul element inside  "#phrase" section
function addPhraseToDisplay(arrayPhrase) {
  for (each of arrayPhrase) {
    let li = document.createElement("li");
    li.textContent = each;
    if (each !== " ") li.className = "letter";
    ulPhrase.appendChild(li);
  }
}
function checkLetter(button) {
  const phraseList = ulPhrase.children;
  for (eachLi of phraseList) {
    if (button.textContent.toLowerCase() === eachLi.textContent.toLowerCase()) {
      eachLi.className += " show";
      return eachLi;
    }
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
const guess = document.createElement("button");
guess.textContent = "C";
checkLetter(guess);
