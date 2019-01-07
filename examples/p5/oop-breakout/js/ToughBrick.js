/*************

Brick

A slightly more complex brick which can be hit some number of times before it actually vanishes
and changes its size proportionally to the number of hits!

*************/

class ToughBrick extends Brick {

  // constructor(x,y,brickWidth,brickHeight,brickColor,hits)
  //
  // Takes the standard Brick argumens and passes them on, but also takes
  // an argument for the number of times this tough Brick can be hit
  constructor(x,y,brickWidth,brickHeight,brickColor,hits) {
    super(x,y,brickWidth,brickHeight,brickColor);

    // Remember the initial height of the brick
    this.startHeight = brickHeight;
    // Note how many times this brick can be hit before being vanquished
    this.maxHits = hits;
    // Remember how many hits the brick has left before disappearing
    this.hits = hits;
  }

  // hit()
  //
  // A more complicated version fo the hit() method that takes account
  // of the hit count and the height change
  hit() {
    // Decrement hits because we got hit!
    this.hits--;
    // Make the brick's height proportional to the hits it has suffered
    // making use of p5's map() function
    this.height = map(this.hits,0,this.maxHits,0,this.startHeight);
    // Check if the remaining hits has reach zero, in which case disactive the brick!
    if (this.hits === 0) {
      this.active = false;
    }
  }
}
