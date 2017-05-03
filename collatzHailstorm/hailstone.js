// Class for hailstone.

// This will be a shape (randomized at construction) that
// will be able to rotate, and will be affected by simple
// physics (upthrust force and gravity).

function HailStone(_size){
    
    this.pos = createVector();  // This will figure as the stone's origin.
    this.vel = createVector();
    this.acc = createVector();
    
    this.rad = _size;              // The size of the hailstone is considered a radius.
    
    this.gravSpeed = 0.01;
    
    this.theta = 1;             // Rotation angle.
    this.rv = 0;                // Rotational velocity. Delta of theta.
    this.tor = 0;               // Rotational force. Delta of rv. 
    
    this.collatzHeight = 0; // Height off the ground, where 1 = grounded.
    
    this.vtx = [];
    
    for (let i = 0; i < 6; i++) {
        // Each vertex needs only a length away from the origin.
        // Each vertex will be (360/60 * (i+1)) * theta.
        // This.rad, then, will figure as the hailstone's size limit.
        this.vtx.push(Math.random());  
    }
    
    
}

HailStone.prototype.render = function(){
    // So, I want to be able to draw the
    // h_stone with a number of vertices.
    // We could do this according to a random number?
    // No -- for now, let's just make each stone
    // a hexagon.
    
    // First, we have to work out where each vertex is according
    // to the *rotation* of the hailstone.
    
    // Oh! Let's work out the polar-coords in the draw loop.
    // This feels risky, and just-in-time, but surely the
    // most efficient way?
    
    //strokeWeight(1);
    let brian = constrain(this.collatzHeight/2, 0, 255);
    fill(brian,102);
    stroke(255-brian,102);
    
    beginShape();
    for (let i = 0; i < this.vtx.length; i ++){
        
        vertex(this.pos.x + (this.vtx[i]*this.rad) * Math.cos(radians((60*(i+1))+this.theta)),
               this.pos.y + (this.vtx[i]*this.rad) * Math.sin(radians((60*(i+1))+this.theta)));
        
    }
    endShape(CLOSE);
}

HailStone.prototype.update = function(){
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.rv += this.tor;
    this.theta += this.rv;
    
    // After each iteration here, acceleration should be
    // reduced to zero.
    this.acc.mult(0);
    // Torque too.
    this.tor = 0;
    
    // Dampening.
    if (this.rv > 0) this.rv -= 0.04;
    if (this.rv < 0) this.rv += 0.04;
    
    // Keep hailstone on screen!
    // A simple screen wrap.
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.x > width) this.pos.x = 0;
    
    // Convert y pos to Collatze Height (simply supposed height off ground).
    this.collatzHeight = height - 100 - this.pos.y;
    
}

HailStone.prototype.gravity = function(){
    
    if (this.pos.y < height - 100)
    this.acc.y += this.gravSpeed;
    else this.vel.mult(0);          // Make sure hailstone is stopped by ground.
    
}