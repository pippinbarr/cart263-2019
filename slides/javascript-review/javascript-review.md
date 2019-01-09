### CART 263 / Winter 2019 / Pippin Barr

# JavaScript review

---

## Contents

- JavaScript
- Variables and values
- Math
- Constants
- Functions
- Arrays
- Conditionals
- Loops

---

## JavaScript

- It is the __language of interactivity__ on the web
- It is __incredibly popular__
- It has __countless libraries and extensions available__
- It is __not just for the web__

???

- Pretty much every fancy thing you see a web page do is done with JavaScript
- JavaScript is a great learning language because so many people use it for so many tasks. For any question you have, there is likely an answer online. For any genre of program you want to write, there is probably a community online.
- Perhaps most importantly for learning, JavaScript is a modern language with the standard suite of features we expect to see. Your knowledge of JavaScript will allow you to learn other languages much, much more easily.
- JavaScript has been around for a long time and has had many, many libraries and extensions created for it that give you greater power with less work! (More on this later in the course.)
- JavaScript isn't limited to programming for the web. With technologies like [Node](https://nodejs.org/en/) and [Electron](https://electronjs.org/) you can build your own applications in JavaScript.

---

## ES6

- JavaScript is under constant development, so there are actually a series of "releases" of the language
- In this class we will mostly be using the most fundamental parts of the language, which have been around forever, but we will use a couple of features from what is called the ES6 release of JavaScript:
  - We will use `let` to declare variables
  - We will use `const` to declare constants
  - We will use the `class` structure to define classes

???

- If you're interested in all the other stuff ES6 introduces, do feel free to investigate online - there are many resources - but do be prepared to be a little blown away if you're not already quite familiar with JavaScript
- Example: https://flaviocopes.com/es6/

---

## Use strict

- In this class we will include the `"use strict";` directive at the start of our code
- This will turn on special rules that will help us to find errors in our code more easily
- For example, it won't let us use variable we haven't explicitly declared

```javascript
"use strict";

x = 10; // No! Error! x doesn't exist!

let x = 10; // Good.
```

- It has other implications, but basically should make life better
- To use it we write `"use strict";` at the top of any JavaScript you create for your project

---

## Variables and values

- A variable is a __named container for data__
- To create a variable we __declare__ it

---

## Declaring a variable without a value

```javascript
let x;
let pi;
let greetingText;
```

- The above declares __three__ variables called `x`, `pi` and `greetingText` respectively
- We use `camelCase` for variable names (first letter lower case, subsequent words capitalized, no spaces)
- Because these variables have __no value stored in them__ they will contain `undefined` by default
- You can put a value into a variable later on, so it __is__ okay to declare them this way
- .hi[In this course we will use `let` to declare variables instead of `var`]

???

- What is the difference between `let` and `var`?
- It's a difference in __scope__
- Variables declared with `var` are visible/usable anywhere within the __function__ they are declared in or, if declared outside all functions, they are visible everywhere
- Variables declared with `let` are visible/usable only within the __block__ they are declared in (the curly brackets they are inside) or, if declared outside all blocks, they are visible everywhere

---

## Declaring a variable with a value

```javascript
let x = 10;
let pi = 3.14159;
let greetingText = "Hello, World!";
```

- The above declares the same three variables but now they begin their lives with the specified values
- We put values into variables using the __assignment operator__ which is a single `=` sign

---

## Using the assignment operator

```javascript
let x = 10;
x = 59;
x = 101;
```

- We can use the assignment operator to set the value at the moment of declaration or any time afterwards

---

## Types of values

- JavaScript has a specific sets of __types__ of data we can put into variables (and manipulate and use more generally in our programming)
- They are:
  - Undefined (nothing)
  - Number (numbers)
  - NaN (not a number)
  - Boolean (truth values)
  - String (text)
  - Object (a more complex data structure)
  - Null (also nothing, but usually "on purpose")

???

- See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures

---

## Undefined

- As we have already seen, `undefined` is what is stored in a variable by default if nothing is assigned to it

```javascript
let x;
console.log(x); // undefined
```

- You can set something to `undefined` on purpose if you want

```javascript
let meaningOfLife = undefined;
```

---

## Number

- We can store numbers in variables

```javascript
let x = 10;
let pi = 3.14159;
```

- To write a number value we just write it like you'd expect

---

## NaN (Not a Number)

- If you use certain functions that return a number, but you give them arguments that don't make sense, they return NaN
- You can't check if something is NaN with equality, you need to use `isNaN()`

```javascript
let i = Math.sqrt(-1); // The square root of -1
console.log(i); // NaN
console.log(i === NaN); // false
console.log(isNaN(i)); // true
```

???

- Similarly you get NaN with nonesense-y things like the following:

```javascript
let x = Math.floor("hello!");
console.log(x); // NaN
let y = parseInt("This is not a number!");
console.log(y); // NaN
```

---

## Boolean

- Boolean values are limited to being `true` or `false` and are the basis of logic in our programming

```javascript
let programmingIsMyPassion = true;
let programmingIsTooHardForMe = false;
```

- So to write `true` or `false` you just write the word, no special syntax

---

## String

- String values allow us to store text of any length in a variable

```javascript
let theLetterA = "a";
let greeting = "Hello, World";
let mobyDick = "Call me Ishmael. Some years ago, ... only found another orphan. THE END.";
```

- You write a string __inside quotation marks__
- You can also use __single quotes__

```javascript
let greeting = 'Hello, World!';
```

???

- You might choose single quotes because you want to include double quotes in your string itself, like

```javascript
let sheSaid = 'She said, "This is the life!".';
```

- You might be interested in looking up __template literals__ too: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

---

## Math

- We can do the obvious kinds of maths using numbers

```javascript
3 + 3 // 6
3 - 3 // 0
3 * 3 // 9
3 / 3 // 1
3 ** 3 // 27 (power of)
```

---

## Math and variables

- We often use variables instead of literal values for this kind of math
- We often assign the results into variables

```javascript
let x = 10;
let y = 15;
let z = x * y; // z is 150
```

---

## More math

- There are other operators specifically for changing variables

```javascript
let x = 10;
x++; // x is now 11 (++ increases by one)
x--; // x is now 10 (-- decreases by one)
x += 3; // x is now 13 (+= adds the amount to the variable)
x -= 3; // x is now 10 (-= subtracts the amount from the variable)
x *= 2; // x is now 20 (*= multiplies the variable by the amount)
x /= 2; // x is now 10 (/= divides the variable by the amount)
```

---

## Math?

- We can also do "addition" with strings

```javascript
let s = "I love " + "programming";
console.log(s); // "I love programming"
```

---

## Math???

- In JavaScript there is the idea of __type coercion__
- This means JavaScript will try where possible to __convert values__ into types that will work for what you are trying to do with them, for example

```javascript
2 + true; // 3 (true is converted to 1)
2 + false; // 2 (false is converted to 0)
```

- This becomes more serious with conditionals
- Generally just avoid using data types that don't make sense for what you're doing

???

- See more: https://medium.freecodecamp.org/js-type-coercion-explained-27ba3d9a2839

---

## Object

- The concept of an object is more complex than other data types
- In essence an object is a data type that can structure more complex data
- For now, the most basic version of this is an __object literal__

---

## Object literals (declaring)

- We can declare objects explicitly like this

```javascript
let mobyDick = {
  author: "Herman Melville",
  title: "Moby Dick",
  alternateTitle: "The Whale",
  pages: 585,
  greatBook: true
};
```

- This kind of object is declared inside curly brackets, with a list of __properties__ and __values__ separated by commas inside them
- Each property has a name (with the same rules as variables) and can store any kind of data type as its value

---

## Object literals (accessing)

- We access the properties of any object with __dot notation__

```javascript
let miffy = {
  name: "Miffy",
  age: 63
}
console.log(miffy.name); // "Miffy"
console.log(miffy.age); // 63
```

---

## null

- `null` is used to indicate the absence of an object
- You can use it yourself in cases where a variable is intended to contain an object but doesn't right now

```javascript
let myObject = null;
```

- And `null` is often returned in cases where a function that returns an object needs to return an empty/not-found/non-value

```javascript
let div = document.getElementById("wrapper"); // Assuming there is no element with id #wrapper
console.log(div); // null
```

---

## Constants

- Sometimes we want to declare variables that __won't change__ and for this we use __constants__

```javascript
const PI = 3.14159;
const PROGRAMMING_IS_FUN = true;

PI = 4; // Error!
PROGRAMMING_IS_FUN = false; // Error!
```

- We use `const` instead of `let` to declare a constant
- We conventionally use `ALL_CAPS_SEPARATED_BY_UNDERSCORES` for constant names

---

## Functions

- Functions create reusable code that is separate from the rest of our program

```javascript
// Function definition
function sayYouLoveJavaScript() {
  console.log("I love JavaScript!");
}

// Function call
sayYouLoveJavaScript(); // "I love JavaScript!"
```

- We __define a function__ by writing `function`, then the name of the function in camelCase, then parentheses, then curly brackets with the code for that function inside them
- We __call a function__ by writing its name with parentheses after them

---

## Functions with arguments

- We can define arguments for our functions to be able to pass values into them for them to use

```javascript
function sayTo(person,text) {
  console.log("Hey " + person);
  console.log(text);
}

sayTo("Susie","I love programming!"); // "Hey Susie" "I love programming!"
```

- You can have as many arguments as you want (separated by commas) and they can contain any kind of value you want
- You use them in your function just as if they were variables

---

## Functions with return values

- We can define functions that give information back using `return`

```javascript
function square(x) {
  let result = x * x;
  return result;
}

console.log(square(2)); // 4
console.log(square(10)); // 100
```

- We use `return` to "send back" a value from the function
- If a function has a return value we can use the function anywhere we want to use that value

---

## Functions are objects!

- JavaScript has what are called "first class functions"
- This means that functions are just another kind of object
- For our purposes this means: you can store functions in variables and also in the properties of objects!

---

## A function in a variable

```javascript
let square = function (x) {
  return x * x;
}

console.log(square(10)); // 100
```

- Note the difference in syntax here
- We declare a variable called `square` which will contain the function
- We define the function __without a name__, but otherwise the same: just `function` and the parentheses with its arguments and the body of the function inside curly brackets
- Then we can __call__ the function by writing the name of the variable with the function in it and then parentheses with the arguments, it works the same way

???

- Functions without names are called __anonymous functions__
- Yes, this means you can pass a function as an argument to a function

```javascript
function callMyFunction(f) {
  f();
}

let myFunction = function () {
  console.log("Hello, World!");
}

callMyFunction(myFunction); // Hello, World!
```

---

## A function in an object literal

```javascript
let mobyDick = {
  name: "Moby Dick",
  stab: function () {
    console.log("From hell's heart I stab at thee!");
  }
}

console.log(mobyDick.name); // "Moby Dick"
mobyDick.stab(); // "From hell's heart I stab at thee!"
```

- As you can see, we call a function in an object using dot notation

---

## Arrays

- An array is a data type that allows us to store values in numbered order
- An array is numbered starting at `0`
- We can declare an array with values in it when we create it
- We access array __elements__ by their __index__ (number)

```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(numbers[0]); // 1
console.log(numbers[9]); // 10
numbers[9] = 20;
console.log(numbers[9]); // 20
```

- We can use an array element anywhere we would use a value
- And we can assign to array elements just like they're variables

---

## Pushing and popping

- We can use `push()` on an array to add an element to the end
- We can use `pop()` on an array to remove the element at the end

```javascript
let numbers = [1,2,3,4,5];
let endValue = numbers.pop();
console.log(endValue); // 5
console.log(numbers); // [1,2,3,4]
numbers.push(100);
console.log(numbers); // [1,2,3,4,100]
```

---

## Shifting and unshifting

- We can use `unshift()` to add an element to the front
- We can use `shift()` to remove an element from the front

```javascript
let numbers = [1,2,3,4,5];
let firstValue = numbers.shift();
console.log(firstValue); // 1
console.log(numbers); // [2,3,4,5]
numbers.unshift(100);
console.log(numbers); // [100,2,3,4]
```

---

## Length

- We can find out the length of an array using its `length` property

```javascript
let numbers = [1,2,3,4,5];
console.log(numbers.length); // 5
numbers.pop();
console.log(numbers.length); // 4
```

---

## Arrays are objects!

- You may have already worked out from the dot notation used with `push()`, `pop()`, `length`, etc. that arrays are another kind of object
- We can use arrays anywhere you would use a value: in a variable, as an argument for a function, as a property of an object, even as an element in an array!

---

## Conditionals

- A huge part of programming is deciding __whether or not to do something__ dynamically in response to the current state of the program
- To achieve this we use __conditionals__, also known as __if-statements__

```javascript
let x = 10;
if (x < 20) {
  console.log("x is less than 20");
}
```

- The key to an if-statement is the __conditional expression__ inside the parentheses after the actual `if`
- This expression has to be something that evaluates to be either `true` or `false`
- If it's `true` the code inside the curly brackets will run

---

## Conditional operators

- The kinds of conditions you can check are all based on simple math

```javascript
let x = 10;
let y = 20;
let z = 30;
x + y === z // equality, true
x < y // less than, true
z > y // greater than, true
x <= z // less than or equal, true
z >= y // greater-than or equal, true
```

- Note we should always prefer __three equals signs to check for equality__

---

## Else

- We can make conditionals more powerful by specifying what to do if the conditional expression is `false` using an `else`

```javascript
let x = Math.random(); // Math.random() returns a random number between 0 and 1
if (x < 0.5) {
  console.log("I'm happy!");
}
else {
  console.log("I'm sad!");
}
```

- The `else` code here is run when the condition of the `if` is false (i.e. when `x >= 0.5`)

---

## Else if

- We can create more complex conditions by checking a series of conditions

```javascript
let x = Math.random();
if (x < 0.2) {
  console.log("I'm happy!");
}
else if (x < 0.4) {
  console.log("I'm sad!");
}
else if (x < 0.6) {
  console.log("I'm confused!");
}
else {
  console.log("I feel nothing anymore.");
}
```

- Each subsequent `else if` and the final `else` are __only checked if the previous condition(s) were `false`__

---

## Logic operators

- We can make more efficient conditional expressions with the three logic operators

```javascript
a && b // true if both a AND b are true, false otherwise

a || b // true if one or both of a and b are true, false if both are false

!a // true if a is false, false if a is true
```

- `a` and `b` both need to be something that can be true or false (i.e. conditional expressions themselves)

---

## Switch statement

- A useful way of writing a set of conditions where you want to check the specific value in a variable is a `switch` statement, which works as follows:

```javascript
let state = 1;

switch (state) {
  case 1:
  console.log("State 1!");
  break;

  case 2:
  console.log("State 2!");
  break;

  case 3:
  console.log("State 3!");
  break;

  default:
  console.log("None of the above!");
}
```

???

- So the switch statement checks the value in the variable provided (`state` in this example)
- It compares it with each `case` listed and if it matches the value specified by a case it executes the code inside the case
- We include `break;` after a case so that code doesn't keep executing into the next case
- We use the `default` case at the end to catch if the variable doesn't have any of our specific values in it
- So the above would print "State 1!"
- If we had used `let state = 3;` it would print "State 3!"
- If we had used `let state = 4;` it would print "None of the above!"

---

## Switch statement

- Switch statements don't have to check numbers:

```javascript
let state = "HAPPY";

switch (state) {
  case "SAD":
  console.log("*sob*");
  break;

  case "AMBIVALENT":
  console.log("Meh.");
  break;

  case "HAPPY":
  console.log("Wheeeee!");
  break;

  default:
  console.log("I feel really default.");
}
```

---

## Loops

- Quite often in programming it's useful to repeat the same or similar set of code over and over again
- We achieve this more efficiently using loops
- There are two main kinds of loops, `while` loops and `for` loops

---

## While loop

- A while loop keep executing the code inside it until its condition becomes `false`

```javascript
let x = 5;
while (x > 0) {
  console.log("Loop!");
  x--;
}
```

- Importantly, the condition used in a while loop needs to become `false` or you have a loop that will never stop!
- We will see: "Loop!" five times

???

- A nice simple infinite loop would be to just make `x` go up instead of down

```javascript
let x = 5;
while (x > 0) {
  console.log("Loop!");
  x++;
}
```

---

## Do while loop

- A do while loop is exactly the same as a while loop, except that it executes the code before checking the condition

```javascript
let x = 5;
do {
  console.log("Loop!");
  x--;
} while (x > 0)
```

- Again, we will see "Loop!" five times

---

## For loop

- A for loop is a special kind of loop syntax that focuses on loops based on __counting__
- It creates a special variable called an __iterator__ and changes that variable until the loop's condition becomes false

```javascript
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

- Here `i` is the iterator, it goes up by 1 each time through the loop, and the loop stops when i is no longer less than 10
- The __condition__ is checked before the loop runs while the __update__ (`i++`) is performed __after__ the loop has run
- So here `i` starts at 0, and then becomes 1, 2, 3, 4, 5, 6, 7, 8, 9 before the loop ends (because `i` becomes 10 and the condition becomes false)

---

## For loops and arrays

- For loops are especially marvelous at going through an array and doing stuff with it

```javascript
let numbers = [1,2,3,5,7,11,13];
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
```

- Note the use of `numbers.length` to limit `i` (this guarantees it won't count past the length of the array)
- This code will print out the value in every element of the array (the prime numbers from 1 to 13)

---

## forEach loops

- There's another kind of loop specifically for arrays
- It works by calling a _function_ on each element in an array

```javascript
let numbers = [1,2,3,5,7,11,13];
numbers.forEach(function (element) {
  console.log(element);
});
```

- `forEach` is __not guaranteed to go through the array in order__
- But it can be a nice way to do something to every array element when order doesn't matter, e.g.

```javascript
enemies.forEach(function (enemy) {
  enemy.update();
  enemy.display();
});
```

---

## That's JavaScript, folks

- There's more to the language than what we've reviewed here
- But we've covered the real fundamentals of JavaScript programming (and, not so secretly, most standard programming)
- If anything in here felt weird or unfamiliar, please review it and/or ask for help
- Moving forward, it will be assumed that you understand everything we've just seen (though there's always time for questions!)

---

# Fin.
