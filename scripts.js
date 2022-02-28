// First stage | Game in the browser console
console.log("Game Start!");

let playerScores = 0;
let computerScores = 0;
let playerSelection;
let computerSelection;
let roundResult;

function playerGame() {
  const playerSelection = prompt("•° rock | paper | scissors °•").toLowerCase();
  if (playerSelection.match("^(rock|paper|scissors)$")) return playerSelection;
  else if (playerSelection === "")
    return "Null input not allowed!\nPlease type: rock | paper | scissors";
  else
    return `You can't type ${playerSelection}!\nPlease type: rock | paper | scissors`;
}

function computerPlay() {
  const weapons = ["rock", "paper", "scissors"];
  const computerSelection = weapons[Math.floor(Math.random() * weapons.length)];
  return computerSelection;
}

function playRound(playerSelection, computerSelection) {
  let result;
  switch (true) {
    case playerSelection === computerSelection:
      result = `Your choice is ${playerSelection} | Computer's choice is ${computerSelection}.\nA draw, because both chose ${playerSelection} (* ￣︿￣)\nThe scores remain the same → ${playerScores} | ${computerScores}`;
      break;
    case playerSelection === "rock" && computerSelection === "scissors":
    case playerSelection === "scissors" && computerSelection === "paper":
    case playerSelection === "paper" && computerSelection === "rock":
      playerScores += 1;
      result = `Your choice is ${playerSelection} | Computer's choice is ${computerSelection}.\nYou won, because ${playerSelection} beats ${computerSelection} (★‿★)\nYour score is → ${playerScores} | Computer's score is → ${computerScores}`;
      break;
    case computerSelection === "rock" && playerSelection === "scissors":
    case computerSelection === "scissors" && playerSelection === "paper":
    case computerSelection === "paper" && playerSelection === "rock":
      computerScores += 1;
      result = `Your choice is ${playerSelection} | Computer's choice is ${computerSelection}.\nYou lost, because ${computerSelection} beats ${playerSelection} (•ˋ_ˊ•)\nYour score is → ${playerScores} | Computer's score is → ${computerScores}`;
      break;
    default:
      result = `${playerSelection}\nThe scores remain the same → ${playerScores} | ${computerScores}\nINVALID ROUND! (╯°□°）╯︵ ┻━┻`;
  }
  return result;
}

function game() {
  for (let round = 0; round < 5; round++) {
    playerSelection = playerGame();
    computerSelection = computerPlay();
    roundResult = playRound(playerSelection, computerSelection);
    console.log(roundResult);
  }

  if (playerScores > computerScores)
    console.log(
      `FINAL SCORE: ${playerScores} | ${computerScores}\n%cYOU WON THE GAME ╰(*°▽°*)╯`,
      "color:green;"
    );
  else if (playerScores < computerScores)
    console.log(
      `FINAL SCORE: ${playerScores} | ${computerScores}\n%cYOU LOST THE GAME! •°◦(＞﹏＜)◦°•`,
      "color:red;"
    );
  else
    console.log(
      `FINAL SCORE: ${playerScores} | ${computerScores}\n%cA DRAW TRY AGAIN! o(一︿一+)o`,
      "color:purple;"
    );
}

game();
