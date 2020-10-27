//**************************************
// Tues 27th Oct 2020
//**************************************

// My platform object.
class Platform{
  
  // Static variables and stuff.
  static changeWidth(id, val){
    //if (id===-1) return;
    
    // Only make change if this
    // platform exists.
    if (plats[id]){
      plats[id].w = val;
      plats[id].calcForCollisions();
    }
  }
  
  
  constructor(_x, _y){
    // Type.
    this.name = 'platform';
    // Position.
    this.p = createVector(_x,_y);
    // Width and height.
    this.w = 42;
    this.h = 42*0.618;  // Phi proportion.
    // Calculations for collisions done
    // now for optimizatinon.
    // NB will need to be redone if
    // platform's dimensions changed.
    // In fact, let's make a function
    // for that now.
    this.wh = this.w*0.5;  // Half width.
    this.hh = this.h*0.5;  // Half height.
    //calcForCollisions();
    
    // Editor states.
    this.mouseOver = false;
    this.selected = false;
  }
  
  calcForCollisions(){
    this.wh = this.w*0.5;  // Half width.
    this.hh = this.h*0.5;  // Half height.
  }
  
  // Is a given point over me?
  // NB r is radius of point,
  // for use with larger objects.
  // For mouse, r is 1.
  hoverCheck(x,y,r){
    if (x + r > this.p.x - this.wh &&
        x - r < this.p.x + this.wh &&
        y + r > this.p.y - this.hh &&
        y - r < this.p.y + this.hh){
      return true;
    } else return false;
        
  }
  
  render(){
    push();
      if (this.mouseOver &&
         !this.selected) {
        fill(246);
        strokeWeight(3);
        stroke(200,0,200);
        
      } else if(this.selected){
        fill(246);
        strokeWeight(3);
        stroke(0,200,0);
        
      } else{
        // Natural appearance.
        fill(246);
        strokeWeight(1);
        stroke(42);
        
      }
      translate(this.p.x, this.p.y);
      rect(0,0, this.w, this.h);
    pop();
  }
} // End of Platform class.

class Subject extends Platform{
   constructor(_x, _y){
     // Super used to call parent class's
     // constructor. Must be used before
     // .this keyword used for new variables.
     super(_x, _y);
     this.name = 'subject';
     this.w = 64*0.618;
     this.h = 64;
     this.calcForCollisions();
     
     // Euler physics properties.
     this.vel = createVector(0,0);
     this.acc = createVector(0,0);
     // Gravity direction and force.
     this.gDir = createVector(0,0.1);
   }
  
  // Gravity...and collisions?
  // Well yes -- our platforms are
  // our main obj with which sprites
  // can interact physically. That is,
  // platforms should be the key
  // building block of collisions and
  // terrain.
  update(selfIndex){
    
    // I'm just hard coding in plats array.
    // But we could pass in an array parameter
    // in future?
    // This checks collisions.
    // Four corners of subject.
    // False means not inside plat.
    let tr = false;
    let tl = false;
    let br = false; 
    let bl = false;
    for (let i = 0; i < plats.length; i++){
      // Don't check against self...
      if (plats[i]===this) continue;
      // Could I use hoverCheck here?
      // Trying a 'four-corner' system.
      // Each corner point of subject
      // queried as to being inside plat.
      tl = plats[i].hoverCheck(
        this.p.x - this.wh,
        this.p.y - this.hh, 1);
      tr = plats[i].hoverCheck(
        this.p.x + this.wh,
        this.p.y - this.hh, 1);
      bl = plats[i].hoverCheck(
        this.p.x - this.wh,
        this.p.y + this.hh, 1);
      br = plats[i].hoverCheck(
        this.p.x + this.wh,
        this.p.y + this.hh, 1);
        
      // At least one point hit, so 
      // break out of loop.
      if (tl || tr || bl || br) break;
    }
    
    // Bottom of subject in body of plat.
    // So, zero out velocity and add
    // upward force.
    let useGrav = true;
    if (bl || br) {
      // Bounce force is a third of current
      // velocity.y, and gravity off.
      let dir = createVector(0,
                -this.vel.y*
                0.33);
      this.p.y -= 0.5; // Extract upward.
      //this.vel.mult(0);
      this.acc.add(dir);
      // Switch off gravity this update.
      useGrav = false;
    }
    // Top of subject in plat.
    // So, zero out velocity and add
    // downward force.
    if (tl || tr) {
      let dir = createVector(0,1);
      this.vel.mult(0);
      this.acc.add(dir);
    }
    
    // Gravity.
    // Switched off if grounded.
    if (useGrav)
      this.acc.add(this.gDir);
    
    // Apply subject locomotion
    // according to global inputs.
    if (playmode){
      let pDir = createVector(0,0);
      let upForce = 2.7 * !useGrav;
      let rightForce = 0.2;
      let leftForce = 0.2;
      let downForce = 0;
      pDir.x += inRIGHT  * rightForce;
      pDir.x += -inLEFT  * leftForce;
      pDir.y += -inUP    * upForce;
      pDir.y += inDOWN   * downForce;
      this.acc.add(pDir);
    }
    
    // Here is the Euler physics system.
    this.vel.add(this.acc);
    this.p.add(this.vel);
    this.acc.mult(0);
    // Friction.
    let tempY = this.vel.y;
    this.vel.mult(0.96);
    this.vel.y = tempY;  // Do not affect y.
  }
    
  render(){
   push();
      if (this.mouseOver &&
         !this.selected) {
        strokeWeight(3);
        stroke(200,0,200);
        fill(0,142,0);
      } else if(this.selected){
        strokeWeight(3);
        stroke(0,200,0);
        fill(0,111,0);
      } else{
        // Natural appearance.
        strokeWeight(1);
        stroke(42);
        fill(0,111,0);
      } 
     
      translate(this.p.x, this.p.y);
      rect(0,0, this.w, this.h);
   
      pop();
    
  }
}