/*

Abuse

Abuse with Annyang!

*/

// An array of abusive words/phrases to be added to the end of
// "I am ..." to make the user feel terrible.
let abusePhrases = [
  "pathetic",
  "a loser",
  "a waste of space",
  "nobody",
  "ugly",
  "worthless",
  "hopeless",
  "hideous",
  "worth nothing",
  "a waste of time",
  "lame",
  "disgusting",
  "grotesque",
  "repellent",
  "nothing",
  "never going to amount to anything"
]

// A variable to store the current thing the user
// should be saying. Starts as nothing.
let currentPhrase = '';

$(document).ready(function() {

  // Make sure annyang is available...
  if (annyang) {

    // Add the commands to annyang. That is it should listen
    // for "I am..." or "I'm..." followed by some number of words.
    // In annyang's commands an asterisk (*) followed by a
    // variable names means that annyang will call the function
    // specified with EVERYTHING it heard from that point on...
    var command = {
      "I am *abusePhrase": handleUserSpeech,
      "I'm *abusePhrase": handleUserSpeech
    };

    // Now we've defined the commands we give them to annyang
    // by using its .addCommands() function.
    annyang.addCommands(command);

    // Finally we tell annyang to start listening with its
    // .start() function
    annyang.start();

    // Choose a phrase for the user to say first
    currentPhrase = getNewPhrase();

    // Display the phrase on the page
    $('#command').text('Say, "I am ' + currentPhrase + '."');
  }
});


// handleUserSpeech(phrase)
//
// Called by annyang when it hears a sentence of the form
// "I am X". 'phrase' will contain the X part.
// Checks whether the user said what they were told to say
// and reacts accordingly.
function handleUserSpeech(phrase) {

  // We check whether the user said what they were told to say
  // by comparing what annyang heard (phrase) with the
  // currentPhrase variable
  if (phrase === currentPhrase) {
    // If they said the right thing, we emphasise it...
    // (Note the use of backslash (\) to "escape" the apostrophe in That's
    // so that it doesn't interfere with our string.)
    $('#command').text('That\'s right. You are ' + phrase + '.');
    // Get a new thing for them to say
    currentPhrase = getNewPhrase();
    // And tell them to say it
    $('#command').append(' Now say "I am ' + currentPhrase + '".');
  }
  else {
    // If they said the wrong thing, correct them and demand
    // they say it.
    $('#command').text('That\'s not right. Say "I am ' + currentPhrase + '".');
  }
}


// getNewPhrase()
//
// Returns a random phrase from the abusePhrases array
function getNewPhrase() {
  // Select a random index into the abusePhrases array
  // This little formula of taking the floor of a random
  // number between 0 and 1 times the length of an array
  // gets used all the time.
  let phraseIndex = Math.floor(Math.random() * abusePhrases.length);
  // Get the phrase at that index
  let newPhrase = abusePhrases[phraseIndex];
  // Set the current phrase
  return newPhrase;
}
