// Particle class.

// Let's see if I can remember ES6.

class Particle{
    constructor(_x, _y, _r){
        // Radius.
        this.r = _r;
        // Position.
        this.pv = new p5.Vector(_x, _y);
        // Acceleration.
        this.av = new p5.Vector(0,0);
        // Velocity.
        this.vv = new p5.Vector(0,0);
    }
    
    update(){
        // Euler integration.
        this.vv.add(this.av); // Add acc to vel.
        this.pv.add(this.vv); // Add vel to pos.
        
        // Zero out acceleration each update.
        this.av.mult(0);
    }
    
    // Render 
    render(_userRenderFuction){
        if (_userRenderFuction!==null)
        _userRenderFuction(this.pv.x, this.pv.y, this.r);
        else {
        // Default.
        circle(this.pv.x, this.pv.y, this.r);
        }
    }
    
    screenWrap(){
        // If going off screen, transport to
        // opposite side.
        if (this.pv.x < 0) this.pv.x = width;
        if (this.pv.y < 0) this.pv.y = height;
        if (this.pv.x > width) this.pv.x = 0;
        if (this.pv.y > height) this.pv.y = 0;
    }
    
    
}