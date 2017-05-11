
var bgColour;

var spot;

function setup(){
    createCanvas(windowWidth, windowHeight);
    
    bgColour = color(0);
    
    spot = new Pos();
    background(bgColour);
}



function draw(){
    
    //background(bgColour);
    spot.render();
    //spot.whorlMe();
    
}

function mouseMoved(){
    spot.whorlMe();
}

function Pos(){
    
    this.oPos = createVector(width/2, height/2);
    
    this.theta = 0;
    this.tInc = 0.0618;
    
    this.pos = createVector(this.oPos.x, this.oPos.y);
    this.ppos = createVector(this.oPos.x, this.oPos.y);
    
    this.radius = 1.618;
    this.rInc = 1.618;
    
    this.crossed = 0;
    // 0 = under, waiting to cross less than.
    // 1 = over, waiting to cross more than.
    
}

Pos.prototype.whorlMe = function(){
    
    this.ppos = this.pos;
    
    // Increment the radius by Golden Ratio.
    // Then, use polar co-ordinates to curve
    // pos around until crossing the x-axis.
    // When this crossing happens, increment
    // again and repeat process.
    
    // Time to increment radius?
    if (this.crossed === 0 && 
        this.pos.y <= this.oPos.y){
        this.radius *= this.rInc;
        this.crossed = 1;
    }
    else if (this.crossed === 1 && 
        this.pos.y >= this.oPos.y){
        this.radius *= this.rInc;
        this.crossed = 0;
    }
    
    // Increment theta.
    this.theta += this.tInc;
    
    // Calculate p-coords.
    this.pos.x =    this.oPos.x + 
                    this.radius * Math.cos(this.theta);
    this.pos.y =    this.oPos.y + 
                    this.radius * Math.sin(this.theta);
  
}

Pos.prototype.render = function(){
    
    fill(0,0,255);
    stroke(255,255,0,10);
    strokeWeight(2);
    line(this.oPos.x, this.oPos.y, this.pos.x, this.pos.y);
    
    fill(255);
    noStroke();
    ellipse(this.oPos.x, this.oPos.y, 12, 12);
    
    fill(0,0,255,42);
    stroke(255);
    strokeWeight(2);
    ellipse(this.pos.x, this.pos.y, 6, 6);
    
//    fill(0,255,0);
//    stroke(0,255,0);
//    strokeWeight(6);
//    line(this.ppos.x, this.ppos.y, this.pos.x, this.pos.y);
//    
    
}