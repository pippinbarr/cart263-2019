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

const MIN_DIALOG_DELAY_TIME = 2000;
const MAX_DIALOG_DELAY_TIME = 20000;

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

let newDialogSFX = new Audio("assets/sounds/dialog_new.wav");
let dismissDialogSFX = new Audio("assets/sounds/dialog_dismiss.wav");

const MAX_MOUSE_MOVES = 20;
let mouseMoves = 0;

$(document).ready(setup);

function setup() {
  $(document).on('mousemove',mouseMoved);
  setTimeout(addDialog,1000);
}

function mouseMoved() {
  mouseMoves++;
  if (mouseMoves > MAX_MOUSE_MOVES) {
    addDialog();
    mouseMoves = 0;
  }
}

function addDialog () {
  newDialogSFX.currentTime = 0;
  newDialogSFX.play();

  let $dialog = $('<div></div>');
  $dialog.attr('title','Question');
  let question = questions[Math.floor(Math.random() * questions.length)];
  $dialog.append("<p>" + question + "</p>");
  $('body').append($dialog);

  $dialog.dialog({
    buttons: {
      "Yes?": function () {
        $(this).dialog('close');
      },
      "No?": function () {
        $(this).dialog('close');
      }
    },
    close: function () {
      dismissDialogSFX.currentTime = 0;
      dismissDialogSFX.play();
      let delay = MIN_DIALOG_DELAY_TIME + Math.random() * (MAX_DIALOG_DELAY_TIME - MIN_DIALOG_DELAY_TIME);
      setTimeout(addDialog,delay);
    },
    containment: 'body'
  });

  $dialog.parent().offset({
    top: Math.random() * ($(window).height() - $dialog.parent().height()),
    left: Math.random() * ($(window).width() - $dialog.parent().width())
  });
}
