let eX, eY, eS, eSpeed;
let playerX, playerY, playerSize;
let speed = 8;
let bgColor;
let gameOver = false;
let gameStarted = false; // Add game state variable
let stars = [];
let starOffset = 0;
let playerTrail = []; // Array to store player trail positions
let enemyTrail = [];  // Array to store enemy trail positions

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
  bgColor = color(10, 10, 30);
  gameOver = false;
  gameStarted = false; // Game hasn't started yet
  starOffset = 0;
  
  // Initialize trails
  playerTrail = [];
  enemyTrail = [];
  
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

  if (!gameStarted) {
    // Show start screen
    drawStartScreen();
    return; // Exit draw function early
  }

  if (!gameOver) {
    // Update game state only if game is running
    eY += eSpeed;
    if (eY > height) {
      eY = -eS/2;
      eX = random(width);
      enemyTrail = []; // Clear enemy trail when it resets
    } 
    eSpeed = eSpeed + 0.005;
    
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

    // Update trails
    updateTrail(playerTrail, playerX, playerY + playerSize/2);
    updateTrail(enemyTrail, eX, eY - eS/2); 

    // Check for collisions
    if (dist(playerX, playerY, eX, eY) < (playerSize + eS) / 2) {
      bgColor = color(100, 20, 20);
      gameOver = true;
    }
  }

  // Draw trails first (behind spaceships)
  drawTrail(playerTrail, color(100, 150, 255, 150)); // Blue trail
  drawTrail(enemyTrail, color(255, 100, 100, 150));  // Red trail

  // Draw player (blue spaceship)
  drawSpaceship(playerX, playerY, playerSize, color(100, 150, 255));
  
  // Draw enemy (red spaceship)
  drawSpaceship(eX, eY, eS, color(255, 100, 100));
  
  // Display UI
  fill(200, 200, 255);
  textSize(16);
  text('Score: ' + eSpeed.toFixed(1), 10, 30);
  
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
    text('Use arrow keys to move', 10, 50);
    text('Press SPACE to reset', 10, 70);
  }
}

function drawStartScreen() {
  // Draw title and instructions
  textAlign(CENTER, CENTER);
  
  // Game title
  textSize(32);
  fill(100, 150, 255);
  stroke(0);
  strokeWeight(2);
  text('SPACE', width / 2, height / 2 - 60);
  
  // Instructions
  textSize(18);
  fill(255, 255, 255);
  text('Avoid the red ships!', width / 2, height / 2 - 20);
  
  textSize(16);
  fill(200, 200, 255);
  text('Use arrow keys to move', width / 2, height / 2 + 10);
  
  // Start prompt
  textSize(20);
  fill(255, 255, 100);
  text('PRESS SPACE TO START', width / 2, height / 2 + 50);
  
  noStroke();
  textAlign(LEFT, BASELINE); // Reset alignment
  
  // Draw static player ship as preview
  drawSpaceship(width / 2, height / 2 + 100, playerSize, color(100, 150, 255));
}

function updateTrail(trail, x, y) {
  // Add current position to trail
  trail.push({x: x, y: y, age: 0});
  
  // Update existing trail particles - move them down
  for (let i = 0; i < trail.length; i++) {
    trail[i].y += 3; // Move trail particles downward
    trail[i].age += 1; // Increase age for fading
  }
  
  // Remove old trail points that are too old or off screen
  for (let i = trail.length - 1; i >= 0; i--) {
    if (trail[i].age > 40 || trail[i].y > height + 20) {
      trail.splice(i, 1);
    }
  }
}

function drawTrail(trail, trailColor) {
  for (let i = 0; i < trail.length; i++) {
    let particle = trail[i];
    let alpha = map(particle.age, 0, 40, 120, 0); // Fade out over time
    let size = map(particle.age, 0, 50, 15, 7); // Shrink over time
    
    // Only draw if still visible
    if (alpha > 0) {
      // Outer glow
      fill(red(trailColor), green(trailColor), blue(trailColor), alpha * 0.3);
      ellipse(particle.x, particle.y, size * 1.5);
      
      // Inner bright core
      fill(red(trailColor), green(trailColor), blue(trailColor), alpha);
      ellipse(particle.x, particle.y, size);
    }
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
  ellipse(0, -size * 0, size * 0.3, size * 0.4);
  
  // Engine glow (only for player moving up)
  if (y > height - 100) { 
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
  gameStarted = true; // Start the game
  starOffset = 0;
  
  // Clear trails
  playerTrail = [];
  enemyTrail = [];
  
  // Regenerate stars
  createStars();
} 

function keyPressed() {
  if (key === ' ') { // Spacebar
    if (!gameStarted) {
      // Start the game for the first time
      gameStarted = true;
      resetGame();
    } else {
      // Reset/restart the game
      resetGame();
    }
  }
}