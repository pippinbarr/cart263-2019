"use strict";

/*****************

p5 Review
Pippin Barr

An extremely basic reminder of some core functions and behaviours of p5.

******************/


// A place to store our image of a clown
let clownImage;
// A place to store our sound of a dog barking
let barkSFX;

// An object literal to store information about our clown
// It has a position and velocity along with an image that represents
// it on the screen and a tint for that image
let clown = {
  x: 0,
  y: 0,
  vx: 5,
  vy: 5,
  image: null, // Start as null because it isn't loaded yet
  tint: undefined // Start as undefined because we can't use color() yet
}
// Note we can't use color() outside functions because p5 won't have been
// loaded before this code runs!

// A place to store the current background color
let backgroundColor;


// preload()
//
// This is for loading files before the program runs.

function preload() {
  // We load images with loadImage, specifying the relative path to the file
  // and putting the result into a variable
  clownImage = loadImage('assets/images/clown.png');

  // We load sounds with loadSound, specifying the relative path to the file
  // and putting the result into a variable. This requires the p5.sound library.
  barkSFX = loadSound('assets/sounds/bark.wav');
}


// setup()
//
// Runs ONCE automatically at the start of the program.

function setup() {
  // We use createCanvas() to create the canvas on the webpage which we'll
  // display all our visuals on
  createCanvas(640,480);

  // p5 has various "mode" functions to determine how drawing functions will work,
  // such as saying we want to display images by specifying their centre point
  imageMode(CENTER);

  // By the time we're in setup() the preload() has finished and so clownImage has loaded
  // and we can assign it to the clown object's image property
  clown.image = clownImage;

  // p5 has many built in variables to help us, like width and height which always
  // tell us the dimensions of our canvas
  // This lets us start the clown in the centre of the screen by setting its position
  clown.x = width/2;
  clown.y = height/2;

  // We often create "helper functions" that perform some specific task we might want to do
  // in more than one place, like generate a random color
  backgroundColor = getRandomColor(0,200,200);
  clown.tint = getRandomColor(200,200,0);
}


// draw()
//
// Runs ONCE PER FRAME of our program, generally 60 frames per second
// Keeps going until the program ends (or we use noLoop())

function draw() {
  // We often use background() at the start of draw() to replace the entire
  // background of the canvas so we don't see "trails" of moving images
  background(backgroundColor);

  // We often use separate functions to keep our code simple and clear, moving
  // meaningful chunks of code to be together inside a function with a sensible name.
  updateClown();
  displayClown();
}

// updateClown
//
// Moves clown based on velocity and wraps at screen edges
function updateClown() {
  // Classic physics step update to add velocity to position
  clown.x += clown.vx;
  clown.y += clown.vy;

  // Classic conditionals to wrap the clown around the edges of the canvas
  if (clown.x < 0) {
    clown.x += width;
  }
  else if (clown.x > width) {
    clown.x -= width;
  }

  if (clown.y < 0) {
    clown.y += height;
  }
  else if (clown.y > height) {
    clown.y -= height;
  }
}

// displayClown
//
// Display's clown image at clown's position
function displayClown() {
  // We use push() and pop() around style functions and their targeted
  // drawing function to avoid applying styles to other areas of our program
  push();
  tint(clown.tint);
  image(clown.image,clown.x,clown.y);
  pop();
}


// keyPressed
//
// p5 has special "event handler" functions like keyPressed which are automatically
// called when a specific event happens. keyPressed is automatically called whenever
// a key is pressed!
function keyPressed() {
  // Bark
  barkSFX.play();

  // Reverse the clown's velocity
  clown.vx = -clown.vx;
  clown.vy = -clown.vy;

  // p5 has special variables that work well with event handlers, such as keyCode which
  // always contains the keycode of the last pressed key, and RETURN which contains the
  // keycode for the return key.
  if (keyCode === RETURN) {
    backgroundColor = getRandomColor(0,200,200);
  }
}

// mousePressed
//
// mousePressed is another event handler, called automatically when the user clicks the mouse
function mousePressed() {
  // Bark
  barkSFX.play();

  // We can reuse getRandomColor() here to also set the tint color of the clown
  clown.tint = getRandomColor(200,200,0);
}

// getRandomColor
//
// Returns a randomly generated color
function getRandomColor(redMax,greenMax,blueMax) {
  // p5 has useful functions like color() for creating colors and random() for generating
  // random numbers within a specific range
  let randomColor = color(random(0,redMax),random(0,greenMax),random(0,blueMax));
  return randomColor;
}
