"use strict";

/*****************

Fridge Poetry
Pippin Barr

Displays fridge poetry on the page and lets the player arrange the words
as they wish. Saves each new configuration to localStorage so that when
the player returns the words are where they left them.

******************/

// The string our fridge poetry will represent
let string = "the quick brown fox jumped over the lazy dog";

$(document).ready(function () {

  // First try to load the words from storage
  let loaded = loadWords().

  // If this failed there was no word data...
  if (!loaded) {
    // So we create fresh words from our string
    createWordsFromString(string);
  }

  // Add an event handler that will clear storage and reload the page
  // Useful for testing purposes when you want to empty out stored data
  $(document).on('keypress',function (e) {
    console.log("Clearing storage and reloading.");
    if (e.key === 'c') {
      localStorage.clear(); // Clears everything in local storage
      location.reload();
    }
    // You can also use localStorage.removeItem() to remove a specific item
  })
});

// Tries to load words from localStorage
// If successful it adds all the words to the page
function loadWords() {
  console.log("Loading words...");
  // Retrieve the data (if it's there) using getItem()
  let storedWords = localStorage.getItem('words');
  if (storedWords === null) {
    // The result will be null if there is no data with that name
    // So we can return false to indicate new words need to be generated
    return false;
  }

  // If we get here then there was data loaded
  console.log("... load successful.")
  // Parse the JSON data into a JS object
  let words = JSON.parse(storedWords);
  // And create the words on the page based on the data
  createWordsFromData(words);
  return true;
}

// Creates fridge magnet words from a specified string
function createWordsFromString(string) {
  console.log("Creating words...")
  // Split the string into separate words (using spaces as the division point)
  let wordsArray = string.split(' ');
  // Run through the  array generating words
  for (let i = 0; i < wordsArray.length; i++) {
    // Choose a random location on the page
    // (Multiplying by 0.9 as a cheap way to make sure they don't display off the edge)
    let x = Math.random() * window.innerWidth * 0.9;
    let y = Math.random() * window.innerHeight * 0.9;
    // Create the word at that location
    createWord(wordsArray[i],x,y);
  }
  // Once all words are generated, save them so they'll be available and in the same place
  // next time
  saveWords();
}

// Creates fridge magnet words from loaded data
function createWordsFromData(data) {
  // Logging out the date of saving just to prove it's there
  console.log(`Creating words saved at ${data.date}`);
  // Run trough the words in the data and create them according to the saved information
  for (let i = 0; i < data.words.length; i++) {
    createWord(data.words[i].word,data.words[i].x,data.words[i].y);
  }
}

// Creates an element on the page representing the word at the position specified
function createWord(word,x,y) {
  console.log(`Creating word "${word}" at ${x},${y}`);
  // Create the basic div with the word in it
  let $word = $(`<div>${word}</div>`);
  // Style it
  $word.addClass('word');
  // Make it draggable and tell it to save all words whenever it's dragged somewhere
  $word.draggable({
    stop: saveWords
  });
  // Add it to the page
  $('body').append($word);
  // Set its offset to reflect the position requested
  // (Annoyingly if you do this before appending it will break)
  $word.offset({
    top: y,
    left: x
  });
}

// Saves the current words to storage
function saveWords() {
  console.log("Saving words...");
  // Set up a data object to save everything
  let wordsData = {
    date: Date.now(), // Save the date as an extra piece of information
    words: [] // An array to store all the words currently on the page
  };

  // Go through each element with class 'word' on the page
  $('.word').each(function () {
    // Store the data about this word in an object
    let wordData = {
      word: $(this).text(),
      x: $(this).offset().left,
      y: $(this).offset().top
    };
    // Add this data object to the array of words in the data we're saving
    wordsData.words.push(wordData);
  });
  // Convert the data object to a JSON string
  let wordsDataAsJSON = JSON.stringify(wordsData);
  // Save the JSON string to storage as 'words'
  localStorage.setItem('words',wordsDataAsJSON);
}
