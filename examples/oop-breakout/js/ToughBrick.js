class ToughBrick extends Brick {

  constructor(x,y,brickWidth,brickHeight,brickColor,hits) {
    super(x,y,brickWidth,brickHeight,brickColor);

    this.startHeight = brickHeight;
    this.maxHits = hits;
    this.hits = hits;
  }

  hit() {
    this.hits--;
    this.height = map(this.hits,0,this.maxHits,0,this.startHeight);
    console.log(this.alpha);
    if (this.hits === 0) {
      this.active = false;
    }
  }

}
