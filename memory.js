const emojis = ["🍎", "🍌", "🍉", "🍇", "🍒", "🍓", "🥑", "🍍"];
let cards = [...emojis, ...emojis]; // Duplica os emojis para criar pares
cards.sort(() => Math.random() - 0.5); // Embaralha as cartas

const gameBoard = document.getElementById("gameBoard");
const winMessage = document.getElementById("winMessage"); // Elemento para exibir a vitória
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0; // 🔹 Variável para contar os pares encontrados

function createBoard() {
  cards.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.textContent = this.dataset.emoji;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    
    matchedPairs++; // 🔹 Incrementa os pares encontrados
    checkWin(); // 🔹 Chama a função para verificar se o jogo acabou
    
    resetBoard();
  } else {
    setTimeout(() => {
      firstCard.textContent = "";
      secondCard.textContent = "";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }
}

function checkWin() {
  if (matchedPairs === emojis.length) { // 🔹 Compara com o total de pares possíveis
    winMessage.style.display = "block";
  }
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

createBoard();
