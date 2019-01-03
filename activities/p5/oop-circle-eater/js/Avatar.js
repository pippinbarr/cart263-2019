// Avatar
//
// A class that defined an avatar controlled by the player that can
// eat other agents

class Avatar extends Agent {

  // Constructor
  //
  // Passes some arguments to the super constructor (of Agent)
  // Also sets a maximum size and size loss property
  constructor(x,y,size,sizeLoss) {
    super(x,y,size,'#cccc55');
    this.maxSize = size;
    this.sizeLoss = sizeLoss;
  }

  // eat(other)
  //
  // Add the size of the other agent to this one, and resets the other agent
  eat(other) {
    // Only eat if you're active
    if (!avatar.active) {
      return;
    }

    // Add the size of the other agent to this one
    // But constrain it within the maximum size
    this.size = constrain(this.size + other.size,0,this.maxSize);
    // Reset the other agent to "kill" it
    other.reset();
  }

  // update()
  //
  // Moves the avatar based on the mouse position
  // Shrinks the avatar per frame, and check if it dies
  update() {
    // Don't update if you're not active
    if (!this.active) {
      return;
    }

    // Set the position to the mouse position
    this.x = mouseX;
    this.y = mouseY;

    // Reduce the size by the set amount
    // But constrain it within 0 and maximum
    this.size = constrain(this.size - this.sizeLoss,0,this.maxSize);

    // If the size reaches zero, set to inactive
    if (this.size === 0) {
      this.active = false;
    }
  }
}
