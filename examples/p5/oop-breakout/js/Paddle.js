/*************

Paddle

A class defining the properties and behaviour of a simple Breakout paddle
that moves with keyboard controls (arrow keys)

*************/

class Paddle extends Block {

  // constructor(x,y,paddleWidth,paddleHeight)
  //
  // Just uses the "Block" constructor which defines a simple rectangle and collisions
  constructor(x,y,paddleWidth,paddleHeight) {
    super(x,y,paddleWidth,paddleHeight,color(255));
  }

  // handleInput()
  //
  // Specific to Paddle, sets velocity based on keys current pressed (left and right)
  handleInput() {
    if (keyIsDown(LEFT_ARROW)) {
      this.vx = -PADDLE_SPEED;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      this.vx = PADDLE_SPEED;
    }
    else {
      this.vx = 0;
    }
  }

  // update()
  //
  // Adds a constraint on the x axis to the existing update() on the parent class Block
  update() {
    // Call the super update() function to move
    super.update();
    // Now constrain the x position based on dimensions and canvas size
    this.x = constrain(this.x,0,width - this.width);
  }
}
