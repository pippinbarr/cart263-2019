/*

Page Composition
Pippin Barr

Plays a 'song' based on the HTML composition of the webpage.

Uses:

Pizzicato
https://alemangui.github.io/pizzicato/

*/

// The minimum frequency to use when playing a tone
const BASE_FREQUENCY = 110;
// An array of all the elements on the page
let elementsArray = [];
// The current element we're playing the note of
let currentElement = 0;
// A string containing the names of elements we want to ignore in our
// composition (because they're often really huge and boring)
let ignoreList = "html script link head meta title body"

let tone;

$(document).ready(function() {

  tone = new Pizzicato.Sound({
    source: 'wave',
  });

  let dubDelay = new Pizzicato.Effects.DubDelay({
      feedback: 0.6,
      time: 0.7,
      mix: 0.5,
      cutoff: 700
  });

  tone.addEffect(dubDelay);

  // Select all the elements on the page except the ignoreList
  let $elements = $('*').not(ignoreList);

  // Select every element on the page and go through each one
  $elements.each(function () {
    elementsArray.push($(this));
  });

  // User click calls playElement to play the first element as a note
  $(document).on('click',playElement);
});

// playElement ()
//
// Converts an HTML element to a muscial note based on primitive
// calculations of its size
function playElement () {
  // Get the element from the array
  let element = elementsArray[currentElement];

  // Get the basic spatial information of the element with jQuery
  let x = element.offset().left;
  let y = element.offset().top;
  let w = element.width();
  let h = element.height();

  // Just so we know
  // console.log(x,y,w,h);

  // Set up the parameters for a synth note

  // Attack and delay are based on the width of the element
  let attack = w / 5000 + 0.01;
  let release = w / 5000 + 0.01;

  console.log(attack,release);

  // Frequency of the note is based on x position
  // Seems to need some base value to sound right
  let note = x + BASE_FREQUENCY;

  // Set the properties on the synth
  // Need ms() to translate millis into samples
  tone.attack = attack;
  tone.release = release;
  tone.frequency = note;

  // Play the note
  tone.play();

  // Increase the current element
  currentElement++;

  // If the current element has reached the end of the elements array
  // reset to the beginning
  if (currentElement == elementsArray.length) {
    currentElement = 0;
  }

  // Highlight the element with a CSS class so we see which one it is
  // We're using jQuery UI so we can animate this transition
  $(element).addClass('playing',attack*1000,'swing',function () {
    // Remove the class after it has animated on
    $(this).removeClass('playing',release*1000,'swing',function () {
      tone.stop();
      playElement();
    });
  });
};
