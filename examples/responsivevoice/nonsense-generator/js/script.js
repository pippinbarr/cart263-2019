"use strict";

/*********

Nonsense Generator
Pippin Barr

Generate an endless stream of made up language for the computer to speak.

*********/

// Variables with the consontants and vowels we'll use to create basic phonemes
let consonants = "bcdfghjklmnprstvwxyz";
let vowels = "aeiou";

// When the document is ready a click will trigger the main nonsense-speaking
$(document).ready(function () {
  $(document).on('click',function () {
    $('#click').remove();
    sayNonsense();
  });
});

// sayNonsense
//
// Generates and speaks a sentence-worth of nonsense, then starts the next
function sayNonsense() {
  // Generate the nonsense sentence
  let nonsense = generateNonsense();
  // Options with some randomness for variation, plus calling this function
  // again once the speech has finished
  let options = {
    rate: 0.8 + Math.random() * 0.4,
    pitch: 0.8  + Math.random() * 0.4,
    onend: sayNonsense
  }
  // Add the sentence to the page followed by a space (so the next sentence will
  // be in the right place.)
  $('#content').append(nonsense + ' ');
  // Say it
  responsiveVoice.speak(nonsense,"UK English Male",options);
  // With 20% chance, start a new paragraph
  if (Math.random() < 0.2) {
    $('#content').append('<p></p>');
  }
}

// generateNonsense()
//
// Generates a random-length sentence of nonsense with some random punctuation
function generateNonsense() {
  // A variable to hold the sentence
  let sentence = '';
  // Randomly select how long the sentence will be (in words)
  let words = 5 + Math.random() * 10;
  // Loop to generate each word
  for (let j = 0; j < words; j++) {
    // A variable to hold the current word
    let word = '';
    // Randomly select how many phonemes this word is
    let length = 1 + Math.floor(Math.random() * 4);
    // Loop to generate the phonemes of the word
    for (let i = 0 ; i < length; i++) {
      // Add a consonant from the consonants string (treat it like an array)
      word += consonants[Math.floor(Math.random() * consonants.length)];
      // Add a vowel in the same way
      word += vowels[Math.floor(Math.random() * vowels.length)];
    }
    // Add this word to the sentence
    sentence += word;
    // If it's not the last word...
    if (j < words - 1) {
      // Sometimes add a comma, for fun
      if (Math.random() < 0.1) {
        sentence += ',';
      }
      // Add a space so the next word is in the right spot
      sentence += ' ';
    }
  }
  // Capitalise the first letter of the sentence (this is ugly, oh well)
  sentence = sentence.charAt(0).toUpperCase() + sentence.substring(1,sentence.length);
  // Return the sentence including its full-stop
  return sentence + '.';
}
