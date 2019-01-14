"use strict";

/*****************

Eat Up
Pippin Barr

Using jQuery UI's draggable and droppable methods to
feed a hungry mouth!

Sounds:
Buzzing: https://freesound.org/people/soundmary/sounds/194931/
Chewing: https://freesound.org/people/InspectorJ/sounds/412068/

******************/

let buzzSFX = new Audio("assets/sounds/buzz.mp3");
let crunchSFX = new Audio("assets/sounds/crunch.wav");

let $mouth;
let $fly;

$(document).ready(setup);

function setup() {
  $mouth = $('<img src="assets/images/mouth-open.png">');
  $mouth.droppable({
    drop: flyDropped
  });

  $fly = $('<img src="assets/images/fly.png">');
  $fly.draggable();
  buzzSFX.loop = true;
  buzzSFX.play();

  $('body').append($mouth);
  $('body').append($fly);
}

function flyDropped (event,ui) {
  ui.draggable.remove();
  $(this).attr('src','assets/images/mouth-closed.png');
  buzzSFX.pause();
  crunchSFX.play();
  setInterval(chew,250);
}

function chew () {
  if ($mouth.attr('src') === 'assets/images/mouth-open.png') {
    $mouth.attr('src','assets/images/mouth-closed.png');
    crunchSFX.play();
  }
  else {
    $mouth.attr('src','assets/images/mouth-open.png');
  }
}
