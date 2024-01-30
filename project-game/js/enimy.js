class Enemy {
  constructor() {
    this.gameScreen = gameScreen
    this.EnemyImage = EnemyImage

  // Random position
  this.left = Math.floor(Math.random()* 300 + 70);
  this.top = 0;
  this.width = 100;
  this.height = 150;

    const myEnemies = [
      "./images/flamingo.png",
      "./images/katakuri.png",
      "./images/blackbeard.png",
    ];

    // Choose a random image path
    const randomImagePath =
      myEnemies[Math.floor(Math.random() * myEnemies.length)];

    // create the HTML element and create default styling
    this.element = document.createElement("img");

    const radomArrayElementIndex = Math.floor(Math.random()*myEnemies.length);
    const radomArrayElement = myEnemies[radomArrayElementIndex]
    
    this.element.src = radomArrayElement;
      
       this.element.style.position = "absolute";
       this.element.style.width = `${this.width}px`;
       this.element.style.height = `${this.height}px`;
       this.element.style.left = `${this.left}px`;
       this.element.style.top = `${this.top}px`;
       
       this.gameScreen.appendChild(this.element);

    // Set the background image using CSS
    /*this.element.src = randomImagePath;
    this.element.style.position = "absolute";
    this.element.style.width = "100px"; // Adjust the width as needed
    this.element.style.height = "150px"; // Adjust the height as needed*/

    // Initial random position
    //this.left = Math.floor(Math.random() * 300 + 70);
    //this.top = 0;

    //this.element.style.left = `${this.left}px`;
    //this.element.style.top = `${this.top}px`;

    // Append the element to the game screen
    document.getElementById("game-screen").appendChild(this.element);

    this.moveRandom(); // Initial random movement
  }

  moveDown() {
    this.top += 3;
    this.updatePosition();
}

  moveRandom() {
    const currentLeft = parseInt(getComputedStyle(this.element).left);
    const randomMovement = (Math.random() - 0.5) * 10; // Adjust the randomness and speed as needed
    this.element.style.left = currentLeft + randomMovement + "px";

    // Ensure the enemy stays within the horizontal bounds
    const maxWidth =
      window.innerWidth - parseInt(getComputedStyle(this.element).width);
    this.element.style.left =
      Math.max(0, Math.min(maxWidth, parseInt(this.element.style.left))) + "px";

    // Schedule the next random movement
    setTimeout(() => this.moveRandom(), 1000); // Adjust the time interval as needed
  }
  updatePosition(){
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

}

}


console.log(myEnemies)
