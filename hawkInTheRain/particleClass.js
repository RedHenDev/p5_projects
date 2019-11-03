// Particle class.

// Let's see if I can remember ES6.

class Particle{
    constructor(_x, _y, _r){
     
        // Radius (for uniform shapes).
        this.r = _r;
        // Width and height:
        // relevant as surface area in wind etc.
        // Default to radius.
        this.w = _r;
        this.h = _r;
        // Position.
        this.pv = new p5.Vector(_x, _y);
        // Acceleration.
        this.av = new p5.Vector(0,0);
        // Velocity.
        this.vv = new p5.Vector(0,0);
        // Angular velocity.
        this.angv = 0;
        // Angular acceleration.
        this.anga = 0;
        // Angle of rotation, theta.
        this.t = 0;
    }
    
    update(){
        // Euler integration.
        
        // Translations.
        this.vv.add(this.av); // Add acc to vel.
        this.pv.add(this.vv); // Add vel to pos.
        // Air resistance/friction.
        this.vv.mult(0.96);
        
        // Zero out acceleration each update.
        this.av.mult(0);
        
        // Rotations.
        this.angv += this.anga; // Add ang-acc to ang-vel.
        this.t += this.angv;  // Add ang-vel to ang-theta.
        // Air resistance/friction.
        this.angv *= 0.96;
        
        // Zero out angular force each update.
        this.anga = 0;
    }
    
    // Render 
    render(_userRenderFuction){
        
        if (_userRenderFuction!==null){
            _userRenderFuction(this);  
        }
        else {
        // Default. NB. without rotation.
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