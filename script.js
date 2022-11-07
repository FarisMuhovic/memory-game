const startGameButton = document.getElementById("startgame");
const board = document.getElementById("board");
let minutes = 0;
let seconds = 0;
const timeS = document.getElementById("timesecs");
const timeM = document.getElementById("timemins");
startGameButton.addEventListener("click", () => {
  startGameButton.style.display = "none";
  board.style.display = "flex";
  setInterval(() => {
    if (seconds < 60) {
      seconds++;
      console.log(seconds);
    } else {
      seconds = 0;
      minutes++;
      console.log(seconds);
      console.log(minutes);
    }
    if (minutes < 10) {
      let minutesStr = "0" + minutes;
      timeM.innerText = minutesStr;
    } else {
      timeM.innerText = minutes;
    }
    if (seconds < 10) {
      let secondsStr = "0" + seconds;
      timeS.innerText = secondsStr;
    } else {
      timeS.innerText = seconds;
    }
  }, 1000);
  setTimeout(() => {
    document.documentElement.style.setProperty("--cardRotate", "180deg");
  }, 1500);
});
const cards = [
  "./images/bear.jpg",
  "./images/crocodile.jpg",
  "./images/dog.jpg",
  "./images/monke.jpg",
  "./images/sheep.jpg",
  "./images/squirrl.jpg",
  "./images/tiger.jpg",
  "./images/turtle.jpg",
  "./images/bear.jpg",
  "./images/crocodile.jpg",
  "./images/dog.jpg",
  "./images/monke.jpg",
  "./images/sheep.jpg",
  "./images/squirrl.jpg",
  "./images/tiger.jpg",
  "./images/turtle.jpg",
];
let shuffledCards = cards.sort(() => {
  return Math.random() - 0.5;
});
const cardContainer = document.querySelector("#cardbox");
shuffledCards.forEach(card => {
  cardContainer.innerHTML += `
  <fieldset class="flip-card" data-place=${card} data-id=${Math.random()}>
    <div class="flip-card-inner" data-place=${card} data-id=${Math.random()}>
      <div class="flip-card-front" data-place=${card} data-id=${Math.random()}>
        <img src="${card}" alt="Avatar" data-type="${card}" disabled>
      </div>
      <div class="flip-card-back" data-place=${card}>
        ?
      </div>
    </div>
  </fieldset>`;
});
const cardContaineritems = document.querySelectorAll("#cardbox .flip-card");
let selectedCardsAnimal = [];
let selectedCardsId = [];
let rotationangle = 0;
let moves = 0;
let movesText = document.getElementById("moves");
cardContaineritems.forEach(card => {
  card.addEventListener("click", function card(e) {
    let currcard = e.target;
    currcadparent = currcard.parentNode;
    selectedCardsAnimal.push(currcard.getAttribute("data-place"));
    selectedCardsId.push(currcadparent.getAttribute("data-id"));
    rotationangle = 360;
    let styling = `
      transform: rotateY(${rotationangle}deg);
      transition: all 0.8s;
    `;
    currcadparent.style = styling;
    if (
      selectedCardsAnimal[1] == selectedCardsAnimal[0] &&
      selectedCardsAnimal.length == 2
    ) {
      let dataoneAnimal = document.querySelector(
        `[data-id="${CSS.escape(selectedCardsId[0])}"]`
      );
      let datatwoAnimal = document.querySelector(
        `[data-id=${CSS.escape(selectedCardsId[1])}]`
      );
      dataoneAnimal.parentNode.disabled = true;
      datatwoAnimal.parentNode.disabled = true;
      selectedCardsAnimal.length = 0;
      selectedCardsId.length = 0;
      moves++;
    } else if (
      selectedCardsAnimal.length == 2 &&
      selectedCardsAnimal[1] != selectedCardsAnimal[0]
    ) {
      moves++;
      let dataoneAnimal = document.querySelector(
        `[data-id="${CSS.escape(selectedCardsId[0])}"]`
      );
      let datatwoAnimal = document.querySelector(
        `[data-id=${CSS.escape(selectedCardsId[1])}]`
      );
      rotationangle = 180;
      let styling = `
         transform: rotateY(${rotationangle}deg);
        transition: all 0.8s;
       `;
      setTimeout(() => {
        dataoneAnimal.parentNode.style = styling;
        datatwoAnimal.parentNode.style = styling;
        dataoneAnimal.style = styling;
        datatwoAnimal.style = styling;
      }, 750);
      selectedCardsAnimal.length = 0;
      selectedCardsId.length = 0;
    }
    movesText.innerText = moves;
  });
});
