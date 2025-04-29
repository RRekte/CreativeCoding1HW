let player;
let obstacles = [];
let staticObstacles = [];
let exitArea;
let gameWon = false;

function setup() {
  createCanvas(800, 600);
  createPlayer();
  createObstacles(5); // Create at least 5 obstacles
  createExit();
}

function draw() {
  background(220);
  drawBorders();
  movePlayer();
  drawPlayer();
  moveObstacles();
  drawObstacles();
  drawStaticObstacles();
  drawExit();
  checkWin();
  displayWinMessage();
}

// --- Functions ---

function createPlayer() {
  player = { x: 50, y: 50, size: 20, speed: 5 };
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.speed;
  if (keyIsDown(UP_ARROW)) player.y -= player.speed;
  if (keyIsDown(DOWN_ARROW)) player.y += player.speed;
}

function drawPlayer() {
  fill(0, 0, 255);
  ellipse(player.x, player.y, player.size);
}

function mousePressed() {
  drawObject();
}

function drawObject() {
  staticObstacles.push({ x: mouseX, y: mouseY, size: random(10, 30), color: color(random(255), random(255), random(255)) });
}

function createObstacles(count) {
  for (let i = 0; i < count; i++) {
    obstacles.push({
      x: random(width),
      y: random(height),
      size: random(20, 50),
      color: color(random(255), random(255), random(255)),
      speedX: random(-2, 2),
      speedY: random(-2, 2)
    });
  }
}

function moveObstacles() {
  for (let obs of obstacles) {
    obs.x += obs.speedX;
    obs.y += obs.speedY;

    // Wrap around the screen
    if (obs.x > width) obs.x = 0;
    if (obs.x < 0) obs.x = width;
    if (obs.y > height) obs.y = 0;
    if (obs.y < 0) obs.y = height;
  }
}

function drawObstacles() {
  for (let obs of obstacles) {
    fill(obs.color);
    ellipse(obs.x, obs.y, obs.size);
  }
}

function drawStaticObstacles() {
  for (let obs of staticObstacles) {
    fill(obs.color);
    rect(obs.x, obs.y, obs.size, obs.size);
  }
}

function drawBorders() {
  noFill();
  stroke(0);
  strokeWeight(4);
  rect(0, 0, width, height);
}

function createExit() {
  exitArea = { x: width - 60, y: height - 60, w: 50, h: 50 };
}

function drawExit() {
  fill(0, 255, 0);
  rect(exitArea.x, exitArea.y, exitArea.w, exitArea.h);
}

function checkWin() {
  if (
    player.x > exitArea.x &&
    player.x < exitArea.x + exitArea.w &&
    player.y > exitArea.y &&
    player.y < exitArea.y + exitArea.h
  ) {
    gameWon = true;
  }
}

function displayWinMessage() {
  if (gameWon) {
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(0);
    text("You Win!", width / 2, height / 2);
    noLoop(); // Stop the game
  }
}