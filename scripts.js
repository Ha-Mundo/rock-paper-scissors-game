const gameOutput = document.querySelector(".game-output");
const weaponsArea = document.querySelector(".weapons-area");
const weaponsButtons = document.querySelectorAll(".weapon-button");
const rounds = document.querySelector(".round");
const combatText = document.querySelector(".combat-text");
const buttonPlayAgain = document.querySelector(".play-again");

let playerLives = 5;
let computerLives = 5;
let round = 0;

function countRounds() {
  round += 1;
  rounds.innerText = `Round: ${round}`;
  return round;
}

function startGame() {
  buttonPlayAgain.addEventListener("click", () => {
    buttonPlayAgain.style.visibility = "hidden";
    weaponsArea.style.visibility = "visible";
    gameOutput.style.visibility = "visible";
  });
}

function computerPlay() {
  const weapons = ["rock", "paper", "scissors"];
  const computerSelection = weapons[Math.floor(Math.random() * weapons.length)];

  const computerIcon = document.querySelector(".computer-icon");
  computerIcon.classList.remove(
    "fa-question-square",
    "fa-hand-paper",
    "fa-hand-peace",
    "fa-hand-rock"
  );

  if (computerSelection === "paper") {
    computerIcon.classList.add("fa-hand-paper");
  } else if (computerSelection === "scissors") {
    computerIcon.classList.add("fa-hand-peace");
  } else {
    computerIcon.classList.add("fa-hand-rock");
  }

  return computerSelection;
}

function playRound(playerSelection, computerSelection) {
  const computerPlayDiv = document.querySelector(".computer-play-div");
  switch (true) {
    case playerSelection === computerSelection:
      combatText.innerText = `Hmm.. Two ${playerSelection}s means a draw, so no lives were lost. Let's try again.`;
      break;
    case playerSelection === "paper" && computerSelection === "rock":
    case playerSelection === "scissors" && computerSelection === "paper":
    case playerSelection === "rock" && computerSelection === "scissors":
      combatText.innerText = `Nice move! The enemy lost one life, because ${playerSelection} beats ${computerSelection}!`;
      computerLives -= 1;
      break;
    default:
      combatText.innerText = `Unlucky move.. You lost one life, because   ${computerSelection} beats your ${playerSelection}!`;
      playerLives -= 1;
      break;
  }

  const lives = document.querySelector(".lives");
  lives.innerText = `Your Lives: ${playerLives} ︱ Enemy's Lives: ${computerLives}`;
  return [playerLives, computerLives];
}

function endGame(playerHealth, computerHealth) {
  if (playerHealth === 0 || computerHealth === 0) {
    weaponsButtons.forEach(button => {
      button.setAttribute("disabled", "");
      button.classList.add("disabled-button", "opacity");
      weaponsArea.style.display = "none";
    });

    const computerIcon = document.querySelector(".computer-icon");
    computerIcon.style.opacity = "0.5";

    const gameEndText = document.querySelector(".game-end-text");
    if (playerLives > computerLives) {
      combatText.innerText = "Great!!! The enemy has no lives left...";
      gameEndText.textContent = "You Won This Battle!";
    } else {
      combatText.innerText = "Ouch.. No lives left for you.";
      gameEndText.textContent = "You Lost This Battle!";
    }
    buttonPlayAgain.style.visibility = "visible";
  }
}

function resetGame() {
  buttonPlayAgain.textContent = "Fight Again!";
  buttonPlayAgain.addEventListener("click", () => {
    window.location.reload();
  });
}

function playerGame() {
  let playerSelection;
  weaponsButtons.forEach(weapon => {
    weapon.addEventListener("click", () => {
      if (weapon.classList.contains("paper-button")) {
        playerSelection = "paper";
      } else if (weapon.classList.contains("scissors-button")) {
        playerSelection = "scissors";
      } else {
        playerSelection = "rock";
      }
      console.log(playerSelection);
      playRound(playerSelection, computerPlay());
      countRounds();
      endGame(playerLives, computerLives);
      resetGame();
    });
  });
  startGame();
}

playerGame();
