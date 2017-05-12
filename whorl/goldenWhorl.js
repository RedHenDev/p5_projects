
// Background colour.
var bgColour;

// Vector positition of progressing spiral.
var spot;

// Our 'golden' turtle object!
var ortle = [];

function setup(){
    
    // Our canvas.
    createCanvas(windowWidth, windowHeight);
    
    // Paint backgroun.
    bgColour = color(0);
    background(bgColour);
    
    spot = new Pos();
    
    for (let i = 0; i < 618; i++){
        ortle[i] = new Gturt(Math.random()*width, Math.random()*height, 10, 100);
        
        //202*(i+1)*0.0618
        
        
    }
    
    
    // So that we can draw rectangles from their centres.
    rectMode(CENTER);
}



function draw(){
    
   //background(bgColour);
    
//    for (let i = 0; i < ortle.length; i++){
//        ortle[i].iterate();
//        ortle[i].render();
//    }
    
     
    spot.render();
    spot.whorlMe();
    
}

function mouseMoved(){
   // spot.whorlMe();
}

function mousePressed(){
     
}

// Golden Ratio turtle!
// _s = speed; _d = distance to travel.
function Gturt(_x, _y, _s, _d){
    
    // Current position vector.
    this.pos = createVector(_x, _y);
    
    // Diameter.
    this.diaX = 6.18;
    // Turtle's body itself is a golden rectangle.
    this.diaY = this.diaX * 0.618;
    
    // Origin pos vector, so that we can
    // calculate distance travelled for current
    // turn iteration.
    this.origin = createVector(_x, _y);
    
    // Iteration count.
    this.n = 0;
    
    // Rotation of turtle, for rendering.
    this.theta = 0;
    
    // Distance travelled.
    this.distT = 0;
    
    // Target distance to travel.
    this.targetD = _d;
    
    // Turtle's speed.
    this.speed = _s;
    
    // Turtle's direction vector.
    this.dir = createVector(1,0);
    
    this.iterate = function(){
        
        // If distance to travel less than length
        // of turtle, no more iterations!
        if (this.targetD < this.diaY) return;
        
        // Increment iteration count.
        this.n++;
        
        // Time to recalculate locomotive vector.
        let lV = createVector();
        lV.x = this.dir.x;
        lV.y = this.dir.y;
        lV.mult(this.speed);
        
        this.pos.add(lV);
        
        // Measure distance travelled.
        let dT = createVector();
        dT = p5.Vector.sub(this.pos, this.origin);
        dT = dT.mag();
        
        if (dT >= this.targetD) this.turn();
        
    }
    
    this.turn = function(){
        
        console.log("Turned!");
        
        // Reset distance travelled.
        this.disT = 0;
        // Set origin to vertex reached.
        this.origin.x = this.pos.x;
        this.origin.y = this.pos.y;
        
        // Find new target distance to travel using
        // Golden Ratio.
        this.targetD *= 0.618;
        
        // Rotate by 90-degrees.
        // Though, it would be a nice to
        // experiment with this in future.
        this.theta += 90;
        
        if (this.dir.x == 1) { 
            this.dir.x = 0; this.dir.y = -1;}
        else if (this.dir.y == -1) {
            this.dir.x = -1; this.dir.y = 0;}
        else if (this.dir.x == -1) {
            this.dir.x = 0; this.dir.y = 1;}
        else if (this.dir.y == 1) {
            this.dir.x = 1; this.dir.y = 0;}
        
        
        
    }
    
    this.render = function(){
        
        fill(255,255,0,61);
        stroke(255,6);
        strokeWeight(1);
        
        push();
        
        translate(this.pos.x, this.pos.y, 
                  this.diaX, this.diaY);
        rotate(radians(this.theta));
        
        rect(0, 0, this.diaX, this.diaY);
        
        pop();
        
    }
    
}





// Position object. Tracks the progress of the golden. 'whorl' 
function Pos(){
    
    this.oPos = createVector(width/2, height/2);
    
    this.theta = 0;
    this.tInc = 0.0618;
    
    // Current position.
    this.pos = createVector(this.oPos.x, this.oPos.y);
    // Previous position. So that we can
    // draw a line from previous pos to current pos.
    this.ppos = createVector(this.pos.x, this.pos.y);
    
    // Distance from origin starting pos.
    this.radius = 1.618;
    this.rInc = 1.618;
    this.metaRinc = 1.618;
    
    // Each time we 'cross' y = 0, then golden ratio
    // applied to current radial distance from origin.
    this.crossed = 0;
    // 0 = under, waiting to cross less than.
    // 1 = over, waiting to cross more than.
    
}

Pos.prototype.whorlMe = function(){
    
    this.ppos.x = this.pos.x;
    this.ppos.y = this.pos.y;
    
    // Increment the radius by Golden Ratio.
    // Then, use polar co-ordinates to curve
    // pos around until crossing the y-axis.
    // When this crossing happens, increment
    // again and repeat process.
    
    // Time to increment radius?
    if (this.crossed === 0 && 
        this.pos.y <= this.oPos.y){
        this.radius *= this.rInc;
        this.crossed = 1;
        this.oPos.x = this.pos.x;
        this.oPos.y = this.pos.y;
    }
    else if (this.crossed === 1 && 
        this.pos.y >= this.oPos.y){
        this.radius *= this.rInc;
        this.crossed = 0;
        this.oPos.x = this.pos.x;
        this.oPos.y = this.pos.y;
    }
    
    // Increment theta.
    this.theta += this.tInc;
    
    // Calculate p-coords.
    this.pos.x =    this.oPos.x + 
                    this.radius * Math.cos(this.theta);
    this.pos.y =    this.oPos.y + 
                    this.radius * Math.sin(this.theta);
    
    if (Math.abs(this.pos.x - this.oPos.x) > width/2){
        this.pos.x = this.oPos.x;
        this.pos.y = this.oPos.y;
        //this.radius = Math.random();
        this.metaRinc += 0.618;
        this.radius += this.metaRinc;
        this.theta = 0;
        this.ppos.x = this.pos.x;
        this.ppos.y = this.pos.y;
    }
  
}

Pos.prototype.render = function(){
    
//    fill(0,0,255);
//    stroke(255,255,0,61);
//    strokeWeight(1);
//    line(this.oPos.x, this.oPos.y, this.pos.x, this.pos.y);
//    
    fill(255);
    noStroke();
   // ellipse(this.oPos.x, this.oPos.y, 6, 6);
    
//    fill(255,42);
//    stroke(255,6);
//    //strokeWeight(1);
//    ellipse(this.pos.x, this.pos.y, 6, 6);
    
    //fill(0,255,0);
    stroke(255,255,0,101);
    strokeWeight(1);
    line(this.ppos.x, this.ppos.y, this.pos.x, this.pos.y);
    
    
}