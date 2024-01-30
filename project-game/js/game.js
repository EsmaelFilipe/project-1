class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.animationSpeed = 6;
    this.enemies = [];
    this.player = new Player(
      this.gameScreen,
      200,
      500,
      100,
      150,
      "../images/new luffy.png"
    );
    this.height = 600;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.isPushingObstacle = false;
    this.gameIsOver = false;
    
  }

  spawnEnemy() {
    const enemy = new Enemy();
    this.enemies.push(enemy);
  }

  updateEnemySpeed(speed) {
    for (const enemy of this.enemies) {
      enemy.speed = speed;
    }
  }

  increaseObstacleSpeed() {
    this.animationSpeed += 0.5;
    if (this.animationSpeed < 2) {
      this.animationSpeed = 2;
    }
  }

  updateAnimationSpeed() {
    const keyframes = `slide ${this.animationSpeed}s linear infinite`;
    this.gameScreen.style.animation = keyframes;
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameLoop();
  }

  gameLoop() {
    if (this.gameIsOver) {
      return;
    }
    this.update();
    window.requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    let score = document.getElementById("score");
    let lives = document.getElementById("lives");

    this.player.move();

    for (let i = 0; i < this.obstacles.length; i++) {
        const obstacle = this.obstacles[i];
        obstacle.move();

        if (this.player.didCollide(obstacle)) {
            obstacle.element.remove();
            //this.obstacles.splice(i, 1);

            if (obstacle.element.src.includes("flamingo") || obstacle.element.src.includes("katakuri") || obstacle.element.src.includes("blackbeard")) {
                // If collided with enemy image, lose a life
                this.lives--;

                // If no lives left, end the game
                if (this.lives <= 0) {
                    this.endGame();
                    return; // Exit the function to stop the game loop
                }
            } else if (obstacle.element.src.includes("meat") || obstacle.element.src.includes("soup")|| obstacle.element.src.includes("spaghetti")) {
                // If collided with food image, score 5 points
                
                this.score +=5;
            }
        } else if (obstacle.top > this.height) {
            // Check if the obstacle is beyond the screen
            obstacle.element.remove();
            this.obstacles.splice(i, 1);
        }
    }

    if (this.lives <= 0) {
        this.endGame();
    }

    if (this.score % 5 === 0 && this.score > 0) {
        this.increaseObstacleSpeed();
    }

    this.updateAnimationSpeed();

    if (!this.obstacles.length && !this.isPushingObstacle) {
        this.isPushingObstacle = true;
        setTimeout(() => {
            this.obstacles.push(new Obstacle(this.gameScreen));
            this.isPushingObstacle = false;
        }, 150);
    }

    score.innerHTML = this.score;
    lives.innerHTML = this.lives;
}

  endGame() {
    this.gameIsOver = true;
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => {
      obstacle.element.remove();
    });
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}