/*************

Block

A class defining a generic block - a rectangle with a position, velocity, color, and the
ability to check for collisions. Used as a parent for Paddle, Ball, and Bricks.


*************/

class Block {
  // constructor(x,y,blockWidth,blockHeight,blockColor)
  //
  // Takes basic arguments of position, dimensions, color
  // and sets those properties as well as creating properties
  // for velocity and active state
  constructor(x,y,blockWidth,blockHeight,blockColor) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.width = blockWidth;
    this.height = blockHeight;
    this.color = blockColor;
    this.active = true;
  }

  // update()
  //
  // Moves the Block according to velocity
  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  // collide(other)
  //
  // Checks for an overlap with the other Block and returns true if so,
  // false if not, or if either block is inactive
  collide(other) {
    // Don't collide if inactive
    if (!this.active || !other.active) {
      return false;
    }

    // Standard rectangular overlap check
    if (this.x + this.width > other.x && this.x < other.x + other.width) {
      if (this.y + this.height > other.y && this.y < other.y + other.height) {
        return true;
      }
    }
    return false;
  }

  // display()
  //
  // Displays as a rectangle in the appropriate position, dimensions, and color
  display() {
    if (!this.active) {
      return;
    }

    push();
    noStroke();
    fill(color(this.color));
    rect(this.x,this.y,this.width,this.height);
    pop();
  }
}
