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
let BRICK_ROW_COLORS = [];

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

  // Sets up the colors of the five rows of bricks with p5's color() function
  BRICK_ROW_COLORS = [color(150,50,50),color(50,150,50),color(50,50,150),color(150,150,50),color(50,150,150)];

  // Create the paddle with its constructor
  paddle = new Paddle(width/2,height - PADDLE_HEIGHT*2,PADDLE_WIDTH,PADDLE_HEIGHT);
  // Create the ball with its constructor
  ball = new Ball(width/2,height/2,BALL_SIZE,BALL_SIZE,BALL_SPEED);
  // Double for loop to go through all brick positions
  for (let x = 0; x < width; x += BRICK_WIDTH) {
    for (let y = 0; y < BRICK_ROWS; y++) {
      // Randomly create either a normal Brick or a ToughBrick at this position with the appropriate constructor
      // Remember that both will work in the rest of the program because of Polymorphism - a ToughBrick extends
      // a normal Brick
      if (random(0,1) < 0.5) {
        bricks.push(new Brick(x,BRICK_TOP_OFFSET + y*BRICK_HEIGHT,BRICK_WIDTH,BRICK_HEIGHT,BRICK_ROW_COLORS[y]));
      }
      else {
        bricks.push(new ToughBrick(x,BRICK_TOP_OFFSET + y*BRICK_HEIGHT,BRICK_WIDTH,BRICK_HEIGHT,BRICK_ROW_COLORS[y],3));
      }
    }
  }
}

// draw()
//
// Handles the gameplay itself with appropriate methods on the objects involved

function draw() {
  // Clear the background for animation
  background(0);

  // Check for input and move the paddle
  paddle.handleInput();
  paddle.update();

  // Move the ball
  ball.update();
  // Check for collisions between ball and paddle
  ball.collide(paddle);
  // Loop through all bricks and check for collisions with the ball
  // Note that this is an array of both Bricks and ToughBricks, but
  // both kinds have collide() and hit() methods so this just works!
  for (let i = 0; i < bricks.length; i++) {
    if (ball.collide(bricks[i])) {
      // On collision, update the brick
      bricks[i].hit();
    }
  }
  // Check for collisions with the walls
  ball.collideWalls();
  // Check for ball off screen and reset if so
  if (ball.isOffScreen()) {
    ball.reset();
  }

  // Display all entities with their display() methods
  paddle.display();
  ball.display();
  for (let i = 0; i < bricks.length; i++) {
    bricks[i].display();
  }
}
