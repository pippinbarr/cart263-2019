"use strict";

/*

Foley
Pippin Barr

Script that attached sound effects to various elements on the
page to give them sounds on hover.

Note that in the console you'll see a bunch of errors, but they're
related to the fact that the HTML here is cut and paste from jQuery's
documentation for the .hover() method. (It's basically missing files
and other issues, but they don't affect the core premise here.)

*/

// We make a JavaScript Object with properties/keys that are
// the names of HTML elements. We'll use this to store the
// sound effect for the specified element.
let sfx = {
  a: undefined,
  div: undefined,
  p: undefined,
  img: undefined,
  form: undefined,
  h2: undefined,
  input: undefined,
  li: undefined,
  section: undefined,
  span: undefined,
  strong: undefined,
  ul: undefined,
}

$(document).ready(function() {

  // First we get an array of all the tags (the 'keys' of the object) in the elements object
  // (e.g. a list of all the property names)
  let tags = Object.keys(sfx);
  // Take a look at this in the console, as it's kind of cool
  console.log(tags);

  // Now we go through each of the keys (e.g. a, then div, then p, ...)
  for (let i = 0; i < tags.length; i++) {
    // Get the name of the element
    let tag = tags[i];
    // Derive the path and filename from the tag name (by adding 'wav')
    let path = `sounds/${tag}.wav`;
    // Create a sound effect for the element using Howler
    let tagSFX = new Howl({
      src: path
    });
    // Set the sound effect for the element in the elements object
    // so we can trigger it later
    sfx[tag] = tagSFX;
    // Add a hover by selecting the element type with jQuery
    $(tag).on('mouseover',mouseOver);
  }

});

function mouseOver () {
  // Sadly we can't access elementName in here, so we have to
  // look up the tagname of this element again, which is a bit dumb
  // .prop('tagName') gives us the element name in all caps
  // so we use .toLowerCase() to make it lower case again to match
  // out elements object.
  let tag = $(this).prop('tagName').toLowerCase();
  // Play the SFX associated with this elementName
  sfx[tag].play();
}
