/*************

Ball

A class defining the properties and behaviour of a simple Breakout ball
that moves on the screen and bounces off walls, paddles, and bricks

*************/

class Ball extends Block {

  // constructor(x,y,ballWidth,ballHeight,ballSpeed)
  //
  // Calls parent constructor with appropriate arguments,
  // then sets speed and velocity based on arguments.
  constructor(x,y,ballWidth,ballHeight,ballSpeed) {
    super(x,y,ballWidth,ballHeight,color(255));
    this.speed = ballSpeed;
    this.vx = this.speed;
    this.vy = this.speed;
  }

  // collide(other)
  //
  // Uses the parent class's collide to check actual overlap
  // then updates velocities based on
  // - the x velocity of the other object (useful for the paddle)
  // - reversing y (primitive but effective enough)
  collide(other) {
    // Note the ability to use the parent's collide function
    if (super.collide(other)) {
      // Move back one "movement"
      this.x -= this.vx;
      this.y -= this.vy;
      // Set x velocity based on the movement of the other on x
      this.vx = constrain(this.vx + other.vx * 0.3,-this.speed,this.speed);
      // Reverse y velocity
      this.vy = -this.vy;
      // Sound effect
      bounceSFX.play();
      // And return true because we hit
      return true;
    }
    // If we get here it didn't hit anything so
    return false;
  }

  // collideWalls()
  //
  // Special case for colliding with walls, checks if the ball has gone off
  // left, right, or top and reverses its appropriate velocity
  collideWalls() {
    // Off left
    if (this.x < 0) {
      this.x = 0;
      this.vx = -this.vx;
      bounceSFX.play();
    }
    // off right
    else if (this.x + this.width > width) {
      this.x = width - this.width;
      this.vx = -this.vx;
      bounceSFX.play();
    }

    // Off top
    if (this.y < 0) {
      this.y = 0;
      this.vy = -this.vy;
      bounceSFX.play();
    }
  }

  // isOffScreen()
  //
  // Returns true if the ball is off the bottom of the canvas, false otherwise
  isOffScreen() {
    // Note that yo ucan return a conditional expression which will return
    // the true/false value of it at this moment in execution
    return (this.y > height);
  }

  // reset()
  //
  // Moves back to the centre of the screen
  reset() {
    this.x = width/2;
    this.y = height/2;
  }
}
