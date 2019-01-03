class Avatar extends Agent {
  constructor(x,y,size,healthLoss) {
    super(x,y,size,'#cccc55');
    this.maxSize = size;
    this.healthLoss = healthLoss;
  }

  eat(other) {
    if (!avatar.active) {
      return;
    }

    this.size = constrain(this.size + other.size,0,this.maxSize);
    other.reset();
  }

  update() {
    if (!this.active) {
      return;
    }

    this.x = mouseX;
    this.y = mouseY;

    this.size = constrain(this.size - this.healthLoss,0,this.maxSize);
    if (this.size === 0) {
      this.active = false;
    }
  }
}
