### CART 263 / Winter 2019 / Pippin Barr

# Activity: Condiments

---

## Brief

An experience in which:

- We see a randomly generated description of a condiment!

---

## 1. Start a project

1. Download the [template jQuery project](https://github.com/pippinbarr/cart263-2019/raw/master/templates/template-jquery-project.zip)
2. Download the [JSON data](https://raw.githubusercontent.com/pippinbarr/cart263-2019/master/activities/data/condiments/data/data.json) and put it in a `data` folder in your project

---

## 2. Start the script

1. Add the basic "document ready" code to your `script.js` so you're ready to start writing code

???

__Solution:__

```javascript
$(document).ready(setup);

function setup() {
  // Code to run on the page goes here
}
```

---

## 3. Load the data

1. Use jQuery's `$.getJSON()` method to load the data file and call a function called `dataLoaded()` or similar
2. Define `dataLoaded()` and remember it should take one argument (which will contain the data)
3. In `dataLoaded()` use `console.log()` to print out the contents of the data argument

If it's working, you should see the JSON data in the console when you run the page.

???

__Solution__

```javascript
$(document).ready(setup);

function setup() {
  $.getJSON('data/data.json',dataLoaded);
}

function dataLoaded(data) {
  console.log(data);
}
```

---

## 4. Write a random array element function

Because we're going to want to select random elements from arrays more than once, let's write a function to do that

1. Define a function called `getRandomElement()` that takes one argument, the array to select an element from
1. In the function, choose a random element from the array passed in the argument
1. Return this element from the function

???

__Solution__

```javascript
function getRandomElement(array) {
  let element = array[Math.floor(Math.random() * array.length)];
  return element;
}
```

---

## 5. Choose random condiment

In your `dataLoaded()` function

1. Use `getRandomElement()` to get a random element from the `condiments` array inside the data object (e.g. `data.condiments`), store it in a variable called `condiment` and log it to the console

???

__Solution__

```javascript
function dataLoaded(data) {
  console.log(data);
  let condiment = getRandomElement(data.condiments);
  console.log(condiment);
}
```

---

## 6. Choose appropriate verb

We want to use 'is' if the condiment is singular and 'are' if it's plural. The simplest way to do this is to check if the condiment's name ends with an 's', so after you have your random condiment

1. Declare a variable called `verb` with value `'is'`
2. Write an if-statement that checks if the last letter of the condiment is an 's' and if it is, changes `verb` to `'are'` (you'll need to use `.charAt()` to check the last character, so look it up - remember you can get the length of a string with `.length`)
3. Log the verb out to the console

If you keep reloading the page, you should see the verb as "is" when the condiment has no "s" and "are" when it does.

???

__Solution__

```javascript
function dataLoaded(data) {
  console.log(data);
  let condiment = getRandomElement(data.condiments);
  console.log(condiment);
  let verb = 'is';
  if (condiment.charAt(condiment.length - 1) === 's') {
    verb = 'are';
  }
}
```

---

## 7. Choose the cat and the room

1. Use `getRandomElement()` to put a random cat into a variable called `cat`
1. Use `getRandomElement()` to put a random room into a variable called `room`
1. Log them both to the console

???

__Solution__

```javascript
function dataLoaded(data) {
  console.log(data);
  let condiment = getRandomElement(data.condiments);
  console.log(condiment);
  let verb = 'is';
  if (condiment.charAt(condiment.length - 1) === 's') {
    verb = 'are';
  }
  let cat = getRandomElement(data.cats);
  console.log(cat);
  let room = getRandomElement(data.rooms);
  console.log(room);
}
```

---

## 8. Create a template string and add it to the page

1. Create a variable called `description` containing a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Expression_interpolation) of the form "CONDIMENT IS/ARE like a CAT in a ROOM" (where the capitalised words are replaced by our variables)
2. Add the resulting `description` to the page using `.append()`

???

```javascript
function dataLoaded(data) {
  console.log(data);
  let condiment = getRandomElement(data.condiments);
  console.log(condiment);
  let verb = 'is';
  if (condiment.charAt(condiment.length - 1) === 's') {
    verb = 'are';
  }
  let cat = getRandomElement(data.cats);
  console.log(cat);
  let room = getRandomElement(data.rooms);
  console.log(room);
  let description = `${condiment} ${verb} like a ${cat} in a ${room}.`;
  $('body').append(description);
}
```

---

## Done!

Nice job!

---

# Fin.
