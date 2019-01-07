# Assignment 1: Circle Eater

__Grade__: 1.25% of final grade (pass/fail)  
__Deadline__: 11:59PM on the day of class on week of 14 January 2019.

---

## Brief

- Make the food move randomly around on the screen using velocity. It should move continuously, not teleport.
- Make the food stay on the screen (either wrapping or constraining).

---

## Learning objectives

- (Re)establishing confidence with basic JavaScript programming and the p5 library

---

## An approach

- Give the food object velocity properties
- Give the food a maximum speed property (consider defining this value in a constant separately)
- Define an `updateFood()` function that
  - updates the food object's position based on its velocity, constrained to the canvas (it shouldn't go off-screen)
  - randomly changes the food's velocity every now and then (either based on probability or time/frames) to a random velocity based on its maximum speed (or you can use `setInterval()` or a chain of `setTimeout()`s to do this if you like)
- Call `updateFood()` from `draw()`
- Add code to set a random velocity for the food based on its maximum speed in `positionFood()`

---

## Starting code

[assignment1.zip](assignment1.zip)

---

## Submission

You will submit this exercise as a __comment__ on an __Issue__ on the course repository here:

https://github.com/pippinbarr/cart263-2019/issues

(Click on the Issue with the name of the exercise and your section letter and follow the instructions.)

---

## Grading

Grading for exercises is pass/fail based on whether you met the brief.
