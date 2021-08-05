// game brain

const qwerty = document.querySelector("#qwerty");
const phrase = document.getElementById("phrase");
const ulPhrase = phrase.querySelector("ul");
let missed = 0;
const scoreboard = document.getElementById("scoreboard");
// set 5 phrases in the phrases array

const phrases = [
  "A Cold Day in Hell",
  "Curiosity Killed The Cat",
  "Needle In a Haystack",
  "Hit Below The Belt",
  "A Cold Fish",
];

// remove overlay and display game banner

const overlay = document.querySelector("#overlay");
overlay.addEventListener("click", (e) => {
  if (e.target.className === "btn__reset") {
    const resetButton = e.target;
    if (resetButton.className === "btn__reset") overlay.style.display = "none";
    if (resetButton.textContent.includes("again")) {
      resetGame();
    }
  }
});

//this function will reset the game

function resetGame() {
  overlay.style.display = "none";
  ulPhrase.style.display = "";
  missed = 0;
  const phraseArray = getRandomPhraseAsArray(phrases);
  const ul = phrase.firstElementChild;
  ul.innerHTML = "";
  addPhraseToDisplay(phraseArray);
  overlay.removeChild(document.querySelector("h3"));
  const resetHearts = () => {
    const Hearts = scoreboard.querySelectorAll('img[src *= "lostHeart"]');
    for (eachHeart of Hearts) {
      eachHeart.src = eachHeart.src.replace("lostHeart", "liveHeart");
    }
  };
  const resetKeyboard = () => {
    const Keys = qwerty.querySelectorAll(".chosen");
    for (eachKey of Keys) {
      eachKey.className = "";
      eachKey.disabled = "";
    }
  };
  resetHearts();
  resetKeyboard();
}

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
    else li.className = "space";
    ulPhrase.appendChild(li);
  }
}
function checkLetter(button) {
  const phraseList = ulPhrase.children;
  let letter = null;
  for (eachLi of phraseList) {
    if (button.textContent.toLowerCase() === eachLi.textContent.toLowerCase()) {
      eachLi.className += " show";
      letter = button.textContent;
    }
  }
  return letter;
}
function lostOneHeart() {
  const lostHeart = scoreboard.querySelector('img[src *= "liveHeart"]');
  lostHeart.src = lostHeart.src.replace("liveHeart", "lostHeart");
}

function checkWin() {
  const letters = phrase.querySelectorAll(".letter");
  const guessedLetters = phrase.querySelectorAll(".show");
  if (letters.length === guessedLetters.length) return true;
  else return false;
}

// this event listener watches for letter buttons that are selected from the qwerty keyboard displayed on the page and run the checkletter(button) function on each selected button
qwerty.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    function overlayMessage(state) {
      function userMessage(message) {
        const userMes = document.createElement("h3");
        userMes.textContent = message;
        overlay.insertBefore(userMes, overlay.lastElementChild);
      }
      overlay.className = state;
      ulPhrase.style.display = "none";
      if (state === "win")
        overlay.querySelector(".btn__reset").textContent = "Play again";
      else if (state === "lose")
        overlay.querySelector(".btn__reset").textContent = "Try again";
      overlay.style.display = "";
      userMessage(`You ${state}!`);
    }
    button = e.target;
    const letterFound = checkLetter(button);
    if (!letterFound) {
      missed++;
      lostOneHeart();
      button.className += " wrong";
    }
    button.className += " chosen";
    button.disabled = "true";
    if (checkWin()) {
      overlayMessage("win");
    } else if (missed === 5) {
      overlayMessage("lose");
    }
  }
});
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
