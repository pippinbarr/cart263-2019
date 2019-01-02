class Brick extends Block {

  constructor(x,y,brickWidth,brickHeight,brickColor) {
    super(x,y,brickWidth,brickHeight,brickColor);
  }

  hit() {
    this.active = false;
  }
}
