### CART 263 / Winter 2019 / Pippin Barr

# Activity: ResponsiveVoice: Slamina

---

## Brief

An experience in which:

- The user is given five animal names as multiple choice answers
- The computer reads out one of the animal names in reverse
- The user clicks on the animal they think it is
- If right, we get a new animal to guess
- If wrong, we hear the name again

---

## 1. Start a project

Download the [template jQuery project](https://pippinbarr.github.io/cart263-2019/templates/template-jquery-project.zip) __or__ download the [basic template](https://pippinbarr.github.io/cart263-2019/templates/template-project.zip) and add jQuery and jQuery UI to it yourself.

Add ResponsiveVoice to the project

???

__Solution:__

Add the following to the libraries section of your HTML:
```html
<script
src="https://code.jquery.com/jquery-3.3.1.min.js"
integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
crossorigin="anonymous"></script>

<link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
<script
src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
crossorigin="anonymous"></script>

<script src='https://code.responsivevoice.org/responsivevoice.js'></script>
```

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

## 3. Create an array with a list of animals

1. Declare an array variable at the top of your script called something like `animals`
1. Go to https://github.com/dariusk/corpora/blob/master/data/animals/common.json and copy the array of animal names (e.g. the stuff the square brackets)
1. Paste the animals into you `animals` array declaration so the array contains all the animal names

???

__Solution:__

```javascript
let animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];
```

---

## 4. Click to begin

We're going to need a user interaction to start our game so that we can play sound (the voice).

1. Create an element in the HTML that says "Click to begin" and give it an `id`
1. In your script, select the element and add a click event handler
1. In the handler function, remove the click-to-play element from the page and call another function called `startGame()`
1. Define the `startGame()` function at the bottom of your script, just have a `console.log("Starting the game!")` or similar in it for now

You should now be able to see "Click to begin" on the page and click it, when you click it should disappear and your console should show your message.

???

__Solution:__

`index.html`:
```html
<div id="click-to-begin">Click to begin!</div>
```

`script.js`:
```javascript
$(document).ready(setup);

function setup() {
  $('#click-to-begin').on('click',startGame);
}

function startGame() {
  $('#click-to-begin').remove();
  console.log("Starting the game!");
}
```

---

## 5. Adding buttons

1. Add a variable to the top of the program called `correctAnimal` that will store the current correct animal to guess
1. Define an `addButton(label)` function at the bottom of your script (label with be the argument it is passed with the animal name to put on the button):
  1. Use jQuery to create a `div` element with class `guess` and put it in a variable
  1. Use jQuery to set the text of the element to the label provided
  1. Use jQuery UI to turn the element into a button
  1. Add a click event to the button to check if the text of the button matches `correctAnimal`. Use `console.log()` to say "Correct!" or "Wrong!"
  1. Add the button element to the page
1. Set `correctAnimal` and in `startGame()` use `addButton` to add two buttons, one correct and one wrong. Try it.

???

__Solution:__

```javascript
let correctAnimal = "dog";

...

function startGame() {
  $('#click-to-begin').remove();
  addButton('dog');
  addButton('fish');
}

function addButton(label) {
  let $button = $('<div class="guess"></div>');
  $button.text(label);
  $button.button();
  $button.on('click',function () {
    if ($(this).text() === correctAnimal) {
      console.log("Correct!");
    }
    else {
      console.log("Wrong!");
    }
  });
  $('body').append($button);
}
```

---

## 6. Generating guesses

1. Declare an empty array called `answers`, a constant called `NUM_OPTIONS` with the number of guesses you want, and a variable called `correctAnimal` at the top of your script,
1. Define a function called `newRound()` and add the following
  1. Set the `answers` array to be empty
  1. Create a loop that goes up to `NUM_OPTIONS` that:
    1. Chooses a random animal from the `animals` array
    1. Uses `addButton` to add a button with the animal's name to the page
    1. Adds the animal's name to the `answers`
  1. Set `correctAnimal` to a random element in the `answers` array
1. Call `newRound()` in `startGame()` (remove your earlier `addButton()` calls from there)

You should see the number of options you specified and when you click them, one of them should be correct.

???

__Solution:__

```javascript
let answers = [];
const NUM_OPTIONS = 5;
let correctAnimal;

...

function startGame() {
  $('#click-to-begin').remove();
  newRound();
}

function newRound() {
  answers = [];
  for (let i = 0; i < NUM_OPTIONS; i++) {
    let answer = animals[Math.floor(Math.random() * animals.length)];
    addButton(answer);
    answers.push(answer);
  }
  correctAnimal = answers[Math.floor(Math.random() * answers.length)];
}
```

---

## 7. Improve the correct guess

1. Find the place in your code where a correct guess is made (in the click handler for buttons), and in that position:
  1. Use jQuery to remove all guesses from the screen (use the `guess` class to select them)
  1. Call `newRound()` after a delay (use `setTimeout()`) to generate a new set of buttons

???

__Solution:__

```javascript
function addButton(label) {
  let $button = $('<div class="guess"></div>');
  $button.text(label);
  $button.button();
  $button.on('click',function () {
    if ($(this).text() === correctAnimal) {
      $('.guess').remove(); // NEW
      setTimeout(newRound,1000); // NEW
    }
    else {
      console.log("Wrong!");
    }
  });
  $('body').append($button);
}
```

---

## 8. Add speech

1. Define a function called `speakAnimal(name)` that will read out the name of the animal backwards, in it:
  1. __TOGETHER__: Reverse the provided name and store it in a variable (you will need to use: `.split()` to create an array of the letters in the name, `.reverse()` to reverse the array, and `.join()` to join it back together)
  1. Create an object literal called `options` with properties `rate` and `pitch` set to random numbers between 0 and 1
  1. Use ResponsiveVoice to speak the reverse names, with voice "UK English Male" (or something else), and the options object
1. In `newRound()` use `speakAnimal()` to speak the name of the correct animal when it has been chosen
1. In `addButton()` in the response to an incorrect guess/click, use jQuery UI's `effect()` method to shake the button that was clicked, then use `speakAnimal()` to speak the name of the correct animal

???

__Solution:__

```javascript
function speakAnimal(name) {
  let reverseAnimal = name.split('').reverse().join('');
  let options = {
    pitch: Math.random(),
    rate: Math.random()
  };
  responsiveVoice.speak(reverseAnimal,'UK English Male',options);
}

...

function newRound() {
  answers = [];
  for (let i = 0; i < NUM_OPTIONS; i++) {
    let answer = animals[Math.floor(Math.random() * animals.length)];
    addButton(answer);
    answers.push(answer);
  }

  correctAnimal = answers[Math.floor(Math.random() * answers.length)];
  speakAnimal(correctAnimal);
}

...

function addButton(label) {
  let $button = $('<div class="guess"></div>');
  $button.text(label);
  $button.button();
  $button.on('click',function () {
    if ($(this).text() === correctAnimal) {
      $('.guess').remove();
      setTimeout(newRound,1000);
    }
    else {
      $(this).effect('shake');
      speakAnimal(correctAnimal);
    }
  });
  $('body').append($button);
}
```

---

## Done!

Nice job!

---

# Fin.
