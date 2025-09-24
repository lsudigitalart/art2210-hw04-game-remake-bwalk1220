let eX, eY, eS, eSpeed;
let playerX, playerY, playerSize;
let speed = 5;
let bgColor;

function setup() {
  createCanvas(300, 600);
  // Initialize player position
  playerX = width / 2;
  playerY = height - 50;
  playerSize = 40;
  
  // Initialize enemy
  eS = 50;
  eX = random(width);
  eY = -eS/2;
  eSpeed = 5;
  bgColor = 'white';
}

function draw() {
  // 1. Update game state
  eY += eSpeed;
  if (eY > height) {
    eY = -eS/2;
    eX = random(width);
  } 
  eSpeed = eSpeed + 0.01;

  // 2. Check for collisions
  if (dist(playerX, playerY, eX, eY) < (playerSize + eS) / 2) {
    bgColor = 'red';
  }

  // 3. Handle input
  // Continuous movement while keys are held
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

  // 4. Draw everything
  background(bgColor);
  stroke('black');
  strokeWeight(10);
  noFill();
  rect(0, 0, width, height);
  noStroke();

  // Draw player (blue circle)
  fill('blue');
  ellipse(playerX, playerY, playerSize);
  
  // Draw enemy (red circle)
  fill('red');
  ellipse(eX, eY, eS);
  
  // 5. Display UI (score, health, etc.)
  fill('black');
  textSize(16);
  text('Speed: ' + eSpeed.toFixed(1), 10, 30);
  text('Use arrow keys to move', 10, height - 20);
  text('Press SPACE to reset', 10, height - 40);
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
  bgColor = 'white';
} 

function keyPressed() {
  if (key === ' ') { // Spacebar
    resetGame();
  }
}