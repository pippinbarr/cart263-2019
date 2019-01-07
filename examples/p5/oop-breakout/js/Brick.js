/*************

Brick

A brick is mercifully simple - it's just a block that can be hit() and
thus disactivated

*************/

class Brick extends Block {

  // constructor(x,y,brickWidth,brickHeight,brickColor)
  //
  // Just passes it all on to the parent (Block)
  constructor(x,y,brickWidth,brickHeight,brickColor) {
    super(x,y,brickWidth,brickHeight,brickColor);
  }

  // hit()
  //
  // Just disactivate this brick (so it won't display or update, because of
  // the checks in the Block methods)
  hit() {
    this.active = false;
  }
}
