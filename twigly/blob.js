function blob(x, y, bool) {
  
    // Oooo look at this disgusting code :)
  if (bool==false) {this.x = random(width-200)+100;
  this.y = 42;  this.colour = color(0,42,242,142);
                   this.ID = 0;}
  else {this.x = x; this.y = y;
     this.colour = color(0,242,0,200); this.ID = 1;
  }
  
  this.mySize = random(76)+4;
  
  this.velocity = 0;
  this.acceleration = 0;
  this.gravity = random(0.8)+0.09;
  this.damp = 0.1;
    this.flickStrength = 7.2;
 
  
  this.show = function(){
   // push();
    translate(0,0);
   // translate(width/2, height-100);
  //  translate(this.x,this.y);
    stroke(255);
    strokeWeight(7);
    fill(this.colour);
    ellipse(this.x, this.y, this.mySize, this.mySize);
   // pop();
  }
  
  // Flicks blob upwards.
  this.flick = function(){
      this.velocity = 0;
      this.acceleration = -this.flickStrength;
      //console.log("Flicked!");
  }
  
  this.checkMouse = function(){
      if(mouseX > this.x - (this.mySize/2) &&
        mouseX < this.x + (this.mySize/2) &&
        mouseY > this.y - (this.mySize/2) &&
        mouseY < this.y + (this.mySize/2)){
          this.flick();
         // console.log("Flicked!");
      }
    // console.log("Mouse checked...");
  }
  
  this.bounce = function() {
    this.y = height-(this.mySize*0.25)-1;
    this.velocity = -this.velocity/2.2;
    this.acceleration = -this.acceleration/2.2;
    
      // Only green thisDots call, due to frenzied motion.
    if(this.ID===1)
      adjustAngleND(); 
 //AutoSlideND(); // Call the 'no draw' version to render without flickering.
  }
  
  this.update = function(){
    if (this.y < height-(this.mySize*0.25)) {
     this.velocity *= this.damp;
      this.acceleration += this.gravity;
      this.velocity += this.acceleration;
      this.y += this.velocity;
    } else {
      // bounce!
      this.bounce();
    }
  }
  
  
}