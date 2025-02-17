const result = document.querySelector(".result");
const humanScore = document.querySelector("#human-score");
const machineScore = document.querySelector("#machine-score");

let humanScoreNumber = 0;
let machineScoreNumber = 0;

// Enum
const GAME_Player = {
  ROCK: "rock",
  PAPER: "paper",
  SCISSORS: "scissors"
}

const playHuman = (humanChoice) => {
  playTheGame(humanChoice, playMachine());
};

const playMachine = () => {
  const choices = [GAME_Player.ROCK, GAME_Player.PAPER, GAME_Player.SCISSORS];
  const randomNumber = Math.floor(Math.random() * 3);

  return choices[randomNumber];
};

const playTheGame = (human, machine) => {
  console.log("Humano: " + human + "Maquina: " + machine);

  if (human === machine) {
    result.innerHTML = " Deu empate!";
  } else if (
    (human === GAME_Player.PAPER && machine === GAME_Player.ROCK) ||
    (human === GAME_Player.ROCK && machine === GAME_Player.SCISSORS) ||
    (human === GAME_Player.SCISSORS && machine === GAME_Player.PAPER)
  ) {
    result.innerHTML = "Você ganhou!";
    humanScoreNumber++;
    humanScore.innerHTML = humanScoreNumber;
  } else {
    result.innerHTML = "Você perdeu!";
    machineScoreNumber++;
    machineScore.innerHTML = machineScoreNumber;
  }
};
