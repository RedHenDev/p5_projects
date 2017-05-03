// JavaScript with the p5 library. 
// 

var eggs = [];

// ***
// Want a hack-job mousePress toggle? Here you go!
var showEggs = true;

function setup(){
    
    createCanvas(windowWidth, windowHeight);
    background(200,0,200);
    
    for (var i = 0; i < 22; i++){
        eggs.push(new Blip());
    }
    
    // For when drawing rectangles (see Orbiter object's render function.)
    rectMode(CENTER);
}

function draw(){
    
    background(200,0,200);
    
    for (var i = 0; i < eggs.length; i++){
        eggs[i].render();
        eggs[i].transportation();
        for (var j = 0; j < eggs.length; j++){
            if (i !== j){
                let bob = checkHit(eggs[i], eggs[j]);
                if (bob === true) { blipCollided(eggs[i], eggs[j]); }
            //if (bob == true) console.log("Egg hit!?"); 
            }
        }
    }
}

// ***
function mousePressed(){
    // Toggle display mode.
    showEggs = !showEggs;
}

function blipCollided(_c1, _c2){
    
    // Invert the eggs' speeds vector.
    // ***
    // Now done for both eggs, to fix collision 'juddering' bug.
    _c2.speed.x = -_c2.speed.x; 
    _c2.speed.y = -_c2.speed.y;  
    _c1.speed.x = -_c1.speed.x; 
    _c1.speed.y = -_c1.speed.y; 
    
    // Should check to see if this connection is already established. If so -- don't push to the array -- thanks.
    // OK, I will then! (--future me).
    // ***
    var sameBlip = false;   // We assume we haven't already connected.
    // Check all eggs' previous hits; if any one previous hits' x position exactly matches the presently colliding egg's x position, then it's probably already connected. Break the loop and do not add this new egg to myHits array.
    for (var i = 0; i < _c1.myHits.length; i++){
        if (_c2.pos.x === _c1.myHits[i].pos.x)
        {sameBlip = true; break;}
        
    }
    
    // If this connected hasn't happened before, add the egg to the myHits array, so that this new connection will be drawn.
    if (sameBlip === false)
    _c1.myHits.push(_c2);
}

function checkHit(_sO, _mO){
    
    // Static and moving object edges.
    var sL = _sO.pos.x - _sO.radius * 1.3;
    var sR = _sO.pos.x + _sO.radius * 1.3;
    var sT = _sO.pos.y - _sO.radius;
    var sB = _sO.pos.y + _sO.radius;
    
    var mL = _mO.pos.x - _mO.radius * 1.3;
    var mR = _mO.pos.x + _mO.radius * 1.3;
    var mT = _mO.pos.y - _mO.radius;
    var mB = _mO.pos.y + _mO.radius;
    
    // Are the objects overlapping.
    if (mR > sL && mL < sR && mT < sB && mB > sT)
        return true;
    else return false;
    
}

// *&*&*&*&*&*&*&*&
// *&*&*&*&*&*&*&*&
// Object classes below here.


// This object is made with the specific purpose, or Fate, or Destiny, of orbiting around a Blip object. You know, for beauty. Also, I have never seen anything orbiting an egg before.
function Orbiter(_parent){
    
    this.parent = _parent;
    
    this.theta = 0;
    
    // Orbital speed, inheriting a little of the parent's movement vector.
    this.rpm = 0.04 * _parent.speed.y;
    
    this.orbitalRadius = 72;
    
    this.render = function(){
        // Use polar co-ordinates to orbit and render orbiter.
        
        this.theta += this.rpm;   // Increment rotation angle.
        
        // X position.
        let myX = this.parent.pos.x + this.orbitalRadius * Math.cos(this.theta);
        
        // Y position.
        let myY = this.parent.pos.y + this.orbitalRadius * Math.sin(this.theta);
        
        // Draw a rectangle.
        // NB we have set rectMode to CENTER in setup(), so that we draw the rectangle from its centre instead of its top left corner (default).
        strokeWeight(4);
        fill(0);
        stroke(255);
        //rect(myX, myY, 12, 12);
        ellipse(myX, myY, 12, 12);
        
        // Also draw a connecting line between parent and child?
        line(myX, myY, this.parent.pos.x, this.parent.pos.y);
    }
    
}


function Blip(){
    
    this.pos = createVector(Math.random()* width, Math.random() * height);
    
    this.speed = createVector((Math.random() * 5)-2.5, (Math.random() * 5)-2.5);
    
    // ***
    // Random range for radii now much smaller.
    this.radius = random(3,12);
    
    this.myHits = [];
    
    // ***
    // Take an 'orbiter' object as a child.
    // Pass this Blip object to the Orbiter object, so that it knows who its parent is (so that it can orbit its parent object).
    // Orbiter baby will be rendered in the Blip's render function. Because that's how we do things in the East Midlands.
    this.baby = new Orbiter(this);
    
    // Object functions.
    this.render = function(){
        
        // Draw the Blip object.
        fill(255, 255);
        stroke(0); 
        // ***
        // StrokeWeight also for eggs.
        strokeWeight(4);
        // ***
        // Toggle egg rendering on and off.
        // A hack! This variable does not belong here. But he just doesn't care.
        if (showEggs)
        ellipse(this.pos.x, this.pos.y, this.radius*1.3*2, this.radius*2);
        
        //Draw any connections that we're lukcy enough to have :)
        // ***
        // Use some transparency (alpha).
        // Paint first recorded collision blue.
        // Paint successive collisions with greater opacity.
        strokeWeight(2);
        var whatAlpha = 100/this.myHits.length;
        for (var i = 0; i < this.myHits.length; i++){
            if (i === 0 && this.myHits[i].myHits[0] === this) stroke(0,0,255); 
            else
            stroke(255, whatAlpha*i);
            line(this.pos.x, this.pos.y, this.myHits[i].pos.x, this.myHits[i].pos.y);
        }
        
        // ***
        // Draw our baby!
        // Go baby orbiter!
        this.baby.render();
        
    }
    
    this.transportation = function(){
        
        this.pos.add(this.speed);
        
        // Prevent the egg from going off-screen (will bounce off walls).
        if (this.pos.x < 0 ) this.speed.x = -this.speed.x;
        if (this.pos.x > width) this.speed.x = -this.speed.x;
        if (this.pos.y < 0 ) this.speed.y = -this.speed.y;
        if (this.pos.y > height) this.speed.y = -this.speed.y;
        
        
    }
    
    
}