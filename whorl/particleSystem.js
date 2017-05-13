//var latF = 0.1; // Lateral force applied to objects hitting edges.

function particle(posX, posY, sizeX, sizeY, hue) {
  
    //this.indx = inDx;   // Array index for this particle.
    
    this.mySize = createVector(sizeX, sizeY);
    this.pos = createVector(posX, posY);
    
    this.prevPos = createVector();
    
    this.colour = color(hue);
    this.visible = true;
    
    this.mortal = false;            // Default, an immortal.
    this.birthTime = millis();      // Birth time.
    this.longevity = 30000;         // 30 seconds.
    // Below allows us to pass in string
    // to write custom functions
    // when particle's longevity met.
    // NB leave as "" for default call of 'setActive(false)';
    this.afterLife = "";            
                                    
    this.screenWrap = true;
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.maxV = 3; // Topspeed.
    //this.gravity = Math.random(0.8)+0.09;
    this.gravity = 0.01;       // Gravity that pulls to bottom of window.
    this.gravityON = false; // Gravity that pulls to bottom of window.
   
    this.damp = 0.82;
    this.dampingON = true;
    
    this.frozen = false;
    this.solid = false;
    


 
    
  this.render = function(_alphaVal){
   
      if (!this.visible) return;
      
     // if (what==="trail")
      
      var colourScale = 100;
      
      var Bc = colourScale * Math.abs(this.velocity.mag())*4;
      var Gc = colourScale * Math.abs(this.velocity.x);
      var Rc = colourScale * Math.abs(this.velocity.y);
      
      Rc = constrain(Rc, 77, 255);
      Gc = constrain(Gc, 77, 255);
      Bc = constrain(Bc, 123, 255);
      
            stroke(Rc,Gc,Bc, _alphaVal);
            strokeWeight(3);
              //strokeWeight(1);
            line(this.pos.x,this.pos.y,this.prevPos.x,this.prevPos.y);
            this.prevPos = this.pos;
              
 
      
  }
  
  
 
    
this.setActive = function(bool){
    // If no longer active...
    if (!bool) {
        this.visible = false;
        this.frozen = true;
        this.solid = false;
        //this.pos.y = -99999;    // Orbitally offscreeeeen!
    }
}
   

  
  this.update = function(){
  
      // Only concerns the mortal...
      if (this.mortal) {
          if (millis() - this.birthTime > this.longevity)
          {
              if (this.afterLife === "") this.setActive(false);
              //if (this.afterLife === "sd") this.custom_snowDrop();
          }
      }
      
      if (this.frozen) return;
      
        
            // Gravity (towards bottom of window).
            if (this.gravityON){
            this.acceleration.y += this.gravity;}
            
            // Core of the physics engine.
        this.pos.add(this.velocity);    
        this.velocity.add(this.acceleration);
            
      // Damping (like air resistance).
            if (this.dampingON){
           
                if (this.velocity.mag() > this.maxV)    // Velocity cap.
                   this.velocity.setMag(this.maxV);
                    // this.velocity.setMag(this.velocity.mag()* this.damp);
                                                // Deceleration.
           //this.acceleration.setMag(this.acceleration.mag()* this.damp);
            this.acceleration.mult(0);
            }
         
         // Have we hit the ground?
        if (this.groundSolid && this.pos.y + (this.mySize.y/2) > height)
            this.bounce();
        
      
        
   
      if (this.screenWrap) {
          if (this.pos.x < 0) this.pos.x = width;
          if (this.pos.x > width) this.pos.x = 0;
           if (this.pos.y < 0) this.pos.y = height;
          if (this.pos.y > height) this.pos.y = 0;
      }
      
      
      // If hitting walls (improved).
      // At the moment, doesn't matter whether frozen.
   
        
  }
  
  
}