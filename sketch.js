  let eX, eY, eS, eSpeed;
  let carX = 400;
  let carY = 300;
  let carSize = 40;
  let speed = 5;

function setup() {
  createCanvas(300, 600);
  eS = 50;
  eX = random(width);
  eY = -eS/2;
  eSpeed = 5;
  bgColor = 'white';
}

function draw() {
// 1. Update game state

// 2. Check for collisions

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
// 4. Draw everything
background(bgColor);
  stroke('black');
  strokeWeight(10);
  noFill();
  rect(0, 0, width, height);
  noStroke();

  fill('black');
  ellipse(mouseX, mouseY, 50);
  fill('red');
  ellipse(eX, eY, 50);
  eY += eSpeed;
  if (eY > height) {
    eY = 0;
    eX = random(width);
  } 
  eSpeed = eSpeed + 0.01;

  if (dist(mouseX, mouseY, eX, eY) < 25) {
    bgColor = 'red';
  }
  
}

function resetGame() {
  eS = 50;
  eX = -eS/2;
  eY = random(height);
  eSpeed = 5;
  bgColor = 'white';
} 

function keyPressed() {
  if (key === ' ') { // Spacebar
    resetGame();
// 5. Display UI (score, health, etc.)

  
  }
}