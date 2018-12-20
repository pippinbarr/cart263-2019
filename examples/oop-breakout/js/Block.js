class Block {
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

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  collide(other) {
    if (!this.active || !other.active) {
      return false;
    }

    if (this.x + this.width > other.x && this.x < other.x + other.width) {
      if (this.y + this.height > other.y && this.y < other.y + other.height) {
        return true;
      }
    }
    return false;
  }

  display() {
    if (!this.active) {
      return;
    }
    
    push();
    noStroke();
    fill(this.color);
    rect(this.x,this.y,this.width,this.height);
    pop();
  }

}
