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

  BRICK_ROW_COLORS = [color(150,50,50),color(50,150,50),color(50,50,150),color(150,150,50),color(50,150,150)];

  paddle = new Paddle(width/2,height - PADDLE_HEIGHT*2,PADDLE_WIDTH,PADDLE_HEIGHT);
  ball = new Ball(width/2,height/2,BALL_SIZE,BALL_SIZE,BALL_SPEED);
  for (let x = 0; x < width; x += BRICK_WIDTH) {
    for (let y = 0; y < BRICK_ROWS; y++) {
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
// Description of draw()

function draw() {
  background(0);

  paddle.handleInput();
  paddle.update();

  ball.update();
  ball.collide(paddle);
  for (let i = 0; i < bricks.length; i++) {
    if (ball.collide(bricks[i])) {
      bricks[i].hit();
    }
  }
  ball.collideWalls();
  if (ball.isOffScreen()) {
    ball.reset();
  }

  paddle.display();
  ball.display();
  for (let i = 0; i < bricks.length; i++) {
    bricks[i].display();
  }
}
