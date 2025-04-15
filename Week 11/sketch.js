let player;
let obstacles = [];
let exitZone;
let message = '';

function setup() {
  createCanvas(600, 400);
  player = createVector(50, height / 2);
  
  for (let i = 0; i < 4; i++) {
    obstacles.push({
      pos: createVector(random(width), random(height)),
      size: random(20, 50),
      speed: random(-2, 2),
      color: color(random(255), random(255), random(255))
    });
  }

  exitZone = createVector(width - 50, height / 2);
}

function draw() {
  background(220);

  // Draw player
  fill(0, 100, 255);
  ellipse(player.x, player.y, 30, 30);

  // Move player
  if (keyIsDown(LEFT_ARROW)) player.x -= 3;
  if (keyIsDown(RIGHT_ARROW)) player.x += 3;
  if (keyIsDown(UP_ARROW)) player.y -= 3;
  if (keyIsDown(DOWN_ARROW)) player.y += 3;

  // Draw and move obstacles
  for (let obs of obstacles) {
    fill(obs.color);
    ellipse(obs.pos.x, obs.pos.y, obs.size);

    obs.pos.x += obs.speed;

    // Wrap around
    if (obs.pos.x > width) obs.pos.x = 0;
    if (obs.pos.x < 0) obs.pos.x = width;
  }

  // Static obstacle on mouse click
  if (mouseIsPressed) {
    fill(100);
    rect(width / 2, height / 2, 20, 80);
  }

  // Exit
  fill(0, 255, 0);
  rect(exitZone.x, exitZone.y, 30, 30);

  // Check win condition
  if (player.x > exitZone.x && player.y > exitZone.y &&
      player.x < exitZone.x + 30 && player.y < exitZone.y + 30) {
    message = "You Won!";
  }

  // Display win message
  fill(0);
  textSize(24);
  text(message, 20, 30);
}           