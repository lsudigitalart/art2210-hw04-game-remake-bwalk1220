let eX, eY, eS, eSpeed;

function setup() {
  createCanvas(300, 600);
  eS = 50;
  eX = random(width);
  eY = -eS/2;
  eSpeed = 5;
  bgColor = 'white';
}

function draw() {
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
  }
}
