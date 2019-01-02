"use strict";

/*****************

Breakout
Pippin Barr

A basic implementatino of the game breakout, with a paddle, a ball that bounces,
of the paddle and bricks that break when the ball hits them.

******************/

const PADDLE_WIDTH = 72;
const PADDLE_HEIGHT = 16;
const PADDLE_SPEED = 8;

const BALL_SIZE = 16;
const BALL_SPEED = 4;

const BRICK_TOP_OFFSET = 128;
const BRICK_ROWS = 5;
const BRICK_WIDTH = 64;
const BRICK_HEIGHT = 16;
const BRICK_ROW_COLORS = ['#cc2222','#22cc22','#2222cc','#cccc22','#22cccc'];

// Paddle
let paddle;
// Ball
let ball;
// Array for bricks
let bricks = [];

// Sound effects
let bounceSFX;

// preload()
//
// Load sounds

function preload() {
  bounceSFX = loadSound('assets/sounds/beep.wav');
}


// setup()
//
// Create the canvas and key entities

function setup() {
  createCanvas(640,480);

  createPaddle();
  createBall();
  createBricks();
}


function createPaddle() {
  paddle = {
    x: width/2,
    y: height - PADDLE_HEIGHT*2,
    vx: 0,
    color: '#ffffff',
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT
  };
}

function createBall() {
  ball = {
    x: width/2,
    y: height/2,
    vx: BALL_SPEED,
    vy: BALL_SPEED,
    color: '#ffffff',
    width: BALL_SIZE,
    height: BALL_SIZE
  }
}

function createBricks() {
  for (let x = 0; x < width; x += BRICK_WIDTH) {
    for (let y = 0; y < BRICK_ROWS; y++) {
      bricks.push(createBrick(x,y));
    }
  }
}

function createBrick(x,y) {
  let brick = {
    x: x,
    y: BRICK_TOP_OFFSET + y * BRICK_HEIGHT,
    width: BRICK_WIDTH,
    height: BRICK_HEIGHT,
    color: BRICK_ROW_COLORS[y],
    active: true
  };
  return brick;
}


// draw()
//
// Description of draw()

function draw() {
  background(0);

  handleInput();

  updatePaddle();
  updateBall();

  displayPaddle();
  displayBall();
  displayBricks();
}

function handleInput() {
  if (keyIsDown(LEFT_ARROW)) {
    paddle.vx = -PADDLE_SPEED;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    paddle.vx = PADDLE_SPEED;
  }
  else {
    paddle.vx = 0;
  }
}

function updatePaddle() {
  paddle.x += paddle.vx;

  paddle.x = constrain(paddle.x,0,width-paddle.width);
}

function updateBall() {
  ball.x += ball.vx;
  ball.y += ball.vy;

  collidePaddleWalls();
  collideBallPaddle();
  collideBallBricks();

  if (checkBallOffScreen()) {
    resetBall();
  }
}

function displayPaddle() {
  push();
  noStroke();
  fill(paddle.color);
  rect(paddle.x,paddle.y,paddle.width,paddle.height);
  pop();
}

function displayBall() {
  push();
  noStroke();
  fill(ball.color);
  rect(ball.x,ball.y,ball.width,ball.height);
  pop();
}

function displayBricks() {
  for (let i = 0; i < bricks.length; i++) {
    let brick = bricks[i];

    if (!brick.active) {
      continue;
    }

    push();
    fill(brick.color);
    noStroke();
    rect(brick.x,brick.y,brick.width,brick.height);
    pop();
  }
}

function collidePaddleWalls() {
  if (ball.x < 0) {
    ball.x = 0;
    ball.vx = -ball.vx;
    bounceSFX.play();
  }
  else if (ball.x + ball.width > width) {
    ball.x = width - ball.width;
    ball.vx = -ball.vx;
    bounceSFX.play();
  }

  if (ball.y < 0) {
    ball.y = 0;
    ball.vy = -ball.vy;
    bounceSFX.play();
  }
}

function collideBallBricks() {
  for (let i = 0; i < bricks.length; i++) {
    let brick = bricks[i];
    if (!brick.active) {
      continue;
    }
    if (ball.x + ball.width > brick.x && ball.x < brick.x + brick.width) {
      if (ball.y + ball.height > brick.y && ball.y < brick.y + brick.height) {
        ball.x -= ball.vx;
        ball.y -= ball.vy;
        brick.active = false;
        ball.vy = -ball.vy;
        bounceSFX.play();
      }
    }
  }
}

function collideBallPaddle() {
  if (ball.x + ball.width > paddle.x && ball.x < paddle.x + paddle.width) {
    if (ball.y + ball.height > paddle.y && ball.y < paddle.y + paddle.height) {
      ball.y = paddle.y - ball.height;
      ball.vy = -ball.vy;
      bounceSFX.play();
    }
  }
}

function checkBallOffScreen() {
  return (ball.y > height);
}

function resetBall() {
  ball.x = width/2;
  ball.y = height/2;
}
