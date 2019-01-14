"use strict";

/*****************

Endless Dialogs
Pippin Barr

Some kind of UI hell!
We must imagine UI Sisyphus happy?

A dialog is triggered as soon as you move the cursor.
Responding to it makes things worse. Every response guarantees a new dialog.
Moving the cursor "too much" generates more dialogs.
You are deluged with mediocre existentialist philosophy about Sisyphus and Camus.

******************/

// Constants to determine how long after dismissing a dialog we should
// add a new one to the page
const MIN_DIALOG_DELAY_TIME = 2000;
const MAX_DIALOG_DELAY_TIME = 20000;

// An array of inane existentialist questions to ask the user
let questions = [
  "Must we imagine Sisyphus happy?",
  "If Sisyphus is happy does that mean that we're happy too?",
  "If Sisyphus weren't happy would that mean there's no possibility of happiness?",
  "Do you feel some days that you're something of a modern day Sisyphus?",
  "If you were Sisyphus and Sisyphus were you, would you expect the Sisyphus who is you to imagine you, Sisyphus, happy?",
  "If Sisyphus pushes a boulder at two feet per minute, should we imagine him happy?",
  "Is Sisyphus meant to be happy because of that bourgeois idea that manual labour is a route to happiness somehow inaccessible to the upper classes?",
  "If Sisyphus is happy, what does that make you?",
  "Would you trade places with Sisyphus if he assured you that he was happy?",
  "If someone told you that pushing rocks uphill is the definition of happiness, how inclined would you be to believe them?",
  "I have this rock in my back yard, want to come over and help me push it up a hill?",
  "Is anyone really capable of happiness in the end, whether they're pushing a rock uphill or not?",
  "Would Sisyphus smile happily at Camus if he found out Camus imagines that he's happy?",
  "Would Hades feel happy on hearing that Camus thinks Sisyphus must be happy in the hell Hades devised?",
  "You are in a maze of twisty passages, all alike. Sisyphus is here and offers to let you push his rock uphill. Will you?"
];

// Load sound effects for dialogs appearing and being dismissed
let newDialogSFX = new Audio("assets/sounds/dialog_new.wav");
let dismissDialogSFX = new Audio("assets/sounds/dialog_dismiss.wav");

// We want to track how much the mouse is moved and when it reaches a maximum
// create a new dialog, so here are a constant and a variable to track that
const MAX_MOUSE_MOVES = 20;
let mouseMoves = 0;

$(document).ready(setup);

function setup() {
  // Whenever the mouse moves, call the mouseMoved function
  $(document).on('mousemove',mouseMoved);
  // After one second, add a dialog to the page
  setTimeout(addDialog,1000);
}

// mouseMoved()
//
// Called whenever the mouse it moved on the page. Used here as a way to track
// user interaction with the page.
function mouseMoved() {
  // Increase the number of tracked move
  mouseMoves++;
  // Check if they exceed the maximum
  if (mouseMoves > MAX_MOUSE_MOVES) {
    // If so, add a dialog
    addDialog();
    // And reset the counter
    mouseMoves = 0;
  }
}

// addDialog()
//
// The key function. It adds a stupid dialog to a random position
// on the screen.
function addDialog () {
  // Play the new dialog sound effect
  newDialogSFX.currentTime = 0;
  newDialogSFX.play();

  // Dynamically create a div and store it in a variable. This is the div
  // we will turn into a dialog box
  let $dialog = $('<div></div>');
  // Give it a title attribute (display in the title bar of the dialog)
  $dialog.attr('title','Question');
  // Choose a random question text
  let question = questions[Math.floor(Math.random() * questions.length)];
  // Add a p tag to the dialog div that contains the question text
  $dialog.append("<p>" + question + "</p>");
  // Finally, add the div to the page
  $('body').append($dialog);

  // Now we have our div on the page, transform it into a dialog with jQuery UI's
  // .dialog() method, supplying a number of options to configure it
  $dialog.dialog({
    // The 'buttons' option lets us specify buttons to appear in the dialog as
    // the properties of an object. The property name is used as the button text
    // and the property contains a function that will be called when that button
    // is clicked. Note how you can have quote marks around a property name (important
    // if you want to include spaces for instance.)
    // In this case both buttons just close the dialog
    buttons: {
      "Yes?": function () {
        $(this).dialog('close');
      },
      "No?": function () {
        $(this).dialog('close');
      }
    },
    // THe 'close' option lets us specify a function to call when the dialog is closed
    close: function () {
      // Play the dismissal sound, ding!
      dismissDialogSFX.currentTime = 0;
      dismissDialogSFX.play();
      // Choose a random delay time (in ms)
      let delay = MIN_DIALOG_DELAY_TIME + Math.random() * (MAX_DIALOG_DELAY_TIME - MIN_DIALOG_DELAY_TIME);
      // Set a timeout and add a new dialog after the delay. Dismiss a dialog, and you just get another one back
      setTimeout(addDialog,delay);
    },
    // The 'containment' option lets us specify where the dialog can go on the screen. 'body' means it will be
    // contained within the body tag, and can't be dragged out of it.
    containment: 'body'
  });

  // Finally, use .offset() on the .parent() of the dialog in order to give it a random position on the screen.
  // Uses .height() and .width() to get the dimensions of elements, including the window.
  $dialog.parent().offset({
    top: Math.random() * ($(window).height() - $dialog.parent().height()),
    left: Math.random() * ($(window).width() - $dialog.parent().width())
  });
}
