class Ball extends Block {

  constructor(x,y,ballWidth,ballHeight,ballSpeed) {
    super(x,y,ballWidth,ballHeight,'#ffffff');
    this.speed = ballSpeed;
    this.vx = this.speed;
    this.vy = this.speed;
  }

  collide(other) {
    if (super.collide(other)) {
      this.x -= this.vx;
      this.y -= this.vy;
      this.vx = constrain(this.vx + other.vx * 0.3,-this.speed,this.speed);
      this.vy = -this.vy;
      bounceSFX.play();
      return true;
    }
  }

  collideWalls() {
    if (this.x < 0) {
      this.x = 0;
      this.vx = -this.vx;
      bounceSFX.play();
    }
    else if (this.x + this.width > width) {
      this.x = width - this.width;
      this.vx = -this.vx;
      bounceSFX.play();
    }

    if (this.y < 0) {
      this.y = 0;
      this.vy = -this.vy;
      bounceSFX.play();
    }
  }

  isOffScreen() {
    return (this.y > height);
  }

  reset() {
    this.x = width/2;
    this.y = height/2;
  }
}
