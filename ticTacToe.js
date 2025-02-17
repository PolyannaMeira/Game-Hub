let currentPlayer = "X";
        let board = ["", "", "", "", "", "", "", "", ""];
        const boardElement = document.getElementById("board");
        const statusElement = document.getElementById("status");

        /**
         * Checks if there is a winner or a draw.
         * @returns {boolean} True if the game ends, false otherwise.
         */
        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            
            for (let combination of winningCombinations) {
                const [a, b, c] = combination;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    statusElement.textContent = `Player ${board[a]} wins!`;
                    setTimeout(resetGame, 2000);
                    return true;
                }
            }
            if (!board.includes("")) {
                statusElement.textContent = "Draw!";
                setTimeout(resetGame, 2000);
                return true;
            }
            return false;
        }

        /**
         * Handles the player's move.
         * @param {number} index - The index of the board cell.
         * @param {HTMLElement} cell - The clicked cell element.
         */
        function makeMove(index, cell) {
            if (board[index] === "" && !checkWinner()) {
                board[index] = currentPlayer;
                cell.textContent = currentPlayer;
                cell.classList.add("taken");
                
                if (!checkWinner()) {
                    currentPlayer = "O";
                    statusElement.textContent = `Player ${currentPlayer}'s turn`;
                    setTimeout(computerMove, 500);
                }
            }
        }

        /**
         * Handles the AI's move.
         */
        function computerMove() {
            let availableMoves = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
            if (availableMoves.length > 0 && currentPlayer === "O") {
                let bestMove = null;
                
                // Try to win
                bestMove = findBestMove("O");
                
                // Try to block player X if no winning move
                if (bestMove === null) {
                    bestMove = findBestMove("X");
                }
                
                // Prefer center position if available
                if (bestMove === null && availableMoves.includes(4)) {
                    bestMove = 4;
                }
                
                // Prefer corners if available
                const corners = [0, 2, 6, 8];
                if (bestMove === null) {
                    let openCorners = corners.filter(corner => availableMoves.includes(corner));
                    if (openCorners.length > 0) {
                        bestMove = openCorners[Math.floor(Math.random() * openCorners.length)];
                    }
                }
                
                // Prefer edges if available
                const edges = [1, 3, 5, 7];
                if (bestMove === null) {
                    let openEdges = edges.filter(edge => availableMoves.includes(edge));
                    if (openEdges.length > 0) {
                        bestMove = openEdges[Math.floor(Math.random() * openEdges.length)];
                    }
                }
                
                // Pick a random move if no strategic move is available
                if (bestMove === null) {
                    bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
                }
                
                // Make the move
                board[bestMove] = "O";
                let cell = document.querySelectorAll(".cell")[bestMove];
                cell.textContent = "O";
                cell.classList.add("taken");
                
                if (!checkWinner()) {
                    currentPlayer = "X";
                    statusElement.textContent = `Player ${currentPlayer}'s turn`;
                }
            }
        }

        /**
         * Finds the best move for the given player.
         * @param {string} player - The player ('X' or 'O').
         * @returns {number|null} The index of the best move, or null if none found.
         */
        function findBestMove(player) {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            
            for (let combination of winningCombinations) {
                const [a, b, c] = combination;
                if (board[a] === player && board[b] === player && board[c] === "") return c;
                if (board[a] === player && board[c] === player && board[b] === "") return b;
                if (board[b] === player && board[c] === player && board[a] === "") return a;
            }
            return null;
        }

        function createBoard() {
            boardElement.innerHTML = "";
            board.forEach((cell, index) => {
                const cellElement = document.createElement("div");
                cellElement.classList.add("cell");
                cellElement.addEventListener("click", () => makeMove(index, cellElement));
                boardElement.appendChild(cellElement);
            });
        }

        function resetGame() {
            board = ["", "", "", "", "", "", "", "", ""];
            currentPlayer = "X";
            statusElement.textContent = "Player X's turn";
            createBoard();
        }

        createBoard();