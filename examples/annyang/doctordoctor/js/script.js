"use strict";

/*****************

Doctor! Doctor!
Pippin Barr

A simple therapy session between the Eliza chatbot and itself, using speech
output and speech input to conduct the session.

Uses:

Responsive Voice
https://responsivevoice.org/

annyang
https://www.talater.com/annyang/

******************/

// Keep track of which voice to speak in
let doctor1Voice = "UK English Female";
let doctor2Voice = "UK English Male";
let currentVoice = doctor1Voice;
// A variable to hold our Eliza bot
let eliza;

$(document).ready(function () {

  // Make sure we can run annyang (Chrome-dependent), otherwise no point
  if (annyang) {
    $(document).on('click',start);
  }

});

// start()
//
// Initialise eliza and say her first line
function start() {
  $('#click-to-start').remove();

  // Initialise annyang with no commands (because we just want to listen to whatever it hears)
  annyang.init({});
  // Whenever something is heard, handle it as input to Eliza
  annyang.addCallback('result',handleSpeech);
  // Start the engine
  annyang.start();
  // Create our eliza chatbot for processing the responses
  eliza = new ElizaBot();
  // Use a click event to start so we don't run into trouble for audio

  let initial = eliza.getInitial();
  responsiveVoice.speak(initial,currentVoice);
}

// handleSpeech(speech)
//
// Called when annyang detects speech, provides an array of possible
// interpretations in the speech argument
function handleSpeech(speech) {
  // Add the first interpretation to the page
  addToPage(speech[0]);
  // Get Eliza's response to the first possible interpretation
  let response = eliza.transform(speech[0]);
  // Swap the doctor's voice so it's more conversational
  if (currentVoice === doctor1Voice) {
    currentVoice = doctor2Voice;
  }
  else {
    currentVoice = doctor1Voice;
  }
  // Say the response (which will be picked up by annyang, hopefully)
  responsiveVoice.speak(response,currentVoice);
}

// addToPage(text)
//
// Add the line of dialog to the page
function addToPage(dialog) {
  // Create a div
  let $line = $('<div></div>');
  // Give it the dialog class
  $line.addClass("dialog");
  // Set its text to the passed argument
  $line.text(dialog);
  // Append it to the conversation div on the page
  $('#conversation').append($line);
}
