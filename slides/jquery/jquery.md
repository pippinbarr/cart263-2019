### CART 263 / Winter 2019 / Pippin Barr

# jQuery

---

## Contents

- JavaScript and the DOM
- jQuery
- Selection and action
- Event handlers

---

## JavaScript and the DOM

- A major use of JavaScript in the context of the web is working with the DOM (Document Object Model)
- The DOM is a representation of the currently loaded webpage in terms of its elements and their content
- In JavaScript we have access to a variable called `document` which contains an object representing the DOM for the current page
- `document` also give us access to a number of functions for retrieving specific elements and manipulating them

---

## A webpage

```css
body {
  margin: 50px;
  font-family: sans-serif;
  font-size: 1.5em;
}

div {
  color: #4455aa;
  margin-top: 20px;
}

#greeting {
  color: #aabb00;
}
```

```html
<h1>Welcome to my homepage!</h1>
<div id="greeting">
  I'm so <span id="reaction">pleased</span> to see you!
</div>
<div>
  Want to know something? <a href="http://www.google.com">Google</a> it! Ha ha ha!
</div>
```

---

## Manipulating the page via the DOM

```javascript
"use strict";

window.onload = setup;

function setup() {
  let reaction = document.getElementById("reaction");
  reaction.innerText = "surprised";

  let divs = document.getElementsByTagName("div");
  for (let i = 0; i < divs.length; i++) {
    divs[i].style.color = '#ff0000';
  }

  reaction.addEventListener('click',reactionClicked);
}

function reactionClicked(e) {
  e.target.innerText = "depressed";
}
```

- So, we can access and manipulate elements on a webpage via "pure" JavaScript

???

- This is just a small example to show the basic premise of retrieving elements on a page and manipulating them in some way, as well as listening to events

---

## jQuery

- jQuery is an extremely popular JavaScript library created to make accessing, manipulating, and reacting to elements on a webpage easier, more efficient, and more compatible across browsers (among other things)
- Given its popularity, it's important to have at least a basic familiarity with its fundamental ideas
- This idea of using a webpage and its HTML elements as the output of creative programming is also very interesting and holds a lot of potential (as compared, for example, to working solely with an HTML canvas element) - we can make different kinds of experiences

---

## The jQuery library file

- As with any library, we should first go to its homepage and follow the instructions there
  - https://www.jquery.com
- Here we will see the option to download jQuery, but, if we read that download page more carefully we'll realise there are two options:
  - We can download jQuery as a JavaScript file and include it in our project in the typical way
  - We can use a CDN (Content Delivery Network) version of the library that is hosted online
- If we download the file, we force our users to download jQuery when they access our webpage, but we will be able to develop offline. If we use the CDN, we take advantage of caching, but if we don't have access to the internet, we can't work on our project

---

## The CDN option

- For now, we will use the CDN version by adding the following script tag to our project's `index.html`:

```html
<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
```

---

## Document Ready

- A key concept when working with HTML/CSS via JavaScript is that we need to make sure the page has __loaded__ before we start trying to access elements on it
- One way to do this is to add our script tag at the __bottom__ of our `.html` file
- Another way is to rely on JavaScript that only runs when the document is ready to be manipulated, the jQuery version of this leads to programs written this way (in our `script.js`):

```javascript
$(document).ready(function () {

  // Code to run here!

});
```

- This ensures our code will only run once the document is, well, ready.

???

- If you feel queasy seeing an anonymous function defined inside a function call, you can separate them out:

```javascript
$(document).ready(setup);

function setup() {

  // Code to run here!

}
```

---

## Selection and action

- At the heart of programming with jQuery is the concept of __selection__
- Almost all lines of jQuery code begin by __selecting__ one or more elements of a page and then applying some __action__ (i.e. a function) to them
- For example, if we want to fade in the `div` tags in our sample webpage we might write

```javascript
let $divs = $('div');
$divs.hide();
$divs.fadeIn(2000);
```

- Let's look at these more closely

???

- Note how you see a flicker of the `div` elements just when the page loads?
- That's because the page loads and renders for one frame before jQuery's `hide()` function is applied to the elements

---

## Selection and action

```javascript
let $divs = $('div');
```

- When we use jQuery we'll see the dollar sign a lot, it's the name of the main jQuery function used for selection
- So `$('div')` means "select all the `div` elements on the page"
- The result the function returns is a special __object__ created by jQuery
- We can store the result of this selection in a variable (note it is common practice to name variables that will store jQuery objects with a leading `$`)
- In particular it has lots of special functions we can call on it with dot notation...

---

## Selection and action

```javascript
let $divs = $('div');
$divs.hide();
```

- One of the special functions the jQuery object allows is `hide()`
- As you might expect, it hides the specified elements on the page (which we selected using the jQuery `$` function)
- In effect it manipulates their CSS styling to set `display: none`

---

## Selection and action

```javascript
let $divs = $('div');
$divs.hide();
$divs.fadeIn(2000);
```

- The `fadeIn()` function from jQuery does what you might expect
- It fades the specified elements in over the specified amount of time
- (The elements have to be hidden first or they can't be faded in of course!)

---

## Event handlers

- Moving quickly along, the other major aspect of jQuery is handling events that occur on the page
- This includes reacting to user input like mouse movements and clicks, key presses, and so on
- As well as to other browser events
- We use the `on()` function in jQuery to handle specific events on specific elements

```javascript
$divs.on('click',function () {
  $(this).fadeOut();
});
```

???

- Notice how the click event now works all __all__ the divs on the page
- Notice how we used `this` inside the event handler function to specify the __div that is clicked__ rather than all the divs
- If we wanted all the divs to fade out when __any__ div was clicked we could have used `$divs.fadeOut()` instead

---

## Event handlers

- Many of jQuery's functions perform some kind of action __over time__
- `fadeOut()` takes an amount of time to complete, for instance
- Most of these kinds of functions also allow us to specify a function to call when the effect is completed:

```javascript
$divs.on('click',function () {
  $(this).fadeOut(2000,function () {
    console.log("Fade out completed!");
  });
});
```

---

## jQuery!

- Those are the fundamental aspects of jQuery
- We __select__ one or more elements on our page and __act__ on them
- Or we add __event handlers__ for specific kinds of events to elements and __react__ to them

---

## There's so much more

- jQuery can do more than hide and fade elements in and out
- And it can handle more diverse events than just mouse clicks
- It can do so much more it's pointless contemplating explaining it all here
- Rather, we need to be able to engage with the jQuery API (Application Programming Interface)

http://api.jquery.com/

- (As well as the many, many tutorials and resources online.)

---

# Fin.
