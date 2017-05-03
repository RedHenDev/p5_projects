var latF = 0.1; // Lateral force applied to objects hitting edges.

function particle(posX, posY, sizeX, sizeY, hue) {
  
    //this.indx = inDx;   // Array index for this particle.
    
    this.mySize = createVector(sizeX, sizeY);
    this.pos = createVector(posX, posY);
    
    this.prevPos = createVector(posX,posY);
    
    this.colour = hue;
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
    this.maxV = 14; // Topspeed.
    //this.gravity = Math.random(0.8)+0.09;
    this.gravity = 0;       // Gravity that pulls to bottom of window.
    this.gravityON = false; // Gravity that pulls to bottom of window.
   
    this.damp = 0.82;
    this.dampingON = true;
    
    this.frozen = false;
    this.solid = false;
    
    // Want to bounce when hit ground or walls?
    this.groundSolid = false;
    this.wallSolid = false;
    
    this.bounciness = Math.random(0.1,7);    // The higher the bounciness.
    // NB highest value is 7. Must change this.bounce() below.
    
    this.flickable = false;
    
    this.flickStrength = 7.2;
 
    // Parameters = *what* is a string, allowing you to render
    // particle in chosen style.
    // *alphaVal* is a number, from 0 to 255, setting alpha.
  this.render = function(what, alphaVal){
   
      if (!this.visible) return;
      
     if (what==="trail"){
      
      var colourScale = 100;
      
      var Bc = colourScale * Math.abs(this.velocity.mag())*4;
      var Gc = colourScale * Math.abs(this.velocity.x);
      var Rc = colourScale * Math.abs(this.velocity.y);
      
      Rc = constrain(Rc, 120, 255);
      Gc = constrain(Gc, 120, 255);
      Bc = constrain(Bc, 120, 255);
      
            //stroke(Rc,Gc,Bc,alphaVal);
         fill(0,0,Bc, alphaVal);     
         //strokeWeight(4);
            line(this.pos.x,this.pos.y,this.prevPos.x,this.prevPos.y);
            this.prevPos = this.pos;
              return null;
     }
      
      else if (what==="earthquaking"){
    
    
            //stroke (255,255,255);  
            //strokeWeight(3);
            if (!quantum) noStroke();
          else stroke (255,255);
          
          fill(0,0,255, alphaVal);
          //point(this.pos.x,this.pos.y);
           ellipse(this.pos.x,this.pos.y,24,24);
          //line(this.pos.x,this.pos.y,this.prevPos.x,this.prevPos.y);
        //    this.prevPos = this.pos;
              return null;
          
      }
      else {
          // Last resort, draw a point.
          stroke (255,255,255,alphaVal);  
          strokeWeight(8);
          point(this.pos.x,this.pos.y);
      }
          
     
      
  };
  
  // Flicks particle upwards.
  this.flick = function(whichWay){
      
      this.velocity.x = 0;
      
          this.acceleration.y = -this.flickStrength;
      
      if (whichWay==="left") {
        if (this.acceleration.x > 0) this.acceleration.x = 0; 
          this.acceleration.x -= latF;}
      else if (whichWay==="right"){
          if (this.acceleration.x < 0) this.acceleration.x = 0;
        this.acceleration.x += latF;}
      //console.log("Flicked!");
  };
  
  this.checkMouse = function(){
      if(mouseX > this.pos.x - (this.mySize.x/2) &&
        mouseX < this.pos.x + (this.mySize.x/2) &&
        mouseY > this.pos.y - (this.mySize.y/2) &&
        mouseY < this.pos.y + (this.mySize.y/2)){
          if (mouseX < this.pos.x) { this.flick("right"); return null;}
          if (mouseX > this.pos.x) {this.flick("left"); return null;}
          else this.flick("sweet");
      }

      
      
  };
  
  
  
  // Bouncing on ground only!
  // See this.flick() for 'bouncing' on solid particles.
  this.bounce = function() {
    this.pos.y = height-(this.mySize.y/2)-0.01;
    this.velocity.y = 0;//-this.velocity.y/(10-this.bounciness);
    this.acceleration.y = -this.acceleration.y/(10-this.bounciness);
  };
  
  // Checks whether this particle has
  // collided with the passed-in particle.
  // NB only works with particles.
  this.checkCollision = function(whom)
  {
      
      // NB only returns true if both particles are solid.
      if(this.frozen === false && this.solid === true &&
         whom.solid === true &&
            whom.pos.x + whom.mySize.x/2 > this.pos.x - (this.mySize.x/2) &&
            whom.pos.x - whom.mySize.x/2 < this.pos.x + (this.mySize.x/2) &&
            whom.pos.y - whom.mySize.y/2 > this.pos.y - (this.mySize.y/2) &&
            whom.pos.y + whom.mySize.y/2 < this.pos.y + (this.mySize.y/2))
            {
                
                return true;
                
            } else return false;
  };
    
this.setActive = function(bool){
    // If no longer active...
    if (!bool) {
        this.visible = false;
        this.frozen = true;
        this.solid = false;
        //this.pos.y = -99999;    // Orbitally offscreeeeen!
    }
};
   
// Example of a custom afterlife state (instead of setActive(false).)  
this.custom_snowDrop = function(){    
        
        this.birthTime = millis();  // Reborn!
        this.longevity = 5000;     // 10 more seconds life!
        this.mortal = true;
        this.solid = false;
        this.frozen = false;
        // Don't forget to set new afterLife condition!
        this.afterLife = "";
    };
  
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
      
      
      
      // Gravity physics, as well as general damping.
        
    
                // this.velocity.x *= this.damp;
            //this.velocity.y *= this.damp;}
        
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
           this.acceleration.setMag(this.acceleration.mag()* this.damp);
            }
         
         // Have we hit the ground?
        if (this.groundSolid && this.pos.y + (this.mySize.y/2) > height)
            this.bounce();
        
        // Check for mouse contact (i.e. flickability).
        // We check in this method since it's a physics procedure.
        if (this.flickable) this.checkMouse();
        
   
      if (this.screenWrap) {
          if (this.pos.x < 0) this.pos.x = width;
          if (this.pos.x > width) this.pos.x = 0;
           if (this.pos.y < 0) this.pos.y = height;
          if (this.pos.y > height) this.pos.y = 0;
      }
      
      
      // If hitting walls (improved).
      // At the moment, doesn't matter whether frozen.
    if(this.wallSolid && this.pos.x - (this.mySize.x/2) < 0) {
        this.pos.x = 0 + (this.mySize.x/2);
        this.acceleration.x = Math.abs(this.acceleration.x) / 2;
    }
    if(this.wallSolid && this.pos.x + (this.mySize.x/2) > width - 20) {
        this.pos.x = width - (this.mySize.x/2) - 20; 
        this.acceleration.x = Math.abs(this.acceleration.x) / -2;
    }
        
  };
  
  
};