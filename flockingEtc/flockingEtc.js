// Emoji Soccer Pong!

var pobs = [];

var mP; // Previous mouse position (in a vector).

var drawVectors = false;

var wayPoint;

function setup(){
    createCanvas(windowWidth, windowHeight);
    
    rectMode(CENTER);
    
    background(0, 201, 22);
    DrawCourt();
    
    mouseX = width/2;
    mouseY = height/2;
    
    mP = createVector(mouseX, mouseY);
    
    wayPoint = new WayPoint(0,0);
    wayPoint.newPos();
    
    for (let i = 0; i < 23; i++){
        if (i === 0)pobs.push(new Pob());
        else pobs.push(new Pob(true));
        pobs[i].pos.x = Math.random()*(width-80)+40;
        pobs[i].pos.y = Math.random()*(height-80)+40;
        
    }
    
}


function draw(){
    
    checkInput();
    
    background(0, 201, 222,2);
    
    DrawCourt();
    
    // Check collisions, update, and render pobs.
    aiRoutines();
    
}

function aiRoutines(){
    
    // Time for a new wayPoint yet?
    if (frameCount % 180 === 0)
        wayPoint.newPos();
    
    for (let i = 0; i < pobs.length; i++){
        
        for (let j = 0; j < pobs.length; j++){
         if (i !== j && checkCollision(pobs[i], pobs[j], true)) {
            // Add collision forces.
             pobs[j].addForce(pobs[i].vel.x*pobs[i].mass, pobs[i].vel.y*pobs[i].mass);
             pobs[i].addForce(-pobs[i].vel.x*pobs[j].mass, -pobs[i].vel.y*pobs[j].mass);
             // If we hit emoji ball, choose new random emoji.
             if (pobs[j].myEmoji) pobs[j].myEmoji = pobs[j].newEmoji(false);
             //break;
         }
    }
        // Emoji 'seek' player with steering behaviour.
        if (i !== 0)
        reynoldsSeek(pobs[0], pobs[i]);
        else reynoldsSeek(wayPoint, pobs[i]);
        pobs[i].update();
        pobs[i].render();
        
        // Keep pobs within bounds of screen.
        pobs[i].pos.x = constrain(pobs[i].pos.x, 0+pobs[i].rad, width-pobs[i].rad);
        pobs[i].pos.y = constrain(pobs[i].pos.y, 0+pobs[i].rad, height-pobs[i].rad);
    }
}

function mousePressed(){
    // Toggle display of velocity and new vector force. 
    //drawVectors = !drawVectors;
    
    wayPoint.pos.x = mouseX;
    wayPoint.pos.y = mouseY;
}

function touchMoved(){
    
    // Swipe in direction.
    if (mouseX < mP.x) { pobs[0].addForce(-1,0);}
    if (mouseX > mP.x) { pobs[0].addForce(1,0);}
    if (mouseY < mP.y) { pobs[0].addForce(0,-1);}
    if (mouseY > mP.y) { pobs[0].addForce(0,1);}
}

function checkInput(){
    
    // WSAD.
    if (keyIsDown(83)){ pobs[0].addForce(0,1);}
    if (keyIsDown(87)){ pobs[0].addForce(0,-1);}
    if (keyIsDown(65)){ pobs[0].addForce(-1,0);}
    if (keyIsDown(68)){ pobs[0].addForce(1,0);}
    
    // ArrowKeys.
    if (keyIsDown(DOWN_ARROW)){ pobs[0].addForce(0,1);}
    if (keyIsDown(UP_ARROW)){ pobs[0].addForce(0,-1);}
    if (keyIsDown(LEFT_ARROW)){ pobs[0].addForce(-1,0);}
    if (keyIsDown(RIGHT_ARROW)){ pobs[0].addForce(1,0);}
  
    
    mP.x = mouseX;
    mP.y = mouseY;
}

function keyTyped(){
    return false;
}

function keyPressed(){
  
    //    if (keyCode === DOWN_ARROW){ pobs[0].addForce(0,1);}
//    else if (keyCode === UP_ARROW){ pobs[0].addForce(0,-1);}
//    else if (keyCode === LEFT_ARROW){ pobs[0].addForce(-1,0);}
//    else if (keyCode === RIGHT_ARROW){ pobs[0].addForce(1,0);}

    // Return false, so as not to adjust the window itself.
    return false;
  
}


function DrawCourt(){
    
    strokeWeight(4);
    noFill();
    stroke(255);
    
    // Perimeter lines.
    rect(width/2, height/2, width-40, height -40);
    
    // Halfway line.
    //line(width/2, 0, width/2, height);
    
    // Centre circle.
    //ellipse(width/2, height/2, 70,70);
    
    //DisplayScore();
    
}


// Our objects!

function WayPoint(_x, _y){
    this.pos = createVector(_x, _y);
    
    this.newPos = function(){
        this.pos.x = Math.random()* width;
        this.pos.y = Math.random()* height;
    }
}

function Pob(_amIemoji){
    
    // Pseudo-inheritance!
    // This object is either a 'pob'
    // or an emoji ball.
    // They share physics, but differ in
    // appearance.
    if (_amIemoji == false ||
        _amIemoji == null){
        this.emojiBall = false;
        this.speedLimit = 4;
        this.rad = 20;  // Radius.
        this.dec = 0.7; // The lower the more deceleration.
        this.mass = 2;
    } else
    {
        this.emojiBall = true;
        this.myEmoji = this.newEmoji(true);
        this.emojiTime = 2;   // Emoji can change every 2 secs.
        this.emojiTimeStamp = 0;    // Used to record last emoji change.
        this.speedLimit = 2;
        this.dec = 1;           // No deceleration.
        this.rad = 10;
        this.mass = 1;
    }
    
    // Shared/Common variables.
    this.pos = createVector(0,0);
    this.acc = createVector(0,0);
    this.vel = createVector(0,0);
    
    this.dia = this.rad*2;  // Diameter.
    
    // Used in update function.
    

    
}

Pob.prototype.update = function(){
    
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    // Dampening of velocity.
    if (Math.abs(this.vel.x) > 0 ||
        Math.abs(this.vel.y) > 0)
    this.vel.mult(this.dec);
    
    // Speed limit.
    // NB if object's speed limit is
    // zero, then no speed limit will
    // be applied.
    if (this.speedLimit !== 0 &&
        this.vel.mag() > this.speedLimit)
        this.vel.setMag(this.speedLimit);
    
    this.acc.mult(0);
}

Pob.prototype.addForce = function(_xF, _yF){
    
    let forceVector = createVector(_xF, _yF);
    
    this.acc.add(forceVector);
}

// Again, note the pseudo-inheritance at work!
Pob.prototype.render = function(){
    if (this.emojiBall){
    this.renderEmojiBall();
    }
    else if (!this.emojiBall) this.renderPob();
}

Pob.prototype.renderPob = function(){
//    fill(202,0,202, 202);    
//    strokeWeight(1);
//    stroke(0,255,0);
//    rect(this.pos.x, this.pos.y, this.dia, this.dia);
    
    strokeWeight(1);
    stroke(255);
    fill(255);
    
    textSize(this.dia);
    text(String.fromCodePoint(0x1F600 + 1), 
         this.pos.x-this.rad, 
         this.pos.y+this.rad/1.2);
}

Pob.prototype.renderEmojiBall = function(){
     
    strokeWeight(1);
    stroke(255);
    fill(255);
    
    textSize(this.dia);
    text(this.myEmoji, this.pos.x-this.rad, this.pos.y+this.rad/1.2);
    
    noFill();
    stroke(0);
    strokeWeight(3);
    //rect(this.pos.x, this.pos.y, this.dia, this.dia);
    ellipse(this.pos.x, this.pos.y, this.dia, this.dia);
}

Pob.prototype.newEmoji = function(_forceChange){
    // return String.fromCodePoint(
    // '0x1F' + round(random(1536, 1616)).toString(16));
  
    if (_forceChange || millis()-this.emojiTimeStamp > this.emojiTime*600) {
        this.emojiTimeStamp = millis();
    return String.fromCodePoint(0x1F600 + round(Math.random()*42));
    }
    else return this.myEmoji;
}

// Useful functions that take above objects as parameters.

function checkCollision(_ob1, _ob2, _pauli){
    
    let o1L = _ob1.pos.x - _ob1.rad;
    let o1R = _ob1.pos.x + _ob1.rad;
    let o2L = _ob2.pos.x - _ob2.rad;
    let o2R = _ob2.pos.x + _ob2.rad;
    let o1U = _ob1.pos.y - _ob1.rad;
    let o1B = _ob1.pos.y + _ob1.rad;
    let o2U = _ob2.pos.y - _ob2.rad;
    let o2B = _ob2.pos.y + _ob2.rad;
    
    // More sophisticated (but slower) collision check that will correct the object 1's position if found to be overlapping.
    if (_pauli === true){
         
        if (o1R > o2L && o1L < o2R &&
        o1U < o2B && o1B > o2U)
        {
            if (Math.abs(_ob1.pos.x - _ob2.pos.x) >=
                Math.abs(_ob1.pos.y - _ob2.pos.y)){
                _ob1.pos.y += (_ob1.pos.y - _ob2.pos.y)/10;
                return true;
            }
            if (Math.abs(_ob1.pos.x - _ob2.pos.x) <
                Math.abs(_ob1.pos.y - _ob2.pos.y)){
                _ob1.pos.x += (_ob1.pos.x - _ob2.pos.x)/10;
                return true;
            }
            return true;
        }
        else return false;
        
    }
    
        // Simple collision check without correction of positions if objects overlapping.
        if (_pauli === false){
        if (o1R > o2L && o1L < o2R &&
        o1U < o2B && o1B > o2U)
        {return true;}
    else return false;
        }
    
    
    // Well, if slipped through to here, no collision.
    return false;
}


function reynoldsSeek(_targetObj, _steeringObj){
    
    let targetVec = createVector();
    
    targetVec = p5.Vector.sub(_targetObj.pos, _steeringObj.pos);
    
    // newVector = desired velocity - current velocity.
    // This 'newVector' will be the steering *force*.
    // In other words, an *acceleration vector* applied
    // to the steering object.
    
    targetVec.setMag(_steeringObj.speedLimit);
    
    let newVector = p5.Vector.sub(targetVec, _steeringObj.vel);
    
    // Draw the vector force...
    // And vector velocity...
    if (drawVectors){
    strokeWeight(2);
    stroke(0,0,255);
    line(_steeringObj.pos.x,_steeringObj.pos.y, 
         _steeringObj.pos.x + newVector.x*50, 
         _steeringObj.pos.y + newVector.y*50);
    strokeWeight(8);
    stroke(0,42);
    line(_steeringObj.pos.x,_steeringObj.pos.y, 
         _steeringObj.pos.x + _steeringObj.vel.x*50, 
         _steeringObj.pos.y + _steeringObj.vel.y*50);
    }
        
    if (_steeringObj.mass > 1)
        newVector.setMag(1);
        else
            newVector.setMag(0.02);
    
    _steeringObj.addForce(newVector.x, newVector.y);
    
    
    
}


