"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let screamSFX = new Audio('assets/sounds/scream.wav');

$(document).ready(function () {
  let $spans = $('span');
  $spans.addClass('redacted');

  $spans.on('click',function () {
    $(this).removeClass('revealed');
    $(this).addClass('redacted');
  });

  let revelationInterval = setInterval(function () {
    $spans.each(function () {
      if (Math.random() < 0.1) {
        $(this).removeClass('redacted');
        $(this).addClass('revealed');
      }

      if ($('.redacted').length === 0) {
        $spans.off('click');
        screamSFX.play();
        clearInterval(revelationInterval);
      }
    })
  },500);
});
