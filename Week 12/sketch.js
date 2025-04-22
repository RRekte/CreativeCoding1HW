let player;
let obstacles = [];
let mouseObjects = [];
let exitZone;
let win = false;

function setup() {
  createCanvas(800, 600);
  createPlayer();
  createObstacles();
  createExit();
}

function draw() {
  background(220);
  drawBorders();
  movePlayer();
  drawPlayer();
  drawObstacles();
  moveObstacles();
  drawExit();

  for (let obj of mouseObjects) {
    ellipse(obj.x, obj.y, 20, 20);
  }

  if (player.x > exitZone.x && player.x < exitZone.x + exitZone.w &&
      player.y > exitZone.y && player.y < exitZone.y + exitZone.h) {
    displayWinMessage();
  }
}

// --- FUNCTIONS ---

function createPlayer() {
  player = { x: 50, y: 50, size: 30, speed: 5 };
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
  mouseObjects.push({ x: mouseX, y: mouseY });
}

function createObstacles() {
  obstacles.push({ x: 100, y: 100, w: 40, h: 40, col: 'red', vx: 2, vy: 1 });
  obstacles.push({ x: 300, y: 300, w: 60, h: 60, col: 'green', vx: -1, vy: 2 });
}

function drawObstacles() {
  for (let obs of obstacles) {
    fill(obs.col);
    rect(obs.x, obs.y, obs.w, obs.h);
  }
}

function moveObstacles() {
  for (let obs of obstacles) {
    obs.x += obs.vx;
    obs.y += obs.vy;

    if (obs.x > width) obs.x = 0;
    if (obs.x < 0) obs.x = width;
    if (obs.y > height) obs.y = 0;
    if (obs.y < 0) obs.y = height;
  }
}

function drawBorders() {
  stroke(0);
  noFill();
  rect(0, 0, width, height);
}

function createExit() {
  exitZone = { x: width - 100, y: height - 100, w: 80, h: 80 };
}

function drawExit() {
  fill(255, 255, 0);
  rect(exitZone.x, exitZone.y, exitZone.w, exitZone.h);
}

function displayWinMessage() {
  fill(0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("You Win!", width / 2, height / 2);
}