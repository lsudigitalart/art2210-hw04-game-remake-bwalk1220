let eX, eY, eS, eSpeed;
let playerX, playerY, playerSize;
let speed = 5;
let bgColor;
let gameOver = false;
let stars = []; // Array to hold star positions
let starOffset = 0; // Track star movement

function setup() {
  createCanvas(250, 600);
  // Initialize player position
  playerX = width / 2;
  playerY = height - 50;
  playerSize = 40;
  
  // Initialize enemy
  eS = 50;
  eX = random(width);
  eY = -eS/2;
  eSpeed = 5;
  bgColor = color(10, 10, 30); // Dark space blue
  gameOver = false;
  starOffset = 0;
  
  // Create stars
  createStars();
}

function draw() {
  // Draw space background
  background(bgColor);
  
  // Draw moving stars
  drawMovingStars();
  
  // Draw outer border
  stroke(100, 100, 150);
  strokeWeight(3);
  noFill();
  rect(0, 0, width, height);
  noStroke();

  if (!gameOver) {
    // Update game state only if game is running
    eY += eSpeed;
    if (eY > height) {
      eY = -eS/2;
      eX = random(width);
    } 
    eSpeed = eSpeed + 0.01;
    
    // Update star animation based on enemy speed
    starOffset += eSpeed * 0.5;
    if (starOffset > height) {
      starOffset = 0;
    }

    // Handle input only if game is running
    if (keyIsDown(LEFT_ARROW)) {
      playerX -= speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      playerX += speed;
    }
    if (keyIsDown(UP_ARROW)) {
      playerY -= speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      playerY += speed;
    }
    
    // Keep player within canvas bounds
    playerX = constrain(playerX, playerSize/2, width - playerSize/2);
    playerY = constrain(playerY, playerSize/2, height - playerSize/2);

    // Check for collisions
    if (dist(playerX, playerY, eX, eY) < (playerSize + eS) / 2) {
      bgColor = color(100, 20, 20); // Dark red space
      gameOver = true;
    }
  }

  // Draw player (blue spaceship)
  drawSpaceship(playerX, playerY, playerSize, color(100, 150, 255));
  
  // Draw enemy (red spaceship)
  drawSpaceship(eX, eY, eS, color(255, 100, 100));
  
  // Display UI
  fill(200, 200, 255);
  textSize(16);
  text('Speed: ' + eSpeed.toFixed(1), 10, 30);
  
  if (gameOver) {
    // Draw game over text
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(255, 255, 100);
    stroke(0);
    strokeWeight(2);
    text('GAME OVER', width / 2, height / 2);
    textSize(16);
    text('Press SPACE to restart', width / 2, height / 2 + 30);
    noStroke();
    textAlign(LEFT, BASELINE);
  } else {
    text('Use arrow keys to move', 10, height - 20);
    text('Press SPACE to reset', 10, height - 40);
  }
}

function createStars() {
  stars = [];
  // Create random star positions
  for (let i = 0; i < 50; i++) {
    stars.push({
      x: random(width),
      y: random(height * 2), // Extra height for scrolling
      size: random(1, 3),
      brightness: random(150, 255)
    });
  }
}

function drawMovingStars() {
  // Draw stars that move downward
  for (let star of stars) {
    fill(star.brightness, star.brightness, star.brightness);
    noStroke();
    ellipse(star.x, (star.y + starOffset) % (height + 50) - 50, star.size);
  }
}

function drawSpaceship(x, y, size, shipColor) {
  push();
  translate(x, y);
  
  // Main body
  fill(shipColor);
  noStroke();
  ellipse(0, 0, size * 0.8, size);
  
  // Cockpit/center
  fill(255, 255, 255, 150);
  ellipse(0, -size * 0.1, size * 0.3, size * 0.4);
  
  // Engine glow (only for player moving up)
  if (y > height - 100) { // Assuming this is the player
    fill(100, 200, 255, 100);
    ellipse(0, size * 0.4, size * 0.4, size * 0.2);
  }
  
  pop();
}

function resetGame() {
  // Reset player position
  playerX = width / 2;
  playerY = height - 50;
  
  // Reset enemy
  eS = 50;
  eX = random(width);
  eY = -eS/2;
  eSpeed = 5;
  bgColor = color(10, 10, 30);
  gameOver = false;
  starOffset = 0;
  
  // Regenerate stars
  createStars();
} 

function keyPressed() {
  if (key === ' ') { // Spacebar
    resetGame();
  }
}