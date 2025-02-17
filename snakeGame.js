const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const startMessage = document.getElementById("startMessage");
        const scoreElement = document.getElementById("score");
        
        let snake, direction, food, gameOver, gameStarted, speed, score;
        
        /**
         * Initializes the game state.
         */
        function initGame() {
            snake = [{ x: 300, y: 300 }]; // Initial position in the center
            direction = "RIGHT";
            food = { x: Math.floor(Math.random() * 30) * 20, y: Math.floor(Math.random() * 30) * 20 };
            gameOver = false;
            gameStarted = false;
            speed = 170;
            score = 0;
            scoreElement.textContent = "Score: " + score; 
            startMessage.style.display = "block";
        }
        
        document.addEventListener("keydown", startGame);
        
        /**
         * Starts the game on first key press or restarts after game over.
         */
        function startGame(event) {
            if (gameOver) {
                initGame();
            }
            if (!gameStarted) {
                gameStarted = true;
                startMessage.style.display = "none";
                document.addEventListener("keydown", changeDirection);
                gameLoop();
            }
            changeDirection(event);
        }
        
        /**
         * Handles snake movement direction changes.
         */
        function changeDirection(event) {
            if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
            if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
            if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
            if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
        }
        
        /**
         * Updates snake position and checks for collisions.
         */
        function updateGame() {
            if (gameOver) return;
            
            let head = { ...snake[0] };
            if (direction === "UP") head.y -= 20;
            if (direction === "DOWN") head.y += 20;
            if (direction === "LEFT") head.x -= 20;
            if (direction === "RIGHT") head.x += 20;
            
            snake.unshift(head);
            
            // Check if the snake eats the food
            if (head.x === food.x && head.y === food.y) {
                food = { x: Math.floor(Math.random() * 30) * 20, y: Math.floor(Math.random() * 30) * 20 };
                score +=10;
                scoreElement.textContent = "Score: " + score;
            } else {
                snake.pop();
            }
            
            // Check if the snake hits the wall or itself
            if (head.x < 0 || head.x >= 600 || head.y < 0 || head.y >= 600 || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
                gameOver = true;
                alert("Game Over! Press any key to restart.");
            }
        }
        
        /**
         * Draws the game board, snake, and food with emojis.
         */
        function drawGame() {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = "20px Arial";
            ctx.fillText("🍎", food.x + 5, food.y + 15);
            
            ctx.fillStyle = "green";
            snake.forEach((segment, index) => {
                ctx.beginPath();
                ctx.arc(segment.x + 10, segment.y + 10, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = "darkgreen";
                ctx.stroke();
            });
        }
        
        /**
         * Runs the game loop at a defined speed.
         */
        function gameLoop() {
            if (!gameOver) {
                updateGame();
                drawGame();
                setTimeout(gameLoop, speed);
            }
        }
        
        // Initialize game on page load
        initGame();