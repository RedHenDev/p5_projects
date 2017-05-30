
// Array of splashes/explosions.

var splashes = [];

// Number of particles will be
// *twice* this number.
const particleNumber = 40;

// Utility functions.


// Call this when you'd like an
// explosion.
function makeExplosion(_x,_y, _detTime){
   splashes.push(new Explosion(
        _x,
        _y,
        _detTime));
}

// Call this in update loop to
// animate splashes :)
function updateExplosions(){
 
    for (let i = 0; i < splashes.length; i++){
        // Checks whether time to detonate, and
        // handles physics of particles.
        splashes[i].update();
    }
 
}

// Explosion object.
// The explosion object uses 'gunpowder particle' objects to
// populate its explosive bloom.
// Integral to this object's deployment is a detonation time.
function Explosion(_x, _y, _detonationTime){
    
    // What time was I created?
    this.birthTime = millis();
    
    // Calling function decides my detonation time.
    this.detonationTime = _detonationTime;
    
    // Where do you want the explosion's origin?
    this.pos = createVector(_x, _y);
    
    // Array of particles that constitute the explosion.
    this.gunpowder = [];
    
}

// Decide whether to explode: this function
// handles detonation timing and particle updates.
Explosion.prototype.update = function(){
    if (this.exploded) { 
        for (var i = this.gunpowder.length-1; i > -1; i--){
        this.gunpowder[i].render();
        this.gunpowder[i].update();
        // Splice gunpowder object if flagged as no longer intact.
        if (this.gunpowder[i].intact===false) this.gunpowder.splice(i,1);
        }
        return;
    }
    
    // Check whether time to explode!
    if (millis()-this.birthTime > this.detonationTime)
        {
            this.makeExplosion();
        }
    
}

Explosion.prototype.makeExplosion = function(){
    this.exploded = true;
    
     for (let i = 0; i < particleNumber; i++){
        this.gunpowder.push(new Gp(this.pos.x, this.pos.y, 20));
    }
    
    for (let i = 0; i < particleNumber; i++){
        this.gunpowder.push(new Gp(this.pos.x, this.pos.y, 8));
    }
}

// Gunpowder particle object.
// The idea is that we could request, say, a hundred of these
// when a module is destroyed, and each particle will move
// according to Euler integration. I think it would look best
// if the particles were only 1 pixel in size each.
function Gp(_x, _y, _r){
    
    // Still alive and onscreen?
    this.intact = true;
    
    this.pos = createVector(_x, _y);
    // Initialize with random velocity.
    this.vel = createVector((Math.random()*14)-7, (Math.random()*14)-7);
    this.acc = createVector();
    
    // Default is gravity pulling down.
    this.grav = createVector(0,0.1);
    
    this.radius = _r;
}

Gp.prototype.render = function(){
 
    let colF = (Math.abs(this.vel.y)+10)*(Math.abs(this.vel.x)+10);
    
    //noStroke();
    strokeWeight(1);
    stroke(255);
    fill(0,colF*12,colF,255);
    ellipse(this.pos.x,this.pos.y, this.radius, this.radius);
    
}

Gp.prototype.update = function(){
    
    // Euler integration, with gravity.
    
    // First, gravity force.
    this.acc.add(this.grav);
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.mult(0);
    
    // If no longer on screen, flag up as no longer intact.
    // Managing loop/parent object can then splice this object
    // from relevant array.
    if (this.pos.x < 0 || this.pos.x > width ||
        this.pos.y < 0 || this.pos.y > height)
        this.intact = false;
}
