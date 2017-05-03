// Can we randomly generate the Sierpinski triangle?
// And animate the process in an interesting way?

// Extension: what happens when we use Perlin noise instead
// of the computer's pseudoRamdom number generation?
// (Probably either something cool, or something disgusting.)

// April 2017. B New.

// ************************************
// Our global variables.

// Vertex vector (for each corner of main triangle).
// Also, for current 'turtle' position.
var v = [];
// Record of vertices (i.e. each time turtle 'arrives').
var rV = [];

// Bool iterating mode.
var iterating = true;
var n = 0;

// Aesthetics...
var splashes = [];

function setup(){
    createCanvas(window.innerWidth, window.innerHeight);
    // Dark purple for background?
    background(142,0,142);    
    
    
    
    setupMainShape();
    
    setupTurtle();
    
    fill(0,0,255);
    stroke(255, 42);
    strokeWeight(1);
    
    textSize(54);
    
}

// Main animation loop.
function draw(){
    
    background(142,0,142);
    
    if (iterating) {iterateTurtle(); setSplash();}
    
    renderSierpinski();
    
    updateSplashes();
    
    displayText();
}

function displayText(){
    text("Tap to toggle iteration. N = " + n, 66,64);
}

function setSplash(){
    // Splash!
    //let sV = createVector(cP.x+destinationV.x, cP.y+destinationV.y);
    let sV = createVector(rV[rV.length-1].x, rV[rV.length-1].y);
    makeSplash(sV, 0);
}

function renderSierpinski(){
    for (let i = 0; i < rV.length; i++){
        // Draw line between current position and new.
        stroke(0,0,255,101);
        if (i>0)
        line(rV[i-1].x, rV[i-1].y, rV[i].x, rV[i].y);
        // Render ellipse at this destination.
        stroke(255);
        ellipse(rV[i].x, rV[i].y, 7, 7);
    }
}

function setupMainShape(){
    
    // First, clear out our vertices arrays.
    v = [];
    rV = [];
    
    // Top vertex. v[0]
    v.push(createVector(width/2, height/10));
    // Right bottom vertex. v[1]
    v.push(createVector(width - (width/6), height-(height/10)));
    // Left bottom vertex. v[2]
    v.push(createVector(width/6, height-(height/10)));
    
    noFill();
    strokeWeight(4);
    stroke(255);
    ellipse(v[0].x, v[0].y, 30, 30);
    ellipse(v[1].x, v[1].y, 30, 30);
    ellipse(v[2].x, v[2].y, 30, 30);
    
}

function setupTurtle(){
    // v[3].
    // NB we begin turtle at first vertex (top, v[0]).
    v.push(createVector(v[0].x, v[0].y));
}

function iterateTurtle(){
    
    // Keep count of iterations.
    n++;
    
    // Draw line between current position and
    // 'arrival' position.
    // Arrival position is determined by
    // randomly chosen vector towards one of the
    // main triangle's vertices, but whose
    // magnitude is multiplied by some fraction,
    // by default 1/2. What might the golden ratio
    // look like?
    
    // First, record current position.
    let cP = createVector(v[3].x, v[3].y);
    
    // Now, choose one of the main shape vertices.
    // Might use bitwise truncation here for efficiency:
    // http://stackoverflow.com/questions/7487977/using-bitwise-or-0-to-floor-a-number
    // Alternative rounding method here:
    //let hV = Math.round(Math.random()*3);   // 0, 1, or 2.
    let hV = (Math.random()*3) | 0; // Generates 0, 1, or 2.
    //let hV = (noise(n*0.1) * 3) | 0;
    //console.log(hV);
    
    // Now calculate vector heading towards corresponding
    // vertex (target vector minus current vector position).
    let destinationV = p5.Vector.sub(v[hV], cP);
    
    // Now, set new magnitude. What's the best way to
    // do this? Multiply by desired fraction? Or set
    // magnitude directly? Intuition says latter option
    // will be most efficient. Less calculation?
    destinationV.mult(0.5);
    // GR = 1.61803398875
    //destinationV.mult(0.61803398875);
    
    // Update turtle's current position.
    v[3] = cP.add(destinationV);
    
    // Record this destination in dedicated array.
    rV.push(v[3]);
    
}

function mousePressed(){
    // Toggle whether we are iterating.
    iterating = !iterating;
}



// Want an explosion splash? Just tell me where and when :)
function makeSplash(_posVector, _detTime){
   splashes.push(new Splash( _posVector.x,
                                _posVector.y,
                                _detTime));
}

function updateSplashes(){
 
    for (let i = 0; i < splashes.length; i++){
        // Checks whether time to detonate, and
        // handles physics of particles.
        splashes[i].update();
    }
 
}

// Splash objects etc.
// Explosion object.
// The explosion object uses 'gunpowder particle' objects to
// populate its explosive bloom.
// Integral to this object's deployment is a detonation time.
function Splash(_x, _y, _detonationTime){
    
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
Splash.prototype.update = function(){
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
            this.makeSplash();
        }
    
}

Splash.prototype.makeSplash = function(){
    this.exploded = true;
    
     for (let i = 0; i < 1; i++){
        this.gunpowder.push(new Gp(this.pos.x, this.pos.y, 20));
    }
    
//    for (let i = 0; i < 3; i++){
//        this.gunpowder.push(new Gp(this.pos.x, this.pos.y, 8));
//    }
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
 
    //let colF = (Math.abs(this.vel.y)+10)*(Math.abs(this.vel.x)+10);
    
    noStroke();
    //strokeWeight(1);
    //stroke(255);
    //fill(colF*12,colF*12,colF*12,10);
    fill(255,101);
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