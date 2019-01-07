### CART 263 / Winter 2019 / Pippin Barr

# Activity: Circle Eater

---

## Brief

A game in which:

- The player controls a circle with the mouse to move it on screen
- Another circle appears randomly on screen
- When the player overlaps the other circle, it "eats" it and a new circle appears
- The player decreases in size over time, but gains size when eating
- If the player completely shrinks, the game is over

---

## 1. Set up a template p5 project

Go to the course website and download the template p5 project then open the project in Atom.

---

## 2. Create an avatar object

Create a variable called `avatar` that stores a javascript object with the following properties:
- An x and y position
- A maximum size
- A current size
- A boolean that tracks whether the avatar is alive/active
- A color (idea: store this as a hexadecimal string, e.g. `"#ff0000"` is red)

???

```javascript
let avatar = {
  x: 0,
  y: 0,
  maxSize: 64,
  size: 64,
  active: true,
  color: '#cccc55'
}
```

---

## 3. Create a food object

Create a variable called `food` that stores a javascript object with the following properties:
- An x and y position
- A size
- A color

???

```javascript
let food = {
  x: 0,
  y: 0,
  size: 64,
  color: '#55cccc'
}
```

---

## 4. Setup

Fill in the p5 `setup()` function to
- Create a canvas (you choose the size)
- Set the position of the food to a random location on the canvas
- Disable the cursor with `noCursor()`

???

```javascript
function setup() {
  createCanvas(windowWidth,windowHeight);
  food.x = random(0,width);
  food.y = random(0,height);
  noCursor();
}
```

---

## 5. Draw
Add an instruction to clear the canvas to a solid color into `draw()`.

???

```javascript
function draw() {
  background(0);
}
```

---

## 6. Updating the avatar

Define a function that updates the avatar's position. It should:
1. Set the avatar's position to be the same as the mouse position (remember that p5 has built-in variables to tell you the mouse's position - look them up if you don't remember)
1. Reduce the avatar's size by a set amount (consider using `constrain()` here to keep it between `0` and the maximum size)
1. Check if the avatar's size has reached 0 and set the avatar to be inactive if so

Call this function in `draw()`

???

```javascript
function draw() {
  background(0);
  updateAvatar();
}

function updateAvatar() {
  avatar.x = mouseX;
  avatar.y = mouseY;
  avatar.size = constrain(avatar.size - healthLoss,0,avatar.maxSize);
  if (avatar.size === 0) {
    avatar.active = false;
  }
}
```

---

## 7. Displaying the avatar

Define a function that displays the avatar on the canvas. It should:
1. Set the stroke to not display
1. Set the fill to the color defined in the avatar object
1. Draw a circle at the avatar's location with the avatar's size
1. Use `push()` and `pop()` around all the display instructions to avoid problems

Call this function in `draw()` after the avatar update function.

At this point you should be able to run the program and see the avatar move around based on the mouse location

???

```javascript
function draw() {
  background(0);
  updateAvatar();
  displayAvatar();
}

...

function displayAvatar() {
  push();
  noStroke();
  fill(avatar.color);
  ellipse(avatar.x,avatar.y,avatar.size);
  pop();
}
```

---

## 8. Displaying the food

Define a function that displays the food on the canvas. It should:

1. Set the stroke to not display
1. Set the fill to the color defined in the food object
1. Draw a circle at the food's location with the food's size
1. Use `push()` and `pop()` around all the display instructions to avoid problems

Call this function in `draw()` after the avatar display function.

???

```javascript
function draw() {
  background(0);
  updateAvatar();
  displayAvatar();
  displayFood();
}

...

function displayFood() {
  push();
  noStroke();
  fill(food.color);
  ellipse(food.x,food.y,food.size);
  pop();
}
```

---

## 9. Checking for a collision/eating

Define a function that checks whether the avatar overlaps the food and reacts appropriately. It should:
1. Calculate the distance from the avatar to the food (p5 has a function for calculating the __dist__-ance between two points)
1. Check if that distance is less that the sum of the radii of the avatar and food (e.g. they overlap)
1. If so, increase the avatar's size by a set amount (but don't let it get larger than than its maximum size) and move the food to a new random location
1. If not, do nothing

Call this function in `draw()` after the avatar update function.

At this point the "game" should pretty much work, with a couple of exceptions.

???

```javascript
function draw() {
  background(0);
  updateAvatar();
  checkCollision();
  displayAvatar();
  displayFood();
}

...

function checkCollision() {
  let d = dist(avatar.x,avatar.y,food.x,food.y);
  if (d < avatar.size/2 + food.size/2) {
    avatar.size = constrain(avatar.size + healthGain,0,avatar.maxSize);
    food.x = random(0,width);
    food.y = random(0,height);
  }
}
```

---

## 10. Death

Add an if-statement to the start of `draw()` that only calls the various functions we've defined __if the avatar is still alive/active__ and doesn't run them if not.

???

- One option:

```javascript
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
```

- Another option:

```javascript
function draw() {
  if (avatar.active) {
    background(0);
    updateAvatar();
    checkCollision();
    displayAvatar();
    displayFood();
  }
}
```

---

## 11. Being a conscientious programmer

Improve the code by
1. Defining a function that puts the food in a random position and calling that function in `setup()` and the collision checking function instead of directly setting the food's position
1. Define constants that determine how much the avatar shrinks and grows and use those variables instead of hard-coded numbers

???

```javascript
const AVATAR_SIZE_GAIN = 50;
const AVATAR_SIZE_LOSS = 1;
```

...

```javascript
function positionFood() {
  food.x = random(0,width);
  food.y = random(0,height);
}
```

---

## Done!

Nice job!

---

# Fin.
