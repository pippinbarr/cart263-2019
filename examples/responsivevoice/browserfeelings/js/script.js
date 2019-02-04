/*

Browser Feelings
Pippin Barr

Using ResponseVoice to say something in reaction to events on a page.
Hopefully making the user feel vaguely uncomfortable.

*/

// The specific voice we want the computer to use
// See: http://responsivevoice.org/text-to-speech-languages/
let voice = 'UK English Male';

// The parameters for the voice in an object
let voiceParameters = {
  pitch: 0.6,
  rate: 0.6,
  volume: 1
}

$(document).ready(function() {

  // We can have speech happen in reaction to different page
  // events like clicks and keypresses, to make things more dynamic...

  $(document).on('click',function () {
    // say() is a function defined below
    say("That feels amazing");
  });

  $(document).on('keypress',function (event) {
    say("I love it when you press key code number " + event.which);
  });

  $(window).on('resize',function () {
    say("It feels so erotic when you resize the window")
  });

  $(window).on('mouseleave',function() {
    say("Don't go, it was just getting interesting");
  });
});


// say(text)
//
// Speaks the text given with the parameters determined at the top of the script.
function say (text) {
  responsiveVoice.speak(text,voice,voiceParameters);
}
