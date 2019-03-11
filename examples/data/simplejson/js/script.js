/*

Simple JSON
Pippin Barr

A very simple example of loading and using JSON data

*/


$(document).ready(function() {

  // The first thing we need to do is load the data we're going
  // to use to get random words.
  //
  // For that we use jQuery's .getJSON() function, which we give
  // the location of the file, and a function to call when the data
  // is available...
  $.getJSON('data/data.json', gotData);

});

// gotData (data)
//
// This function gets called by getJSON when the data has been loaded.
// The data itself will be in the 'data' argument as a JavaScript object.
function gotData(data) {

  // We can print the data to the console to see what it looks like
  console.log(data);

  // Insert the data onto our webpage
  $('#name').text(data.name);
  $('#eyecolour').text(data.eyecolour);
  $('#haircolour').text(data.haircolour);
  $('#height').text(data.height);
  $('#religious').text(data.religious);

}
