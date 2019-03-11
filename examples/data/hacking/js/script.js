"use strict";

/*

You Are Hacking Into the Mainframe
Pippin Barr

Code to make it look like you are hacking into the mainframe.

Uses:

ResponsiveVoice
https://responsivevoice.org/

Gibber.lib
http://charlie-roberts.com/gibber/gibber-lib-js/

loDash
https://lodash.com/

*/

// Timing constants
const DIALOG_DELAY_MIN = 2000;
const DIALOG_DELAY_MAX = 5000;
const ANNOUNCEMENT_DELAY = 2000;

// We have an array to store the lines of our code
let code;

// We need to keep track of the current line being typed
let currentLine = 0;

// And the current character of that line
let currentChar = 0;

// Keep track of the current html we're putting on the screen
let currentText;

// We need voice parameters for our mainframe voice
let voiceParameters = {
  pitch: .001, // Low
  rate: 1.2, // Fast
  volume: 0.5, // Not too loud
}


$(document).ready(function() {

  $('#window').hide();

  // A click handler to avoid sound interaction problems
  $(document).on('click',function () {
    $('#click-to-start').remove();
    $('#window').show();

    // Load our script file as the text we'll be 'typing'
    // Note that we use $.ajax here rather than $.loadJSON
    // because we're loading a text file
    $.ajax({
      url: 'js/script.js', // Location of the file
      success: gotData, // Function to call when data is ready
      dataType: 'text' // The type of data we're requesting
    });

    // Listen for keypresses (for typing/hacking)
    $(document).keypress(keyPressed);

    // Start the exciting drum loop for intensity
    startDrums();

    // Start the voice chanting 'you are hacking into the mainframe'
    setInterval(makeAnnouncement,ANNOUNCEMENT_DELAY);

    // Pop up a hacking dialog
    showDialog();
  });


});


// gotData (data)
//
// Called when .ajax has loaded our script.js file

function gotData (data) {
  // Split the file into lines based on the 'carriage return' character \n
  // .split() returns an ARRAY
  code = data.split('\n');
}


// keyPressed ()
//
// Called on keypress. Should add a character of code to the window

function keyPressed (event) {

  // Make sure there's code available to type
  if (!code) {
    // No array with the code, so we don't do anything
    // and just return
    return;
  }

  // Get the current text of the code on screen
  currentText = $('#code').html();

  // Get the next character according to our tracking variables
  // This will return '' if there's no character at that location
  let char = code[currentLine].charAt(currentChar);

  // If there's nothing, add a new line to the screen
  if (char == '') {
    newLine();
  }
  else {
    // Otherwise we add the new character to the text
    let newText = currentText + char;

    // And set the text on screen to the new text
    $('#code').html(newText);

    // And advance the character we're looking at
    currentChar++;
  }
}


// newLine ()
//
// Called by keyPressed when we need a new line in our typed code

function newLine() {
  // Add a <br> element to the page
  $('#code').html(currentText + '<br />');

  // Advance the current line
  currentLine++;

  // Reset the current character index so we start at the
  // start of the next line
  currentChar = 0;

  // Scroll the window so we always see what's being typed
  $('#code').scrollTop($('#code').height());
}


// startDrums ()
//
// Start the Gibber library and start an exciting drum loop

function startDrums() {
  // Initialise Gibber
  Gibber.init();

  // Our drum loop
  let drums = new EDrums('x.xox-x.x.xoxxx-',1/16);
}


// makeAnnouncement ()
//
// Just use responsiveVoice to say you are hacking into the mainframe
// Then queue it up again

function makeAnnouncement () {
  responsiveVoice.speak("You are hacking into the mainframe","UK English Female",voiceParameters);
}


// showDialog ()
//
// Create a dialog box, then queue up showing a new one

function showDialog () {
  // Create a dialog box and show it on the screen
  createDialog();

  // Set a timeout for displaying another new dialog
  // Using loDash library to get a random number in a range!
  setTimeout(showDialog,_.random(DIALOG_DELAY_MIN,DIALOG_DELAY_MAX));

  // let a = ["sheep","cow","chicken"];
  // let r = _.sample(a);
  // let r = a[Math.floor(Math.random() * a.length)];
}


// createDialog ()
//
// Generates a jQuery UI dialog box and puts it on the screen

function createDialog () {
  // Choose a random location for the dialog to appear at
  // using a library called loDash
  // that has a whole bunch of 'helper' functions to do common
  // tasks more easily. In this case, selecting a random number
  // in a range.
  let x = _.random(0,$(window).width());
  let y = _.random(0,$(window).height());

  // Generate the element for the dialog
  // This HTML is just taken from jQuery UI example code
  let dialog = $('<div title="HACKING"><p><span class="ui-icon ui-icon-alert" style="float: left; margin:12px 12px 20px 0;"></span>Are you sure you want to hack this hard?<p></div>')

  // Turn the element into a dialog with jQuery UI's .dialog()
  dialog.dialog({
    // Position it randomly on the screen using x and y
    // as an offset from the top left - a weird way jQuery UI
    // has of specifying positions
    position: {
      my: "center",
      at: "left+" + x + " top+" + y,
      of: window
    },
    // Various other settings
    resizable: false,
    height: "auto",
    width: 400,
    modal: false,
    autoOpen: true,
    // Specify the buttons in the dialog (they both just close it)
    buttons: {
      "Hack": function() {
        $(this).dialog("close");
      },
      "Hack harder": function() {
        $(this).dialog("close");
      }
    }
  });
}
