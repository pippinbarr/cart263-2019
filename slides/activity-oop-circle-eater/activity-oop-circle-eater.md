### CART 263 / Winter 2019 / Pippin Barr

# Activity: OOP Circle Eater

---

## Brief

A game in which:

- The player controls a circle with the mouse to move it on screen
- Another circle appears randomly on screen
- When the player overlaps the other circle, it "eats" it and a new circle appears
- The player decreases in size over time, but gains size based on the food size when eating
- If the player completely shrinks, the game is over

But __object oriented this time!__

---

## 1. Set up a template p5 project

Go to the course website and download the template p5 project then open the project in Atom.

---

## 2. Create an Agent class

Because both the avatar and the food share a number of properties (position, size, and color) it makes sense to create a __parent__ class that they will inherit from.

Create a class called `Agent` (in a new file) and define its constructor to take the following arguments and set them as properties:
- An x and y position
- A current size
- A color

Also set a property that is a boolean that tracks whether the avatar is alive/active, it should be set to `true`.

(Don't forget to add the class file to `index.html`)


???

```javascript
class Agent {
  constructor(x,y,size,agentColor) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = agentColor;
    this.active = true;
  }
}
```

---

## 3. Create a display method

Add a method to the Agent class that displays the agent on the screen, it should:
1. Check the active property and only display the agent it it's true
1. Set the stroke to not display
1. Set the fill to the color property
1. Draw a circle at the location defined by the position properties of a size defined by the size property
1. Use `push()` and `pop()` around all the display instructions to avoid problems

???

```javascript
display() {
  if (!this.active) {
    return;
  }

  push();
  noStroke();
  fill(this.color);
  ellipse(this.x,this.y,this.size);
  pop();
}
```

---

## 4. Create an Avatar class

Create an Avatar class (in a new file) that __extends__ the Agent class. Its constructor should
1. Define parameters for position, size, and how much size it should lose per frame
1. Call the parent constructor (using `super()`), passing the appropriate arguments
1. Set a maximum size property that defaults to the starting size
1. Set a property to store the size lost per frame

(Don't forget to add the class file to `index.html`)

???

```javascript
class Avatar extends Agent {
  constructor(x,y,size,healthLoss) {
    super(x,y,size,'#cccc55');
    this.maxSize = size;
    this.healthLoss = healthLoss;
  }
}
```

---

## 5. Add an update method

Add a method to the `Avatar` class that updates the avatar (to be called once per frame), it should:
1. Check if the avatar is active and only continue is it is
1. Update the position properties to match the mouse position
1. Reduce the size by the size-loss property, constraining it to be between `0` and the maximum size property
1. Check if the size has reached `0` and if so set the avatar to be inactive/dead

???

```javascript
update() {
  if (!this.active) {
    return;
  }

  this.x = mouseX;
  this.y = mouseY;

  this.size = constrain(this.size - this.healthLoss,0,this.maxSize);
  if (this.size === 0) {
    this.active = false;
  }
}
```

---

## 6. Add an avatar to the main program

Now that we've defined the basics of an Agent and an Avatar, we should be able to create a visible and interactive avatar in the main program. In `script.js`

1. Declare a variable to store the avatar at the top of your program
1. In `setup()` create a canvas with whatever dimensions you like
1. In `setup()` create a `new` Avatar object with appropriate arguments
1. In `draw()` call the `update()` and `display()` methods of the avatar

You should now be able to run this program and see the avatar move with your mouse!

(Note how we __didn't need to write a `display()` method specifically for the Avatar class because it just uses the Agent's one__.)

???

```javascript
let avatar;

function setup() {
  createCanvas(windowWidth,windowHeight);
  avatar = new Avatar(mouseX,mouseY,64,1);
}

function draw() {
  avatar.update();
  avatar.display();
}
```

---

## 7. Create a Food class

Create a Food class (in a new file) that __extends__ the Agent class. Its constructor should
1. Define parameters for position, minimum size, and maximum size
1. Call the parent (Agent) constructor (using `super()`), passing the appropriate arguments
1. Store the minimum and maximum sizes as properties
1. Set the size of the food to a random number between the minimum and maximum sizes

(Don't forget to add the class file to `index.html`)

???

```javascript
class Food extends Agent {
  constructor(x,y,minSize,maxSize) {
    super(x,y,random(minSize,maxSize),'#55cccc');
    this.minSize = minSize;
    this.maxSize = maxSize;
  }
}
```

---

## 8. Add a reset method

Because we know the avatar eats the food and we'll need to reset it, add a method that does this. It should:
1. Set the food's position to a random location on the canvas
1. Set the food's size to a random number between the minimum and maximum size properties

???

```javascript
reset() {
  this.x = random(0,width);
  this.y = random(0,height);
  this.size = random(this.minSize,this.maxSize);
}
```

---

## 9. Add a food object to the main program

Now that we've defined the Food class, we should be able to create a visible food object in the main program. In `script.js`

1. Declare a variable to store the food at the top of your program
1. In `setup()` create a `new` Food object with appropriate arguments
1. In `draw()` call the `display()` method of the food

You should now be able to run this program and see the avatar move with your mouse and a food object on screen

???

```javascript
let avatar;
let food;

function setup() {
  createCanvas(windowWidth,windowHeight);
  avatar = new Avatar(mouseX,mouseY,64,1);
  food = new Food(random(0,width),random(0,height),5,100);
}

function draw() {
  avatar.update();
  avatar.display();
  food.display();
}
```

---

## 10. Eating time, part one

We know we want the avatar to "eat" the food when they overlap, so we need a method to check if the avatar overlaps the food. We __could__ put this in Avatar, but it's actually a pretty generic idea, so we'll put it in Agent.

In the Agent class, define a method that takes an argument containing another Agent and checks whether the current agent overlaps that agent. That is:
1. Define a method that takes one parameter (the other agent)
1. Check if the current agent is active and only carry out the rest if it is
1. Calculate the distance from the current agent to the other agent
1. Check if that distance is less than that sum of the radii of the two agents
1. If so, return true
1. If not, return false

???

```javascript
collide(other) {
  if (!this.active) {
    return false;
  }

  let d = dist(this.x,this.y,other.x,other.y);
  if (d < this.size/2 + other.size/2) {
    return true;
  }
  else {
    return false;
  }
}
```

---

## 11. Eating time, part two

Now we can check if the avatar overlaps the food, we need to handle what happens when it does, so we need an "eating" method.

In the Avatar class, define an eating method that takes one parameter (the food to be eaten) and handles eating it, that is:
1. Define a method that takes a single argument (the food to eat)
1. Check if the avatar is active and only carry out the rest if it is
1. Add the size of the food to the size of the avatar (but limit it to the avatar's maximum size)
1. Reset the food using the resetting method we defined earlier so it moves somewhere else and changes size

???

```javascript
eat(other) {
  if (!avatar.active) {
    return;
  }

  this.size = constrain(this.size + other.size,0,this.maxSize);
  other.reset();
}
```

---

## 12. Eating time, part three

We have all the pieces, now we need to add them to the main program. In `script.js`:

1. In `draw()` add an if-statement that checks if the avatar overlaps the food (using the method we defined) - add this after that avatar is updated
1. If it does, call the eating method we just defined (passing it the food)
1. If it doesn't, do nothing

At this point, the program should be done and we can play the game!

???

```javascript
function draw() {
  background(0);

  avatar.update();
  if (avatar.collide(food)) {
    avatar.eat(food);
  }
  avatar.display();
  food.display();
}
```

---

## 13. Being a conscientious programmer

As a final step, get rid of various hard-coded numbers (especially in `script.js`) by creating __constants__ at the top of the program that define numbers like the size of the avatar, how much size it loses per frame, and the food's minimum and maximum sizes. Use them instead of the numbers.

At this point we might want to tweak the values in these constants to make the game more/less fun!

???

```javascript
const AVATAR_MAX_SIZE = 64;
const AVATAR_SIZE_LOSS_PER_FRAME = 1;
const FOOD_MIN_SIZE = 5;
const FOOD_MAX_SIZE = 100;

let avatar;
let food;

function setup() {
  createCanvas(windowWidth,windowHeight);
  avatar = new Avatar(mouseX,mouseY,AVATAR_MAX_SIZE,AVATAR_SIZE_LOSS_PER_FRAME)
  food = new Food(random(0,width),random(0,height),FOOD_MIN_SIZE,FOOD_MAX_SIZE);
  noCursor();
}
```

---

## Done!

Nice job!

---

# Fin.
