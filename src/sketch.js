let snake;
let snakeScale = 30;

let food;

function setup() { 
  createCanvas(600, 600);
  frameRate(10);
  snake = new Snake;
  food = pickLocation();
}

function draw() {
  background(51);
  snake.death();
  snake.update();
  snake.show();

  if (snake.eat(food)) {
    food = pickLocation();
  }

  fill(255, 0, 100);
  rect(food.x, food.y, snakeScale, snakeScale);
}

function pickLocation() {
  let cols = floor(width/snakeScale);
  let rows = floor(height/snakeScale);

  return createVector(floor(random(cols)) * snakeScale, 
                      floor(random(rows)) * snakeScale);
}


function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir(1, 0);
  }
}

class Snake {
  constructor() {
    this.x = 0;
    this.y = 0
    this.xspeed = 1;
    this.yspeed = 0;
    this.tail = [];
    this.total = 0;
  }

  update() {
    // for (let i = 0; i < this.total; i++) {
    //   this.tail[i] = this.tail[i+1];
    // }
    // this.tail[this.total-1] = createVector(this.x, this.y);
    // this.tail.push(createVector(this.x, this.y));  
    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++ ) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x += this.xspeed * snakeScale;
    this.y += this.yspeed * snakeScale;

    this.x = constrain(this.x, 0, width - snakeScale);
    this.y = constrain(this.y, 0, height - snakeScale);

  }

  show() {
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, snakeScale, snakeScale);
    }
    rect(this.x, this.y, snakeScale, snakeScale);
  }

  dir(x, y) {
    if (x == -this.xspeed) return;
    if (y == -this.yspeed) return;
    this.xspeed = x;
    this.yspeed = y;
  }

  eat(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  death() {
    for (let i = 0; i < this.tail.length; i++) {
      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        // we ded
        this.total = 0;
        this.tail = [];
      }
    }
  }
}
