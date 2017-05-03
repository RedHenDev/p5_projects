function particle(x, y, z){
    
    // Position.
    this.pos = createVector(x,y,z);
    
    // Handy to record starting position.
    //this.origPos = this.pos;
    
    // Life-time.
    this.birthTime = millis();
    this.longevity = 999;         // E.g. 30000 = 30 seconds. 999 = immortal. 
    
    // Dimensions.
    this.size = createVector(10,10,10);
    
    // Appearance.
    this.visible = true;
    this.colour = color(0,255,0);   
    this.alpha = 200;
    
    // Velocity.
    this.vel = createVector();
    // Acceleration.
    this.acc = createVector();
    
    // Physics will not affect if true.
    this.frozen = false;
    this.active = true;
    
    // Gravity.
    this.grav = 0.1;
    
    // At time of coding, will work like air resistance.
    this.damp = true;
    
    
    
};

particle.prototype.update = function(){
        
        if (this.frozen) return;
        
  
    
        // Only concerns the mortal...
        if (this.longevity !== 999) {
          if (millis() - this.birthTime > this.longevity)
          {
              //if (this.afterLife === "") this.setActive(false);
              //if (this.afterLife === "sd") this.custom_snowDrop();
          }
        }
        
    
        // Simple gravity system.
        if (this.grav > 0) 
        { 
            this.acc.y += this.grav;
            this.grav += 0.1;
            
            if (this.pos.y > 50) 
            {
                this.vel.y = -this.vel.y*1.5; 
                this.acc.y = -this.grav; 
                this.grav = 0; // Bounces once.
            }
                               
        } else if (this.vel.y >=-0.1) this.grav = 0.1;
    
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        
        if (this.damp && this.vel.mag() > 0) 
            this.vel.setMag(this.vel.mag() * 0.72);
    
        this.acc.mult(0);
        
    };
    
particle.prototype.setActive = function(ToF){
        
        if (ToF === false){
            this.frozen = true; // Now unaffected by physics updates.
            this.visible = false;
            this.active = false;
        } else {
            this.frozen = false;
            this.visible = true;
            this.active = true;
        }
            
        
    };
    
    particle.prototype.isActive = function(){
        if (this.active) return true;
        else return false;
    };
    
    particle.prototype.render = function(){
        
        if (this.visible === false) return;
        
        // At time of present coding, we'll just
        // draw a cube.
        
        //specularMaterial(0,255,0, 22);
        //texture(texRH);
        
        //push();
        /*
        translate(this.pos.x, this.pos.y, this.pos.z);
        stroke(255);
        strokeWeight(4);
        fill(200, this.colour.y, this.colour.z, this.alpha);
        box(this.size.x, this.size.y, this.size.z);
        */

         // translate(0,0,0);
        push();
        
        
        translate(this.pos.x, this.pos.y, this.pos.z);
        rotateY(radians(yawRot += deltaX));
        
        //fill(this.colour,this.alpha);
        //texture(texRH);
        noFill();
        sphere(this.size.x);
        //fill(this.colour);
       // box(this.size.x*1.5);
        pop();
    };
    