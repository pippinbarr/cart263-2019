"use strict";

/*****************

Raving Redactionist
Pippin Barr

Keep the document redacted!

******************/

let $spans;

$(document).ready(setup);

function setup () {
  $spans = $('span');

  $spans.on('click',spanClicked);

  setInterval(update,500);
};

function spanClicked() {
  $(this).removeClass('revealed');
  $(this).addClass('redacted');
}

function update() {
  $spans.each(updateSpan);
}

function updateSpan() {
  let r = Math.random();
  if (r < 0.1) {
    $(this).removeClass('redacted');
    $(this).addClass('revealed');
  }
}

// Version using anonymous functions:

// $(document).ready(function () {
//   $spans = $('span');
// 
//   $spans.on('click',function () {
//     $(this).removeClass('revealed');
//     $(this).addClass('redacted');
//   });
//
//   setInterval(function () {
//     $spans.each(function () {
//       let r = Math.random();
//       if (r < 0.1) {
//         $(this).removeClass('redacted');
//         $(this).addClass('revealed');
//       }
//     });
//   },500);
// });
