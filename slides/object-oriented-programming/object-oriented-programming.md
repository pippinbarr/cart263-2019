### CART 263 / Winter 2019 / Pippin Barr

# Object-Oriented Programming

---

## Contents

- The idea
- Prototype-based syntax
- ES6 class syntax

---

## The idea

- Object-Oriented programming is a way to organise programs into meaningful pieces
- We do this by defining __classes__ that specify how some specific kind of entity in our program behaves
- We then create __objects__ (or __instances__) out of these classes which behave in the way specified
- This allows us to think about our program at least in part as a set of independently existing, but perhaps interacting, objects
- Classes are at their most useful when we can usefully create __multiple__ objects from them (code reuse)
- But it can also be useful to have a class that we use only once, if it's a good way of keeping code gathered together

---

## Conceptual example

- In a game of Breakout we have a number of visible entities that can clearly be classes:
  - A paddle (usually just one, but we could have more)
  - A ball (usually just one, but we could have more)
  - A brick (generally many of these)
- We might also want to contemplate things like a class that represents the user-interface, or a class that manages the music, etc. etc.

---

## Prototype-based syntax

- In JavaScript there is more than one way to define classes and create objects
- One way we commonly see online is by explicitly using the __prototype__ property
- In this version we define a __constructor function__ with the name of the class, which usually creates the __properties__ of the class
- And then add __methods__ (the __functions__ of that class) to that function's prototype
- And create objects from this class with the `new` keyword

---

## Prototype-based syntax

```javascript
function Person(name,age,alive) {
  this.name = name;
  this.age = age;
  this.alive = alive;
}

Person.prototype.sayName = function () {
  console.log("Hello! My name is " + this.name);
}

Person.prototype.goTo = function (destination) {
  if (this.age < 3) {
    console.log("I crawl to " + destination);
  }
  else {
    console.log("I walk to " + destination);
  }
}
```

```javascript
let miffy = new Person("Miffy",63,true);
miffy.sayName(); // "Hello! My name is Miffy"
miffy.goTo("the beach"); // "I walk to the beach" (because her age is greater than 3)
miffy.alive = false; // Changing a property
```

---

## `class` syntax

- The ES6 edition of JavaScript introduced a new notation for writing classes
- Fortunately, it's a much easier to understand way to write them
- Because secretly JavaScript still actually uses the `prototype` this new way of writing classes is an example of what is called "syntactic sugar" (it just makes things easier, it doesn't really change anything)

---

## `class` syntax example

```javascript
class Person {
  constructor(name,age,alive) {
    this.name = name;
    this.age = age;
    this.alive = alive;
  }

  sayName() {
    console.log("Hello! My name is " + this.name);
  }

  goTo(destination) {
    if (this.age < 3) {
      console.log("I crawl to " + destination);
    }
    else {
      console.log("I walk to " + destination);
    }
  }
}
```

```javascript
let miffy = new Person("Miffy",63,true);
miffy.sayName(); // "Hello! My name is Miffy"
miffy.goTo("the beach"); // "I walk to the beach"
miffy.alive = false; // Changing a property
```

---

## `class` syntax

- As we can see, the `class` based syntax achieves the same thing and we __use__ the class in exactly the same way
  - We still create objects with `new` and use the __constructor__ function (note that we use the name of the class when calling the function)
  - We still call methods on the object using dot notation
  - We can still access properties of the object using dot notation

---

## Object-Oriented Programming!

- You can stick with the `prototype` syntax or switch to the `class` syntax - they both achieve the same thing
- In the next module, when we look at inheritance and polymorphism, we'll only use the `class` syntax for simplicity
- We should still put our classes in a new JavaScript file named after the class and make sure to include the file in `index/html`
- Basically, it's business as usual with easier syntax

---

# Fin.
