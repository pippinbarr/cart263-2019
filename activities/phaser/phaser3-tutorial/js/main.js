/*********************************************

Making your first Phaser 3 game
Pippin Barr

Tutorial code from:
https://phaser.io/tutorials/making-your-first-phaser-3-game

Commenting by Pippin

*********************************************/

// Key variables to track elements of the game
// Sprites for player and stars
var player;
var stars;
// Groups for bombs and platforms
var bombs;
var platforms;
// Variable to store the cursor keys (used to play the game)
var cursors;
// Score
var score = 0;
// Whether or not the game is over (if it is we need to stop the action)
var gameOver = false;
// The text to display the score
var scoreText;


// In Phaser we create an object literal to store the configuration
// options we'll use to create the game. Each option is a property
// in the object.
var config = {
  // The renderer to be used: CANVAS, WEBGL, AUTO)
  type: Phaser.AUTO,
  // Dimensions of the canvas
  width: 800,
  height: 600,
  // The physics options
  physics: {
    // The physics engine to use (Phaser has multiple)
    default: 'arcade',
    // Configuration properties for the arcade physics
    arcade: {
      // Set up a constant force of gravity
      gravity: { y: 300 },
      // No debug information (set it to true and check it out!)
      debug: false
    }
  },
  // Scene refers to the functions that will be used to run  the game
  // (More complex versions with multiple scenes are possible!)
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// With the configuration set up we can create the game itself!
var game = new Phaser.Game(config);


// Below are the key methods to run a Phaser game
// preload() is just like p5/Processing's preload() - it... preloads data
// create() is just like p5/Processing's setup() - it runs once at the start of the scene/program
// update() is just like p5/Processing's draw() - it runs once per frame while this scene is active

// preload()
//
// Loads the sprites for the game as well as a spritesheet (multiple frames
// for animation)
function preload () {
  // In Phaser you give loaded assets a "key" - the name you'll use later on when you access them
  // Note how we don't store them in variables here, we just use the key
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  // A spritesheet is a special kind of image that contains multiple frames of animation in one file
  // When we load it we have to provide the dimensions of the frames so that Phaser can split it up
  // nicely for us.
  this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

// create()
//
// Sets up the game. A lot of the work is done here since this game relies hugely
// on Phaser's built-in systems for physics etc.
function create () {
  // Set the background image. Note:
  // - We give a position (which refers to the centre of the image)
  // - We give the key of the sprite we want to add to the game
  // Here "add" means "add to the game"
  this.add.image(400, 300, 'sky');

  // Because there are multiple platforms that all do the same kind of thing
  // we store them in a group. It's a static group because the platforms
  // aren't going to move.
  // Note how we use "this.physics" to add these, because they're going to be
  // part of the physics simulation (unlike the background image for instance)
  platforms = this.physics.add.staticGroup();

  // We can now use the platforms group to create the individual platforms using
  // the 'ground' image we preloaded. Note how we give a position and a key.
  // Note the chaining of setScale() and refreshBody() to make the ground image
  // bigger and also to make its physics body the same size (the original sprite is 400x32 in size).
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  //  We can create the other platforms in the same way, but we use the default size of the image
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  // We create the player as a sprite that is part of the physics simulation
  // We specify a position and the key  for the image file.
  player = this.physics.add.sprite(100, 450, 'dude');

  //  Now we have the player as a physics-based sprite, we can set physics properties

  // Setting the bounce means when the player lands it will bounce a little bit (a value of
  // 1 would make it bounce perfectly with no loss of momentum)
  player.setBounce(0.2);
  // We can also tell the player that it should collide with the edges of the screen - no need
  // to check it all ourselves!
  player.setCollideWorldBounds(true);

  // We have a spritesheet with animations so we need to specify what the different animations
  // are (by their grames) and give them names.

  // First a walking animation. We use this.anims.create to create animations, passing an object
  // literal with the options
  this.anims.create({
    // As with all these kinds of things we give it a key (a name)
    key: 'left',
    // We specify the frames as an array, but we use generateFrameNumbers() to take care of it for us
    // It will generate frames between the start and end numbers for the specified key
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    // How fast it should play
    frameRate: 10,
    // How many times it should repeat after finishing (-1 means loop infinitely)
    repeat: -1
  });

  // The turn animation is when the "dude" is facing forwards
  this.anims.create({
    key: 'turn',
    // Here we can see an example of a non-generated frame - just the one frame object with a key and frame
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
  });

  // And the rightward walking animation is similar to the leftward one
  // Note that in this case the left and right walking animations are two separate sets of images
  // in the spritesheet. Often you would see just one set and using other techniques to flip
  // the image in the opposite direction to create the other set.
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  // Phaser provides a special function to create references to the cursor/arrow keys
  // Note again how everything is organized into special objects and properties
  // So we have the 'input' properties which contains a 'keyboard' property which
  // contains an object that handles keyboard-related things.
  cursors = this.input.keyboard.createCursorKeys();

  // The point of the game is to collect stars, so we create a group to contain them.
  // Again this is a physics group, but not static because the stars can move. This creation
  // is a bit fancy because it creates 11 elements right away and even spreads them across
  // the screen at 70 pixel intervals.
  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  // Now we want to set the stars' physics properties, but because there are multiple
  // we need to iterate over them. Rather than a for-loop over an array, we use the
  // star group's special children.iterate() method, which can call a function on each
  // child of the group (each star)
  stars.children.iterate(function (child) {
    //  Give each star a slightly different bounce
    // Note the use of Phaser.Math.FloatBetween() here - creating a random number in a range
    // just like p5/Processing's random() function
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  // We also want a group to hold the bombs when we create them, but it starts empty
  bombs = this.physics.add.group();

  // To display the score we need a text object, which we add to the game with various settings
  // specifically:
  // - position
  // - text to display
  // - an object containing style properties for the text display
  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

  // To set up physical relationships between the objects, we can create "colliders" that will
  // do all the work of detecting and resolving collisions based on the physics properties
  // We need to create them between each set of things that can hit each other (and bounce off)
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);

  // We also need to detect if the player hits stars so they can collect them. For this we use
  // the physics overlap. When we add this we specify
  // - the two things to check for overlap (the player and the stars - note how a GROUP can be checked)
  // - the function to call if they do overlap
  // - extra stuff we won't worry about but needs to be there!
  this.physics.add.overlap(player, stars, collectStar, null, this);

  // We also need to detect if the player gets hit by any fo the bombs and we'll use collider for that again.
  // This time we'll pass it the handler function hitBomb to be called when the bomb hits the player.
  this.physics.add.collider(player, bombs, hitBomb, null, this);

  // Phew! Quite a lot of setup, but the benefit is that a LOT of stuff happens automatically for us now.
}

// update()
//
// Called every frame. Determines how to react to input in this case, no need to do anything else.
function update () {

  // Don't run update if the game is over (so everything will freeze)
  if (gameOver) {
    return;
  }

  // Now we can check the cursors keys to see if they're down one by one
  // In each case we set the appropriate velocity and play the appropriate animation
  if (cursors.left.isDown) {
    // setVelocityX will start the player moving at that number of pixels per second
    // We don't need to do anything more than this
    player.setVelocityX(-160);
    // We play an animation using the sprite's anims property and giving it the appropriate animation key
    player.anims.play('left', true);
  }
  else if (cursors.right.isDown) {
    // Similarly for right
    player.setVelocityX(160);
    player.anims.play('right', true);
  }
  else {
    // If neither left nor right is pressed the player should stop
    // so we set its velocity to 0 and turn it to face the front
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  // Slightly more fancy for jumping
  // We check if the up key is down
  // And we also check on the player's 'body' property (its physics body)
  // whether it is touching something in the dowards direction.
  // This means it will only jump if it is standing on something. Nice!
  if (cursors.up.isDown && player.body.touching.down) {
    // Jumping just means setting an upward velocity.
    // Remember we set up gravity right at the beginning, so that will cause
    // the player to fall appropriately.
    player.setVelocityY(-330);
  }
}

// collectStar
//
// This function is called when the player and a star overlap. It will automatically
// receive arguments containing the player and the specific star they touched.
function collectStar (player,star) {
  // First we disable the star so it is no longer on the screen
  // Note we need to disable both its physical representation on screen (the physics body)
  // AND the visual representation on screen (the sprite)
  star.disableBody(true, true);

  // We increase the score
  score += 10;
  // We update the score text on the screen using its setText() method
  scoreText.setText('Score: ' + score);

  // We check whether all the stars are found. We can use counActive() on the group,
  // and if there are no active stars left, we know they all collected
  if (stars.countActive(true) === 0) {
    // We make a "new" set of stars be reactivating all the inactive stars
    // and setting their y position back to 0
    stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    // We also need to add a bomb to the screen to make the next round harder

    // First we'll work out which side of the screen the player is on and make sure
    // we spawn the bomb on the opposite side so it's a bit easier for them
    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    // Then we can create a new bomb in the bombs group at this location, with the correct key for the image
    var bomb = bombs.create(x, 16, 'bomb');
    // And set some physics properties of the bomb so it behaves in a fun way
    // Perfectly bouncy!
    bomb.setBounce(1);
    // Bounces off the screen edges
    bomb.setCollideWorldBounds(true);
    // Stars with a random x velocity so its unpredicatble
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    // Doesn't respond to gravity
    bomb.allowGravity = false;
    // And remember it already is set up to collide with the player with the collider from earlier on the group
  }
}

// hitBomb(player,bomb)
//
// Function called if the player collides with a bomb. Automatically passed the player and the specific bomb.
// Bad news.
function hitBomb (player, bomb) {
  // We stop physics so the screen freezes
  this.physics.pause();
  // We make the player red tinted
  player.setTint(0xff0000);
  // We player the facing forward animation (just like Mario!)
  player.anims.play('turn');
  // The game is over
  gameOver = true;
}
