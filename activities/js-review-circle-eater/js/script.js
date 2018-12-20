"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let avatar = {
  x: 0,
  y: 0,
  maxSize: 64,
  size: 64,
  active: true,
  color: '#cccc55'
}

let food = {
  x: 0,
  y: 0,
  size: 64,
  color: '#55cccc'
}

let healthGain = 50;
let healthLoss = 1;

// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup

function setup() {
  createCanvas(windowWidth,windowHeight);
  positionFood();
  noCursor();
}


// draw()
//
// Description of draw()

function draw() {
  if (!avatar.active) {
    return;
  }

  background(0);
  updateAvatar();
  checkCollision();
  displayAvatar();
  displayFood();
}

function updateAvatar() {
  avatar.x = mouseX;
  avatar.y = mouseY;
  avatar.size = constrain(avatar.size - healthLoss,0,avatar.maxSize);
  if (avatar.size === 0) {
    avatar.active = false;
  }
}

function checkCollision() {
  let d = dist(avatar.x,avatar.y,food.x,food.y);
  if (d < avatar.size/2 + food.size/2) {
    avatar.size = constrain(avatar.size + healthGain,0,avatar.maxSize);
    positionFood();
  }
}

function displayAvatar() {
  push();
  noStroke();
  fill(avatar.color);
  ellipse(avatar.x,avatar.y,avatar.size);
  pop();
}

function displayFood() {
  push();
  noStroke();
  fill(food.color);
  ellipse(food.x,food.y,food.size);
  pop();
}


function positionFood() {
  food.x = random(0,width);
  food.y = random(0,height);
}
