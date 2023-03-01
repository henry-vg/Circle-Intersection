const numCircles = 20,
  circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < numCircles; i++) {
    const r = random(30, 120),
      x = random(r, width - r),
      y = random(r, height - r),
      a = random(TWO_PI),
      v = random(0.5, 4);
    circles.push(new circleObject(x, y, r, a, v));
  }
}

function draw() {
  background(255);

  for (let i = 0; i < circles.length; i++) {
    circles[i].show();

    circles[i].x += circles[i].v * cos(circles[i].a);

    circles[i].y += circles[i].v * sin(circles[i].a);

    if (circles[i].x <= circles[i].r || circles[i].x >= width - circles[i].r) {
      circles[i].a *= -1;
      circles[i].v *= -1;
    }
    if (circles[i].y <= circles[i].r || circles[i].y >= height - circles[i].r) {
      circles[i].a *= -1;
    }

    for (let j = 0; j < circles.length; j++) {
      if (j != i) {
        const intersection = circlesIntersection(circles[i].x, circles[i].y, circles[i].r, circles[j].x, circles[j].y, circles[j].r);

        strokeWeight(1);
        stroke(0, 100);

        if (intersection !== null) {
          line(intersection[0][0], intersection[1][0], intersection[0][1], intersection[1][1]);
        }
      }
    }
  }
}

function circleObject(x, y, r, a, v) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.a = a;
  this.v = v;
  this.show = function () {
    noFill();
    strokeWeight(2);
    stroke(0);
    circle(this.x, this.y, this.r * 2);
  }
}

function circlesIntersection(x0, y0, r0, x1, y1, r1) {
  const d = dist(x0, y0, x1, y1),
    a = (r0 * r0 - r1 * r1 + d * d) / (2 * d),
    h = sqrt(r0 * r0 - a * a),
    x2 = x0 + a * (x1 - x0) / d,
    y2 = y0 + a * (y1 - y0) / d;

  if (d > r0 + r1 || d < abs(r0 - r1) || (d == 0 && r0 == r1)) {
    return null;
  }

  const x3 = [x2 + h * (y1 - y0) / d, x2 - h * (y1 - y0) / d],
    y3 = [y2 - h * (x1 - x0) / d, y2 + h * (x1 - x0) / d];

  return [x3, y3];
}