"use strict";

/*****************

Drum Machine
Pippin Barr

This is a fairly simple implementation of a drum sequencer in p5.
It uses Gibber to play the specific drum sounds.

******************/

// A flag to track whether the user has clicked to start the app
let clickToPlay = true;
// An array to represent the sequence of drum sounds we will play
let drums = [];
// The index in the array of the beat/drum sounds we're playing next
let currentBeat = 0;

// setup()
//
// Just creates a canvas to display the interface of the sequencer

function setup() {
  createCanvas(windowWidth,windowHeight);
}


// draw()
//
// Displays the drum machine interface on the canvas. These are effectively
// buttons you can toggle on and off that represent each beat of the sequence
function draw() {
  // Clear the background
  background(200);

  // If they still need to click to begin, we'll display the message
  if (clickToPlay) {
    fill(0);
    textSize(32);
    textAlign(CENTER,CENTER);
    text("CLICK TO BEGIN",width/2,height/2);
  }
  // Otherwise we display the interface
  else {
    // We start at the top left of the canvas
    let x = 0;
    let y = 0;
    // We calculate the width and height of an individual button
    // based on the length of the sequence and the number of drum sounds
    let w = width / drums[0].sequence.length;
    let h = height / drums.length;

    // Now we can loop through the width and height of the canvas drawing
    // our buttons
    for (let i = 0; i < drums.length; i++) {
      for (let j = 0; j < drums[i].sequence.length; j++) {
        // We check if the sequence has a drum instrument at this
        // location and for this drum
        if (drums[i].sequence.charAt(j) !== '.') {
          // If it does, fill pink (on)
          fill(220,100,100);
        }
        else {
          // If it doesn't, fill grey (off)
          fill(100,100,100);
        }
        // Now draw the button/toggle in the current location
        stroke(255,255,255);
        rect(x,y,w,h);
        // Move to the right
        x += w;
      }
      // If we've processed a whole row, we move down one row
      y += h;
      // And reset the x position back to the left
      x = 0;
    }
  }
}

// mousePressed()
//
// Handles clicking when they "click to play" and also when the user
// clicks on the canvas to select/deselect a drum in the sequence.
function mousePressed() {
  // Handle the first click to play
  if (clickToPlay) {
    // Set the flag to false
    clickToPlay = false;
    // Start Gibber
    Gibber.init();
    // Set up the default drum sequence
    setupDrums();
    // Start the interval that will play each beat of the sequence from the array
    setInterval(playBeat,250);
  }
  else {
    // Otherwise they clicked on the interface so...
    // Calculate which beat in the sequence they clicked (horizontal)
    let beatIndex = Math.floor((mouseX / width) * drums[0].sequence.length);
    // Calculate which drum they clicked
    let sequenceIndex = Math.floor((mouseY / height) * drums.length);
    // Get the sequence for that drum
    let sequence = drums[sequenceIndex].sequence;
    // Get the symbol for the current beat in the sequence
    let currentSymbol = sequence.charAt(beatIndex);
    // If it's a . then we should activate the drum for this beat by
    // changing the symbol to a -
    if (currentSymbol === '.') {
      sequence = sequence.substr(0,beatIndex) + '-' + sequence.substr(beatIndex+1);
    }
    // Otherwise we should deactivate the drum by changing it to a .
    else {
      sequence = sequence.substr(0,beatIndex) + '.' + sequence.substr(beatIndex+1);
    }
    // Finally, replace the sequence with the new sequence
    drums[sequenceIndex].sequence = sequence;
  }
}

// setupDrums()
//
// Sets the initial (empty) sequences for all the drums
function setupDrums() {
  // Add the kick with the Kick instrument (using Gibber), an empty sequence,
  // and a frequency to play the drum at
  drums.push({
    drum: new Kick().amp(1),
    sequence: '........',
    frequency: 110
  });
  // Repeat for the rest of the instruments (snare, hihat, cowbell)
  drums.push({
    drum: new Snare().amp(0.1),
    sequence: '........',
    frequency: 2
  });
  drums.push({
    drum: new Hat().amp(1),
    sequence: '........',
    frequency: 10000
  });
  drums.push({
    drum: new Cowbell().amp(0.2),
    sequence: '........',
    frequency: 8800
  });
}

// playBeat()
//
// Called once per beat by the interval. Plays the appropriate drum sounds
// for each drum sequence
function playBeat() {
  // Go through all the drums
  for (let i = 0; i < drums.length; i++) {
    // If the drum is active in its sequence for the current beat
    if (drums[i].sequence.charAt(currentBeat) !== '.') {
      // Play  it
      drums[i].drum.note(drums[i].frequency);
    }
  }
  // Advance the current beat, looping back to 0 when you reach the end of the array
  currentBeat = (currentBeat + 1) % drums[0].sequence.length;
}
