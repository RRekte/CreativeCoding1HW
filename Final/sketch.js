function setup() {
    createCanvas(800, 600);
    background(10, 10, 40); // deep blue space background
  
    drawNebula(600, 200, 50, [
      [100, 50, 150],
      [60, 30, 120],
      [120, 80, 180]
    ]);
  
    drawStars(2500);
  
    // Star Destroyer in the background
    drawStarDestroyer(500, 150, 0.7);
  
    noLoop();
  
    drawDeathStar(width / 2, height / 2, 320);
    drawVader(width / 2 - 50, height / 2 - 55);
  }
  
  function drawNebula(x, y, numEllipses, colors) {
    noStroke();
    for (let i = 0; i < numEllipses; i++) {
      let c = random(colors);
      fill(c[0], c[1], c[2], random(20, 80));
      let w = random(80, 200);
      let h = random(50, 150);
      ellipse(x + random(-100, 100), y + random(-80, 80), w, h);
    }
  }
  
  function drawStars(count) {
    stroke(255);
    for (let i = 0; i < count; i++) {
      let x = random(width);
      let y = random(height);
      let starSize = random(1, 3);
      point(x, y);
      if (random() < 0.1) {
        fill(255, 180);
        noStroke();
        ellipse(x, y, starSize);
      }
    }
  }
  
  function drawStarDestroyer(x, y, scaleFactor = 1) {
    push();
    translate(x, y);
    scale(scaleFactor);
    noStroke();
    fill(100, 100, 120, 150); // grayish with transparency
  
    // Main triangle body
    beginShape();
    vertex(-60, 30);
    vertex(60, 30);
    vertex(0, -50);
    endShape(CLOSE);
  
    // Bridge tower
    rect(-10, -50, 20, -20);
  
    // Command tower
    rect(-6, -70, 12, -10);
  
    // Antenna domes
    fill(150, 150, 180, 180);
    ellipse(-4, -75, 5, 5);
    ellipse(4, -75, 5, 5);
  
    pop();
  }
  
  function drawDeathStar(x, y, r) {
    push();
    fill(230);
    stroke(0);
    strokeWeight(2);
    ellipse(x, y, r);
  
    fill(100);
    ellipse(x + r * 0.25, y - r * 0.25, r * 0.3);
  
    stroke(80);
    for (let angle = 0; angle < TWO_PI; angle += PI / 8) {
      let x1 = x + r * 0.25 + cos(angle) * r * 0.15;
      let y1 = y - r * 0.25 + sin(angle) * r * 0.15;
      let x2 = x + r * 0.25 + cos(angle) * r * 0.3;
      let y2 = y - r * 0.25 + sin(angle) * r * 0.3;
      line(x1, y1, x2, y2);
    }
  
    stroke(50);
    strokeWeight(4);
    line(x - r / 2, y + r * 0.15, x + r / 2, y + r * 0.15);
  
    noStroke();
    fill(180);
    for (let i = 0; i < 20; i++) {
      let px = x + random(-r * 0.45, r * 0.45);
      let py = y + random(-r * 0.45, r * 0.45);
      rect(px, py, random(8, 20), random(3, 8));
    }
  
    stroke(100);
    strokeWeight(1.5);
    for (let i = 0; i < 100; i++) {
      point(x + random(-r / 2, r / 2), y + random(-r / 2, r / 2));
    }
    pop();
  }
  
  function drawVader(x, y, scaleX = 1.5, scaleY = 1.1) {
    push();
    translate(x, y);
    scale(scaleX, scaleY);
  
    // Helmet
    fill(20);
    stroke(0);
    beginShape();
    vertex(-38, -55);
    bezierVertex(-65, -90, 65, -90, 38, -55);
    bezierVertex(60, -10, 50, 60, 35, 80);
    bezierVertex(0, 80, -35, 80, -35, 80);
    bezierVertex(-50, 60, -60, -10, -38, -55);
    endShape(CLOSE);
  
    // Helmet contour lines
    stroke(50);
    for (let i = -35; i <= 35; i += 10) {
      line(i, -50, i * 0.7, 40);
    }
  
    stroke(60);
    strokeWeight(2);
    for (let i = -35; i <= 35; i += 12) {
      line(i, -45, i, 75);
    }
  
    // Forehead ridge
    stroke(30);
    strokeWeight(3);
    noFill();
    beginShape();
    vertex(-18, -55);
    bezierVertex(-30, -75, 30, -75, 18, -55);
    endShape();
  
    stroke(60);
    noFill();
    beginShape();
    vertex(-35, -65);
    bezierVertex(-25, -75, 25, -75, 35, -65);
    endShape();
  
    // Cheek insets
    noStroke();
    fill(10);
    beginShape();
    vertex(-35, -5);
    bezierVertex(-45, 15, -40, 55, -25, 75);
    vertex(-10, 70);
    bezierVertex(-15, 45, -15, 3, -25, -5);
    endShape(CLOSE);
  
    beginShape();
    vertex(35, -5);
    bezierVertex(45, 15, 40, 55, 25, 75);
    vertex(10, 70);
    bezierVertex(15, 45, 15, 3, 25, -5);
    endShape(CLOSE);
  
    // Mouth grille (upside-down triangle)
    fill(0);
    beginShape();
    vertex(-16, 36);
    vertex(0, 24);
    vertex(16, 36);
    endShape(CLOSE);
  
    // Flipped triangle below mouth (lighter)
    fill(80);
    beginShape();
    vertex(-10, 40);
    vertex(0, 50);
    vertex(10, 40);
    endShape(CLOSE);
  
    // Angled lines next to mouth
    stroke(60);
    line(-16, 36, -22, 50);
    line(16, 36, 22, 50);
  
    // Eyes (compact & darker)
    fill(20);
    stroke(0);
    push();
    rotate(radians(-5));
    ellipse(-16, -10, 24, 14);
    pop();
  
    push();
    rotate(radians(5));
    ellipse(16, -10, 24, 14);
    pop();
  
    // Small horizontal lines below eyes
    stroke(60);
    let eyeY = -10;
    line(-10, eyeY + 8, 10, eyeY + 8);
    line(-10, eyeY + 16, 10, eyeY + 16);
    line(-8, eyeY + 24, 8, eyeY + 24);
  
    // Gray triangles above mouth
    fill(100);
    noStroke();
    beginShape();
    vertex(-18, 32);
    vertex(0, 20);
    vertex(-18, 20);
    endShape(CLOSE);
  
    beginShape();
    vertex(18, 32);
    vertex(0, 20);
    vertex(18, 20);
    endShape(CLOSE);
  
    pop();
  }