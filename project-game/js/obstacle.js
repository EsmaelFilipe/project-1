class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.width = 70;
        this.height = 80;
        this.left = Math.floor(Math.random() * 300 + 70);
        this.top = 0;

        const enemyImages = [
            "./images/flamingo.png",
            "./images/katakuri.png",
            "./images/blackbeard.png"
        ];
        const foodImages = [
            "./images/fruit.png",
            "./images/meat.png",
            "./images/soup.png"
        ];

        const isEnemy = Math.random() < 0.5;
        const imagesArray = isEnemy ? enemyImages : foodImages;

        const randomArrayElementIndex = Math.floor(Math.random() * imagesArray.length);
        const randomArrayElement = imagesArray[randomArrayElementIndex];

        this.element = document.createElement("img");
        this.element.src = randomArrayElement;
        this.element.className = "obstacle"; // Add a class for styling purposes
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        this.gameScreen.appendChild(this.element);
        this.move();

        
    }

    move() {
        this.top += 3;
        this.updatePosition();

/*         

        if (this.top < window.innerHeight) {
            requestAnimationFrame(() => this.move());
        } else {
            this.element.remove(); // Remove the obstacle when it goes beyond the screen
        } */
    }


    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

/*         requestAnimationFrame(() => this.move()); */
    }
}

// Create an instance of the Game and start it
//const game = new Game();
//game.start();

console.log("Game started!");