/*

Beach Party
Pippin Barr

An exciting beach party with three intense animated gifs. Creates a small menu
at the bottom left which allows you to drag characters onto the beach and
then resize them to your desired size (as well as continue to drag them around).

Plays A Fifth of Beethoven to enhance the experience.

*/

// Load our disco Beethoven into a variable
let music = new Audio('music/beethoven.mp3');

$(document).ready(function() {

  // Pause the music at the beginning
  music.pause();

  // This uses a plugin called Tubular to play the beach movie. Nothing fancy involved,
  // just the default usage of the plugin:
  // https://www.seanmccambridge.com/tubular/
  $('#wrapper').tubular({
    // The plugin takes various options, but in this case we'll just give it
    // the video ID of the YouTube video we want.
    videoId: '4xOEUPBcl94?iv_load_policy=3'
  });

  // Now we handle when the user mouses over the user-interface version
  // of an element to drag it by... making it draggable!
  // (I'm calling the elements at the bottom of the screen that you use
  // as an interface to get images to use the "master" versions of the GIFs.)
  $('#content').on('mouseover', '.master', function () {
    // Make it draggable...
    $(this).draggable({
      // The start property takes a function that is called when dragging starts
      start: function () {
        // If they do start dragging it

        // First we add a new master version back onto the page (since we're
        // dragging away its element right now)

        // We can use $(this).attr('class') to get hold of the current
        // element's classes, which will be something like "dancer master" say.
        // Since we know the current element is one of the "master" elements,
        // we know we want to replace it with an "exact copy" (i.e. an element
        // with the same classes)
        if ($(this).attr('class').indexOf('carlton') != -1) {
          $('#content').append('<div class="master carlton"></div>');
        }
        else if ($(this).attr('class').indexOf('warrior') != -1) {
          $('#content').append('<div class="master warrior"></div>');
        }
        else if ($(this).attr('class').indexOf('dancer') != -1) {
          $('#content').append('<div class="master dancer"></div>');
        }
        // Now we can safely make the one we're dragging not the master
        $(this).removeClass('master');
      },
      // The stop property contains a function that is called when the dragging is stopped
      // e.g. the mouse is released
      stop: function () {
        // Did they drag it far enough out of the interface area?
        if ((Math.abs($(this).position().top) > $(window).height() * 0.85) && (Math.abs($(this).position().left) < 180)) {
          // If not, then remove the dragged element entirely because it's not far enough onto the beach
          $(this).remove();
          // Return immediately to avoid the rest of this function
          return;
        }
        // If we get here, it was dragged onto th ebeach, so...

        // We can make it resizable (the CSS class, not the jQuery yet)
        $(this).addClass('resizable');
        $(this).resizable({
          aspectRatio: true, // Maintain the aspect ratio
        });
        // We need to explicitly call resizable with 'enable' in case
        // this element had been disabled previously.
        $(this).resizable('enable');

        // When the user stops dragging, we should turn on the music
        // if this is the first time they've interacted.
        handleMusic();

        // Fade out the instructions
        // (If they're already faded out, this won't do anything)
        $('#instruction').addClass('fader');
      }
    });
  });

  // When the user mouses over a resizable element, we use jQuery
  // to make it be resizable
  $('#content').on('mouseover', '.resizable', function () {
    $(this).resizable({
      aspectRatio: true, // Maintain the aspect ratio
    });
    // We need to explicitly call resizable with 'enable' in case
    // this element had been disabled previously.
    $(this).resizable('enable');
  });

  // If the user moves the mouse off a resizable element,
  // turn of jQuery's resizable so that the little resizing
  // arrow disappears when not needed.
  $('#content').on('mouseout', '.resizable', function () {
    $(this).resizable('disable');
  });

  // And we can delete instances by double cilcking them
  // We can find them by selecting for "resizable"
  $('#content').on('dblclick', '.resizable', function () {
    // But first check it isn't the master UI version
    if (!$(this).hasClass('master')) {
      $(this).remove();
    }
  });
});

// Called when the user stops resizing an element...
function handleMusic () {
  // If it's currently paused, we should start it
  if (music.paused) {
    // We want the music to loop, because it's that good.
    music.loop = true;
    // We want it to be full volume, naturally.
    music.volume = 1;
    // Now we play it.
    music.play();
  }
}
