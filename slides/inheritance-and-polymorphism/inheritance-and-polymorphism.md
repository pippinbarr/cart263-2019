### CART 263 / Winter 2019 / Pippin Barr

# Inheritance and Polymorphism

---

## Contents

- Inheritance
- Polymorphism

---

## Inheritance

- One thing that happens when writing classes is that we can often end up writing classes very similar to each other
- For example you might be making a fancy version of Pong which has different kinds of balls, and you end up making a separate class for each type of ball
- This is clearly inefficient, and __inheritance__ is the solution
- Let's look at a simpler example first

???

- Examples are taken from Daniel Shiffman's book _Learning Processing_

---

## Dog

```javascript
class Dog {
  constructor(age) {
    this.age = age;
  }

  eat() {
    console.log("Nom nom nom")
  }

  sleep() {
    console.log("Zzz")
  }

  bark() {
    console.log("Woof!");
  }
}
```

- A perfectly reasonable class structure for a dog
- A basic constructor, and some fundamental methods

---

## Cat

```javascript
class Cat {
  constructor(age) {
    this.age = age;
  }

  eat() {
    console.log("Nom nom nom")
  }

  sleep() {
    console.log("Zzz")
  }

  meow() {
    console.log("Meow!");
  }
}
```

- Also perfectly reasonable, but __almost exactly the same as Dog__
- It just has a different name and `meow()` instead of `bark()`
- If we want even more animals, this is going to get tedious

---

## Animals...

- If we think about it, both cats and dogs are kinds of __animals__
- A cat is a kind of animal that does various animal things (like have an age, eat, and sleep) and also makes a particular sound (it meows)
- A dog is also a kind of animal and does all those same animal things (age, eat, sleep), and makes a different sound (it barks)
- __Inheritance__ will let us create a __parent__ `Animal` class that takes care of the common stuff, and then create __child classes__ that extend on that with specifics!

---

## Animal

```javascript
class Animal {
  constructor(age) {
    this.age = age;
  }

  eat() {
    console.log("Nom nom nom")
  }

  sleep() {
    console.log("Zzz")
  }
}
```

- The `Animal` class takes care of the fundamentals!

---

## Children

```javascript
class Dog extends Animal {
  constructor(age) {
    super(age);
  }

  bark() {
    console.log("Woof!");
  }
}
```

```javascript
class Cat extends Animal {
  constructor(age) {
    super(age);
  }

  meow() {
    console.log("Meow!");
  }
}
```

- Note the use of `extends` with the parent name in the class declaration
- Note the use of `super(age)` to call the __parent__ constructor

---

## Cat and Dog children

- So we can create a child class that __extends__ a parent class
- This means the child (Dog and Cat) will have all the properties and methods of the parent, plus whatever they add to it (`bark()` for `Dog` and `meow()` for `Cat`)

```javascript
let fluffy = new Cat(10);
fluffy.eat(); // "Nom nom nom" (inherited from Animal parent)
fluffy.sleep(); // "Zzz" (inherited from Animal parent)
fluffy.meow(); // "Meow!" (directly from Cat)

let fido = new Dog(11);
fido.eat(); // "Nom nom nom" (inherited from Animal parent)
fido.sleep(); // "Zzz" (inherited from Animal parent)
fido.bark(); // "Woof!" (directly from Dog)
```

- Pretty convenient!

---

## Getting more specific

- If we want to, we can also make certain Animal methods more specific
- We can call methods on the parent using `super`

```javascript
class Dog extends Animal {
  constructor(age) {
    super(age);
  }

  eat() {
    super.eat();
    console.log("*makes a huge mess*");
  }

  bark() {
    console.log("Woof!");
  }
}
```

```javascript
let fluffy = new Cat(10);
fluffy.eat(); // "Nom nom nom"
let fido = new Dog(11);
fido.eat(); // "Nom nom nom" "*makes a huge mess*"
```

---

## A working example in p5

- Let's create some code that runs with p5
- We will define a parent `Shape` class and then create child classes to extend it

```javascript
class Shape {
  constructor(x,y,r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  update() {
    x += random(-1,1);
    y += random(-1,1);
  }

  display() {
    // A generic shape cannot be displayed
  }
}
```

---

```javascript
class Square extends Shape {
  constructor(x,y,r) {
    super(x,y,r);
  }

  display() {
    rectMode(CENTER);
    fill(255,0,0);
    noStroke();
    rect(x,y,r,r);
  }
}
```

- Note there is no need to write the `update()` function for `Square` because it is inherited
- We __do__ write the `display()` function so it overrides the empty `Shape` `display()`
- And we have to write the `constructor()` for Square, though in this case it only calls the parent constructor using `super()`

---

```javascript
class Circle extends Shape {
  constructor(x,y,r,c) {
    super(x,y,r);
    this.c = c; // Color
  }

  update() {
    super.update(); // Do the generic Shape update()
    r += random(-1,1); // Also jiggle in size
  }

  display() {
    ellipseMode(CENTER);
    fill(c);
    noStroke();
    ellipse(x,y,r,r);
  }
}
```

---

## In action...

```javascript
let mySquare;
let myCircle;
let myOtherCircle;

function setup() {
  createCanvas(windowWidth,windowHeight);
  mySquare = new Square(random(0,width),random(0,height),100);
  myCircle = new Circle(random(0,width),random(0,height),200,color(100,100,200));
  myOtherCircle = new Circle(random(0,width),random(0,height),200,color(200,100,200));
}

function draw() {
  background(255);

  mySquare.update();
  myCircle.update();
  myOtherCircle.update();

  mySquare.display();
  myCircle.display();
  myOtherCircle.display();
}
```

---

## Activity: `Line`

- Write a `Line` class that extends `Shape`
- The constructor should take the (x,y) coordinates of each end of the line, so the `Line` class will need two extra properties for the (x,y) coordinates of the second point
- Both the endpoint coordinates should jiggle around via `update()`
- `display()` should draw the line on screen

???

```javascript
class Line extends Shape {
  constructor(x,y,x2,y2) {
    super(x,y,undefined);
    this.x2 = x2;
    this.y2 = y2;
  }

  update() {
    super.update(); // Do the generic Shape update()
    x2 += random(-1,1);
    y2 += random(-1,1);
  }

  display() {
    stroke(0);
    line(x,y,x2,y2);
  }
}
```

---

## All together

```javascript
let mySquare;
let myCircle;
let myOtherCircle;
let myLine;

function setup() {
  createCanvas(windowWidth,windowHeight);
  mySquare = new Square(random(0,width),random(0,height),100);
  myCircle = new Circle(random(0,width),random(0,height),200,color(100,100,200));
  myOtherCircle = new Circle(random(0,width),random(0,height),200,color(200,100,200));
  myLine = new Line(random(0,width),random(0,height),random(0,width),random(0,height));
}

function draw() {
  background(255);

  mySquare.update();
  myCircle.update();
  myOtherCircle.update();
  myLine.update();

  mySquare.display();
  myCircle.display();
  myOtherCircle.display();
  myLine.display();
}
```

---

## Inheritance!

- So inheritance is pretty great!
- It allows us to define higher level classes that take care of common elements, and then to define child classes that add specifics without having to also define the generic stuff again
- This solves our problem of different kinds of balls in Pong - we would define one `Ball` class that handles all the default behaviour of a ball, and then `extend` that class into child classes that add different behaviours

---

## Polymorphism

- You may have noticed an inefficiency in the previous program?
--

- All the various children of `Shape` use both `update()` and `display()` to do their thing
--

- Given that they're all `Shape`s, it would make sense if we could group them together in an array
- We could think about it as an __array of Shapes__ and so only call the `Shape` level methods
- And indeed we __can__ do this and it is referred to as __polymorphism__

---

## Polymorphism version

```javascript
let shapes = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  shapes.push(new Square(random(0,width),random(0,height),100));
  shapes.push(new Circle(random(0,width),random(0,height),200,color(100,100,200)));
  shapes.push(new Circle(random(0,width),random(0,height),200,color(200,100,200)));
  shapes.push(new Line(random(0,width),random(0,height),random(0,width),random(0,height)));
}

function draw() {
  background(255);

  for (let i = 0; i < shapes.length; i++) {
    shapes[i].update();
    shapes[i].display();
  }
}
```

- This works because we know that `Square`, `Circle` and `Line` all __extend__ the `Shape` class, they are children of that class and therefore can be relied on to have its methods and properties - __they are Shapes__!

???

- As such, we can always use any methods (and properties) in `Shape` on all of them - e.g. a child class like `Circle` can be treated as a `Circle` __or__ it can be treated as a `Shape`, __it's both__!
- This therefore allows us to work with them collectively like this

---

## Summary

- At heart, Object-Oriented Programming is great because it allows us to keep related code together, and because it allows us to reuse that code by creating multiple objects from a single class
- Inheritance adds to this power by allowing us to create related/similar classes without rewriting generic code
- Polymorphism then makes our lives easier by allowing us to treat child classes as their parent class in situations where that benefits us (like collecting them together in an array)

---

# Fin.
