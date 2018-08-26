const cards = document.querySelector(".deck");
const moves = document.querySelector(".moves");
const clearStars = document.querySelector(".stars");
let openCards = [];
let matchedCards = [];
let numberOfMoves = 0;
let clockId;
let time = 0;
let timeMinutes;
let timeSeconds;
const timer = document.querySelector(".time");
let starRating;
let rateValue;

const pictureArr = [
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-diamond",
  "fa fa-cube",
  "fa fa-paper-plane-o",
  "fa fa-leaf",
  "fa fa-bolt",
  "fa fa-anchor"
];

// Doubles the Array
pictureArr.push(...pictureArr);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function buildGrid() {
  const docFragment = document.createDocumentFragment();
  shuffle(pictureArr); 
  pictureArr.forEach(function(pict) {
    const cards = document.createElement("li");

    const picture = document.createElement("i");
    picture.setAttribute("class", pict);

    cards.appendChild(picture);
    cards.classList.add("card", "close");

    docFragment.appendChild(cards);
  });

  const deck = document.querySelector(".deck");
  deck.appendChild(docFragment);
}

const open = function(targetCard) {
  if (targetCard.nodeName.toLowerCase() === "li") {
    if (
      !targetCard.classList.contains("open") &&
      !targetCard.classList.contains("show") &&
      !targetCard.classList.contains("match")
    ) {
      add(targetCard);
    }
  }
  return targetCard;
};

const add = function(targetCard) {
  openCards.push(targetCard);
  targetCard.classList.add("open", "show");
  if (openCards.length === 2) {
    movesCounter();
    if (
      openCards[0].firstChild.className === openCards[1].firstChild.className
    ) {
      console.log("Match!");
      match();
      openCards = [];
    } else {
      setTimeout(function() {
        for (const card of openCards) {
          card.classList.remove("show", "open");
        }
        openCards = [];
      }, 500);
    }
  }
};

//Matched Cards 
const match = function() {
  openCards[0].classList.add("match");
  openCards[1].classList.add("match");

  openCards[0].classList.remove("close");
  openCards[1].classList.remove("close");

  matchedCards.push(openCards[0]);
  matchedCards.push(openCards[1]);

  console.log(matchedCards.length);
};

const movesCounter = function() {
  numberOfMoves += 1;
  const moves = document.querySelector(".moves");
  moves.textContent = `${numberOfMoves} Moves`;

  gameRating();
};

const showModal = function() {
  const sModal = document.querySelector(".bg-modal");
  sModal.setAttribute("style", "display: flex");

  const modalmoves = document.querySelector(".modal-moves");
  modalmoves.textContent = `Moves: ${numberOfMoves}`;

  const modalClock = document.querySelector(".modal-time");
  modalClock.textContent = `Time: ${timeMinutes}:${timeSeconds}`;

  const stars = document.querySelectorAll(".modalRating");
  for (let i = 0; i < stars.length; i++) {
    if (rateValue === 2) {
      console.log("2 stars");
      stars[0].setAttribute("style", "display: none");
    }
    if (rateValue === 1) {
      console.log("2 stars");
      stars[0].setAttribute("style", "display: none");
      stars[1].setAttribute("style", "display: none");
    }
  }
};

const hideModal = function() {
  const hModal = documen.querySelector(".close-modal");
  hModal.setAttribute("style", "display: none");
};

const startClock = function() {
  clockId = setInterval(function() {
    time++;
    pageClock();
  }, 1000);
};

const stopClock = function() {
  clearInterval(clockId);
};

//Clock
const pageClock = function() {
  timeMinutes = Math.floor(time / 60);
  timeSeconds = time % 60;

  if (time < 10) {
    timer.textContent = `Time: 00:0${timeSeconds}`;
  } else {
    timer.textContent = `Time: 0${timeMinutes}:${timeSeconds}`;
  }
};

// Rating
const gameRating = function() {
  starRating = document.querySelectorAll(".rating");
  for (let i = 0; i < starRating.length; i++) {
    if (numberOfMoves > 12) {
      starRating[0].setAttribute("style", "visibility: hidden");

      rateValue = 2;
    }

    if (numberOfMoves > 16) {
      starRating[0].setAttribute("style", "visibility: hidden");
      starRating[1].setAttribute("style", "visibility: hidden");

      rateValue = 1;
    }
  }
};

// Star rating
const fiveStars = function() {
  for (let i = 0; i < 3; i++) {
    const star = document.createElement("li");

    const picture = document.createElement("i");
    picture.setAttribute("class", "fa fa-star rating");
    picture.setAttribute("style", "padding-left: 5px;");

    star.appendChild(picture);

    clearStars.appendChild(star);
  }
};

// Reset
const resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", function() {
  while (cards.hasChildNodes()) {
    cards.removeChild(cards.lastChild);
  }

  while (clearStars.hasChildNodes()) {
    clearStars.removeChild(clearStars.lastChild);
  }

  openCards = [];
  matchedCards = [];
  numberOfMoves = 0;
  moves.textContent = `${numberOfMoves} Moves`;

  timeMinutes = 0;
  timeSeconds = 0;
  time = 0;

  timer.textContent = `Time: 0${timeMinutes}:0${timeSeconds}`;

  startClock();
  fiveStars();
  buildGrid();
});

cards.addEventListener("click", function _listener(evt) {
  const targetCard = evt.target;
  open(targetCard);

  if (matchedCards.length === 16) {
    stopClock();
    gameRating();

    setTimeout(function() {
      cards.removeEventListener("click", _listener);
      showModal();
    }, 1000);
  }
});4

// Build grid and start the clock as soon as the DOM loads
buildGrid();
startClock();
