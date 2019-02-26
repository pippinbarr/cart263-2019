"use strict";

/*

Frankenstein and Prejudice
Pippin Barr

Using a Markov chain to combine Frankenstein with Pride and Prejudice.
Because we can.

Uses:

Ajax (for file loading)
http://api.jquery.com/jquery.ajax/

RiTA (for Markov chain)
http://rednoise.org/rita/reference/RiMarkov.php
*/

// To contain the texts of our books once loaded
let frankensteinText;
let prideAndPrejudiceText;

// To contain our markov generator
let markov;

$(document).ready(function() {

  // We need to load the texts of Frankenstein and Pride and Prejudice.
  // Because there are two files, a fancy way to do this is with jQuery's
  // .when() method, which will allow us to wait for multiple .ajax() calls
  // to finish before executing the .then() function. Just a little more efficient.
  $.when(
    // Load Pride and Prejudice
    $.ajax({
      url: 'data/pride-and-prejudice.txt',
      dataType: 'text',
      success: function (data) {
        // When loaded, we store the data (a string containing the book)
        // in the appropriate variable
        prideAndPrejudiceText = data;
      }
    }),
    // Load Frankenstein
    $.ajax({
      url: 'data/frankenstein.txt',
      dataType: 'text',
      success: function (data) {
        // When loaded, we store the data (a string containing the book)
        // in the appropriate variable
        frankensteinText = data;
      }
    })
  ).then(gotData); // When finished we call gotData() to carry on with the show
});

// gotData (data)
//
// Called when .ajax has loaded our two books.
function gotData () {
  // Join the two texts together into a single string
  let allText = frankensteinText + ' ' + prideAndPrejudiceText;
  // Create a Markov chain generator
  markov = new RiMarkov(4);
  // Load the string of both books into the Markov generator
  markov.loadText(allText);
  // Generate a paragraph of text
  generateParagraph();
  // Also start listening for a click on the text to change it
  $('#content').on('click',generateParagraph);
}

// generateParagraph()
//
// Clears the current texts and generates a new one in its place
function generateParagraph() {
  // Clear the current text
  $('#content').text('');
  // Generate ten sentences for our paragraph
  // (Output is an array)
  let sentenceArray = markov.generateSentences(10);
  // Turn the array into a single string by joining with spaces
  let sentenceText = sentenceArray.join(' ');
  // Put the new text onto the page
  $('#content').append(sentenceText);
}
