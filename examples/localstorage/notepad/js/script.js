"use strict";

/*****************

Notepad
Pippin Barr

A very simple persistent notepad! Uses "contenteditable" in the HTML to make a DIV
editable, and saves the contents when it is changed.

******************/

$(document).ready(function () {

  // Load the notes data (if there is any)
  let contents = localStorage.getItem('notes');
  // If it's not null, then there's data to display
  if (contents !== null) {
    // Set the HTML of the notepad to the data loaded
    $('#notepad').html(contents);
  }

  // Listen for keypresses in the notepad and save the data each time
  $('#notepad').on('keyup', function () {
    // Grab the current HTML of the notepad
    let currentNotes = $('#notepad').html();
    // Save it to localStorage
    localStorage.setItem('notes',currentNotes);
  });

});
