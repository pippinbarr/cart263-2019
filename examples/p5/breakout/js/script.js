"use strict";

/*****************

Breakout
Pippin Barr

A basic implementatino of the game breakout, with a paddle, a ball that bounces,
of the paddle and bricks that break when the ball hits them.

******************/

// Paddle's dimensions and speed
const PADDLE_WIDTH = 72;
const PADDLE_HEIGHT = 16;
const PADDLE_SPEED = 8;

// Ball's dimensions and speed
const BALL_SIZE = 16;
const BALL_SPEED = 4;

// Constants for the collection of bricks and individual bricks
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

// Sound effect
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

// createPaddle()
//
// Sets up an object literal to track the key properties of a paddle
// - its position and velocity
// - its color
// - its dimensions
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

// createBall()
//
// Sets up an object literal to track the key properties of a ball
// - its position and velocity
// - its color
// - its dimensions
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

// createBricks()
//
// Runs a nested for loop to run horizontally and vertically through the bricks
// to generate for the wall, using createBrick() to create a brick in each
// location based on the dimensions of bricks
function createBricks() {
  for (let x = 0; x < width; x += BRICK_WIDTH) {
    for (let y = 0; y < BRICK_ROWS; y++) {
      bricks.push(createBrick(x,y));
    }
  }
}

// createBrick()
//
// Creates an object representing an individual brick in a specific location,
// defaults to active, sets its color based on its position
function createBrick(x,y) {
  let brick = {
    x: x,
    y: BRICK_TOP_OFFSET + y * BRICK_HEIGHT, // we calculate y based on offset and height of brick
    width: BRICK_WIDTH,
    height: BRICK_HEIGHT,
    color: BRICK_ROW_COLORS[y], // we can use y as an index into the colors because it counts from 0 to number of rows
    active: true
  };
  return brick;
}


// draw()
//
// Calls the various input, update and display functions required to run the game

function draw() {
  background(0);

  handleInput();

  updatePaddle();
  updateBall();

  displayPaddle();
  displayBall();
  displayBricks();
}

// handleInput()
//
// Checks which arrow keys are pressed and sets the paddle's velocity appropriately
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

// updatePaddle()
//
// Updates position with velocity then constrains paddle to remain on screen
function updatePaddle() {
  paddle.x += paddle.vx;

  paddle.x = constrain(paddle.x,0,width-paddle.width);
}

// updateBall()
//
// Updates position with velocity, then checks collisions and off screen
function updateBall() {
  // Move
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Check for collisions
  collidePaddleWalls();
  collideBallPaddle();
  collideBallBricks();

  // Check for offscreen and reset if so
  if (checkBallOffScreen()) {
    resetBall();
  }
}

// displayPaddle()
//
// Displays the paddle as a rectangle in appropriate location, dimensions, and color
function displayPaddle() {
  push();
  noStroke();
  fill(paddle.color);
  rect(paddle.x,paddle.y,paddle.width,paddle.height);
  pop();
}

// displayBall()
//
// Displays the ball as a square in appropriate location, dimensions, and color
function displayBall() {
  push();
  noStroke();
  fill(ball.color);
  rect(ball.x,ball.y,ball.width,ball.height);
  pop();
}

// displayBricks()
//
// Loops through all bricks and for each checks if it's active
// then displays it if so
function displayBricks() {
  for (let i = 0; i < bricks.length; i++) {
    let brick = bricks[i];

    if (!brick.active) {
      continue;
    }

    displayBrick(brick);
  }
}

// displayBrick(brick)
//
// Takes a brick as an argument and displays it according to its
// position, dimensions, and color
function displayBrick(brick) {
  push();
  fill(brick.color);
  noStroke();
  rect(brick.x,brick.y,brick.width,brick.height);
  pop();
}

// collidePaddleWalls()
//
// Checks if ball position means it moving off-screen to top, left, or right
// and reverses the appropriate velocity if so, plays SFX on bounce
function collidePaddleWalls() {
  // Check if off to left
  if (ball.x < 0) {
    ball.x = 0;
    ball.vx = -ball.vx;
    bounceSFX.play();
  }
  // check if ball is off to right
  else if (ball.x + ball.width > width) {
    ball.x = width - ball.width;
    ball.vx = -ball.vx;
    bounceSFX.play();
  }

  // check if ball is off top
  if (ball.y < 0) {
    ball.y = 0;
    ball.vy = -ball.vy;
    bounceSFX.play();
  }
}

// collideBallBricks()
//
// Loops through all bricks and checks for overlap with ball,
// if so reverses y velocity, disables the brick, plays SFX
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

// collideBallPaddle()
//
// Checks for overlap between ball and paddle, if so reverses ball y velocity
// sets its position to be flush with paddle, plays SFX
function collideBallPaddle() {
  if (ball.x + ball.width > paddle.x && ball.x < paddle.x + paddle.width) {
    if (ball.y + ball.height > paddle.y && ball.y < paddle.y + paddle.height) {
      ball.y = paddle.y - ball.height;
      ball.vy = -ball.vy;
      bounceSFX.play();
    }
  }
}

// checkBallOffScreen()
//
// Returns true if the ball is off the bottom of the screen (e.g. losing)
function checkBallOffScreen() {
  return (ball.y > height);
}

// resetBall()
//
// Moves the ball to the centre of the screen
function resetBall() {
  ball.x = width/2;
  ball.y = height/2;
}
