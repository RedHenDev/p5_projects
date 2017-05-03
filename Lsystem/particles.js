var latF = 0.1; // Lateral force applied to objects hitting edges.

function particle(posX, posY, sizeX, sizeY, hue) {
  
    //this.indx = inDx;   // Array index for this particle.
    
    this.mySize = createVector(sizeX, sizeY);
    this.pos = createVector(posX, posY);
    
    this.colour = hue;
    this.visible = true;
    
    this.mortal = false;            // Default, an immortal.
    this.birthTime = millis();      // Birth time.
    this.lengevity = 30000;         // 30 seconds.
    // Below allows us to pass in string
    // to write custom functions
    // when particle's longevity met.
    // NB leave as "" for default call of 'setActive(false)';
    this.afterLife = "";            
                                    
    
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.gravity = Math.random(0.8)+0.09;
    this.damp = 0.1;
    this.frozen = true;
    this.solid = true;
    
    this.groundVanish = false;
    
    this.bounciness = Math.random(0.1,7);    // The higher the bounciness.
    // NB highest value is 7. Must change this.bounce() below.
    
    this.flickable = true;
    //else this.flickable = false;
    
    this.flickStrength = 7.2;
 
    
  this.render = function(what){
   
      if (!this.visible) return;
      
      if (what==="egg")
          {
            //var eggR = random(0,255);
            //var eggG = random(0,255);
            //var eggB = random(0,255);
              
            stroke(0,0,0,123);
            strokeWeight(6);
            fill(255);
            ellipse(this.pos.x, this.pos.y, this.mySize.x, this.mySize.y);
            return null;
          }
      
      
    // Tiny snow-like particle/ball.
    if (this.frozen === false){
        stroke(255);
        strokeWeight(8);
        if (this.solid===false) fill(0,0,255,111);
        else                    fill(this.colour);
        ellipse(this.pos.x, this.pos.y, this.mySize.x, this.mySize.y);
    }
    if (this.frozen) { 
        strokeWeight(3); 
        stroke(0,0,0);
        fill(this.colour);
        rect(this.pos.x,this.pos.y,this.mySize.x,this.mySize.y);
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

      // Call this externally, you naughty piglet.
      //this.internalCollision();
      
  };
  
  this.internalCollision = function(){
        // Hitting any frozen particles?
        // OK -- this code does not belong internal to the object class.
      for (var i = 0; i < particles.length; i++)
      if(this.frozen === false && this.solid === true &&
         particles[i].solid === true && particles[i].frozen === true &&
            particles[i].pos.x + particles[i].mySize.x > this.pos.x - (this.mySize.x/2) &&
            particles[i].pos.x - particles[i].mySize.x < this.pos.x + (this.mySize.x/2) &&
            particles[i].pos.y - particles[i].mySize.y > this.pos.y - (this.mySize.y/2) &&
            particles[i].pos.y + particles[i].mySize.y < this.pos.y + (this.mySize.y/2)){
          particles[i].frozen = false;
          particles[i].solid = false;
          if (this.pos.x < particles[i].pos.x)
          this.flick("left");
          else this.flick("right");
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
  // collided with the passed in particle.
  // NB only works with particles.
  this.checkCollision = function(whom)
  {
      
      
      if(this.frozen === false && this.solid === true &&
         whom.solid === true && whom.frozen === true &&
            whom.pos.x + whom.mySize.x > this.pos.x - (this.mySize.x/2) &&
            whom.pos.x - whom.mySize.x < this.pos.x + (this.mySize.x/2) &&
            whom.pos.y - whom.mySize.y > this.pos.y - (this.mySize.y/2) &&
            whom.pos.y + whom.mySize.y < this.pos.y + (this.mySize.y/2))
            {
                
                // Turn on physics of collided particle.
                // Also, turn off solidity.
               // whom.frozen = false;    
                //whom.solid = false;
                
                // Measure which way to 'flick' particle.
                if (this.pos.x < whom.pos.x)
                this.flick("left");
                else this.flick("right"); // NB central collision = flick("right").
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
  
      // Only concerns of the mortal...
      if (this.mortal) {
          if (millis() - this.birthTime > this.longevity)
          {
              if (this.afterLife === "") this.setActive(false);
              if (this.afterLife === "sd") this.custom_snowDrop();
          }
      }
      
      if (this.frozen) return;
      
      // Gravity physics, as well as general damping.
      if (this.frozen === false)
    {   
        
            this.velocity.x *= this.damp;
            this.velocity.y *= this.damp;
            this.acceleration.y += this.gravity;
            this.velocity.x += this.acceleration.x;
            this.velocity.y += this.acceleration.y;
            this.pos.x += this.velocity.x;
            this.pos.y += this.velocity.y;
        
         // Have we hit the ground?
        if (this.pos.y + (this.mySize.y/2) > height)
            this.bounce();
        
        // Check for mouse contact (i.e. flickability).
        // We check in this method since it's a physics procedure.
        if (this.flickable) this.checkMouse();
        
    } 
      
      // If hitting walls (improved).
      // At the moment, doesn't matter whether frozen.
    if(this.pos.x - (this.mySize.x/2) < 0) {
        this.pos.x = 0 + (this.mySize.x/2);
        this.acceleration.x = Math.abs(this.acceleration.x) / 2;
    }
    if(this.pos.x + (this.mySize.x/2) > width - 20) {
        this.pos.x = width - (this.mySize.x/2) - 20; 
        this.acceleration.x = Math.abs(this.acceleration.x) / -2;
    }
        
  };
  
  
};