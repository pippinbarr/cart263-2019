"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

const AVATAR_MAX_SIZE = 64;
const AVATAR_SIZE_LOSS_PER_FRAME = 1;
const FOOD_MIN_SIZE = 5;
const FOOD_MAX_SIZE = 100;

let avatar;
let food;


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
  avatar = new Avatar(mouseX,mouseY,AVATAR_MAX_SIZE,AVATAR_SIZE_LOSS_PER_FRAME)
  food = new Food(random(0,width),random(0,height),FOOD_MIN_SIZE,FOOD_MAX_SIZE);
  noCursor();
}


// draw()
//
// Description of draw()

function draw() {
  background(0);

  avatar.update();
  if (avatar.collide(food)) {
    avatar.eat(food);
  }
  avatar.display();
  food.display();
}
