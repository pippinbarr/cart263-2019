class Paddle extends Block {

  constructor(x,y,paddleWidth,paddleHeight) {
    super(x,y,paddleWidth,paddleHeight,color(255));
  }

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

  update() {
    super.update();
    this.x = constrain(this.x,0,width - this.width);
  }
}
