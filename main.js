let counter = JSON.parse(localStorage.getItem("counter")) || {
  wins: 0,
  loses: 0,
  ties: 0,
};
let statsElement = document.querySelector(".stats");
updateScoreElement();
let showResultElement = document.querySelector(".showResult");

function updateScoreElement() {
  statsElement.innerHTML = `Wins: ${counter.wins} | Loses: ${counter.loses} | Ties: ${counter.ties}`;
}

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    document.querySelector(".auto-play").innerHTML = "Stop Playing";
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      game(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    document.querySelector(".auto-play").innerHTML = "Auto Play";
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector(".confirm").addEventListener("click", (event) => {
  if (event.target.classList.contains("yes-confirm")) {
    document.querySelector(".confirm").innerHTML = "";
    resetScore();
    localStorage.removeItem("counter");
  } else if (event.target.classList.contains("no-confirm")) {
    document.querySelector(".confirm").innerHTML = "";
  }
});

document.querySelector(".js-rock-button").addEventListener("click", () => {
  game("rock");
});
document.querySelector(".js-paper-button").addEventListener("click", () => {
  game("paper");
});
document.querySelector(".js-scissors-button").addEventListener("click", () => {
  game("scissors");
});
document.querySelector(".reset").addEventListener("click", () => {
  document.querySelector(".confirm").innerHTML =
    "<p>Are you sure you want to reset the score? <button class='confirm-button yes-confirm'>Yes</button> <button class='confirm-button no-confirm'>No</button> </p> ";
});
document.querySelector(".auto-play").addEventListener("click", () => {
  autoPlay();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    game("rock");
  } else if (event.key === "p") {
    game("paper");
  } else if (event.key === "s") {
    game("scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "Backspace") {
    document.querySelector(".confirm").innerHTML =
      "<p>Are you sure you want to reset the score? <button class='confirm-button yes-confirm'>Yes</button> <button class='confirm-button no-confirm'>No</button> </p> ";
  }
});

function game(playerChoice) {
  const computerChoice = pickComputerMove();
  let result;

  if (playerChoice === computerChoice) {
    result = "Tie";
    counter.ties += 1;
  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "Win";
    counter.wins += 1;
  } else {
    result = "Lose";
    counter.loses += 1;
  }

  updateScoreElement();
  localStorage.setItem("counter", JSON.stringify(counter));
  showResultElement.innerHTML = `
    You ${result} <br>
    You
    <img src="../rockPaperScissors/images/${playerChoice}-emoji.png" class="move-icon" alt="">
    <img src="../rockPaperScissors/images/${computerChoice}-emoji.png" class="move-icon" alt="">
    Computer`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) return "rock";
  if (randomNumber < 2 / 3) return "paper";
  return "scissors";
}

function resetScore() {
  for (let key in counter) counter[key] = 0;
  updateScoreElement();
  localStorage.removeItem("counter");
  showResultElement.innerHTML = "";
}
