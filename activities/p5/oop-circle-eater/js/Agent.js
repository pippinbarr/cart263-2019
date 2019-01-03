// Agent
//
// A class that represents the basic idea of a coloured circle on the screen
// It has a position, size, color, and active state
// It can check for collisions with other agents and can display itself

class Agent {

  // Constructor
  //
  // Sets the key properties based on the arguments
  // Defaults active to true
  constructor(x,y,size,agentColor) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = agentColor;
    this.active = true;
  }

  // collide(other)
  //
  // Returns true if this agent collides with the other agent (e.g. overlaps)
  // false otherwise
  collide(other) {
    // Return false if this agent isn't active
    if (!this.active) {
      return false;
    }

    // Calculate the distance between this agent and the other agent
    let d = dist(this.x,this.y,other.x,other.y);

    // If the distance is less that their two radii, they overlap
    if (d < this.size/2 + other.size/2) {
      return true;
    }
    // Otherwise they don't
    else {
      return false;
    }
  }

  // update()
  //
  // Placeholder since subclasses/children should consider defining an update function
  update() {

  }

  // display()
  //
  // Displays the agent as a coloured circle
  display() {
    // Don't display if not active
    if (!this.active) {
      return;
    }

    // Set fill and stroke then draw an ellipse at this agent's position and with its size
    push();
    noStroke();
    fill(this.color);
    ellipse(this.x,this.y,this.size);
    pop();
  }
}
