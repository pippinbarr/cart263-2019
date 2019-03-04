"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let drums = [
];
let currentBeat = 0;

// setup()
//
// Description of setup

function setup() {
  createCanvas(windowWidth,windowHeight);
  drums.push({
    drum: new Kick().amp(1),
    sequence: '........',
    frequency: 110
  });
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

  setInterval(playBeat,250);
}

function playBeat() {
  for (let i = 0; i < drums.length; i++) {
    if (drums[i].sequence.charAt(currentBeat) !== '.') {
      drums[i].drum.note(drums[i].frequency);
    }
  }
  currentBeat = (currentBeat + 1) % drums[0].sequence.length;
}


// draw()
//
// Description of draw()

function draw() {

  background(200);

  let x = 0;
  let y = 0;
  let w = width / drums[0].sequence.length;
  let h = height / drums.length;

  for (let i = 0; i < drums.length; i++) {
    for (let j = 0; j < drums[i].sequence.length; j++) {
      if (drums[i].sequence.charAt(j) !== '.') {
        fill(220,100,100);
      }
      else {
        fill(100,100,100);
      }
      stroke(255,255,255);
      rect(x,y,w,h);
      x += w;
    }
    y += h;
    x = 0;
  }
}

function mousePressed() {
  let beatIndex = Math.floor((mouseX / width) * drums[0].sequence.length);
  let sequenceIndex = Math.floor((mouseY / height) * drums.length);
  let sequence = drums[sequenceIndex].sequence;
  let currentSymbol = sequence.charAt(beatIndex);
  if (currentSymbol === '.') {
    sequence = sequence.substr(0,beatIndex) + '-' + sequence.substr(beatIndex+1);
  }
  else {
    sequence = sequence.substr(0,beatIndex) + '.' + sequence.substr(beatIndex+1);
  }

  drums[sequenceIndex].sequence = sequence;
  console.log(sequence);
}
