// The idea of this code is to create pong in JavaScript...with emojis.

// Paddle variables.
var p1X;
var p1Y;
var p2X;
var p2Y;
var pSizeX;
var pSizeY;
var p1MovX;
var p1MovY;
var p2MovX;
var p2MovY;
var p1Emoji;
var p2Emoji;

// Game variables.
var p1Score;
var p2Score;

// Puck variables.
var puckX;
var puckY;
var puckSize;
var pMovX;
var pMovY;
var puckEmoji;

// Ai variables.
var aiTimeStamp;
var aiTime;
var aiHeading;  // Vector. Global, to retain over intervals.

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0,72, 72);
    
    rectMode(CENTER);   // To draw rects from their centre location, not top left corner.
    
    SetStartPositions();
}

function draw(){
    
    // With some cheeky alpha, for trail effect...
    background(0,174, 0,72);
    
    DrawCourt();
    
    MovePuck();
    DrawPuck(puckX, puckY);
    
    MovePlayerPaddle();
    
    Ai();
    MoveAiPaddle();
    
    DrawPadle(p1X, p1Y);
    DrawPadle(p2X, p2Y);
    
    updateExplosions();
  
}

function touchEnded(){
    
    SetPlayerPaddleDest(mouseX, mouseY);
    
  // Return false, so as not to adjust the window itself.
return false;
  
}

function keyPressed(){
  if (keyCode === DOWN_ARROW){ p1MovY += 5;}

  if (keyCode === UP_ARROW){ p1MovY -= 5;}


if (keyCode === RIGHT_ARROW){ p1MovX += 5;}


if (keyCode === LEFT_ARROW){ p1MovX -= 5;}

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
    line(width/2, 0, width/2, height);
    
    // Centre circle.
    ellipse(width/2, height/2, 70,70);
    
    DisplayScore();
    
}

function MovePlayerPaddle(){
    
    // Movement added.
    p1X += p1MovX;
    p1Y += p1MovY;
    
    // Dampening.
    p1MovX *= 0.98;
    p1MovY *= 0.98;
    
    // Deaden paddle movement if reeeeallly slow.
    // This should help with smoothness and performance.
    if (Math.abs(p1MovX) < 0.1) p1MovX = 0;
    if (Math.abs(p1MovY) < 0.1) p1MovY = 0;
    
    // Keep paddle within court boundary.
    p1X = constrain(p1X, 40 - pSizeX, (width/2) - pSizeX);
    p1Y = constrain(p1Y, 20+ pSizeY /2, (height-20) - pSizeY/2);
}

function MoveAiPaddle(){
    
    // Movement added.
    p2X += p2MovX;
    p2Y += p2MovY;
    
    // Dampening.
    p2MovX *= 0.98;
    p2MovY *= 0.98;
    
    // Deaden paddle movement if reeeeallly slow.
    // This should help with smoothness and performance.
    if (Math.abs(p2MovX) < 0.1) p2MovX = 0;
    if (Math.abs(p2MovY) < 0.1) p2MovY = 0;
    
    // Keep paddle within court boundary.
    p2X = constrain(p2X,  width/2 + pSizeX, width - 40 - pSizeX);
    p2Y = constrain(p2Y, 20+ pSizeY /2, (height-20) - pSizeY/2);
}

function SetPlayerPaddleDest(_hX, _hY){
    
    // The idea here is to work out a vector direction for the player's paddle to
    // move itself to. That is, every time the screen is tapped/clicked, then the
    // paddle will receive an increase of X & Y according to that heading.
    
    let hV = createVector(_hX, _hY);    // Destination vector.
    let pV = createVector(p1X, p1Y);    // Player's paddle vector.
    
    let newV = p5.Vector.sub(hV, pV);
    newV = newV.normalize();
    
    p1MovX += newV.x * 5;
    p1MovY += newV.y * 5;
     
}

// False means that we are using my hacky AI :)
// True means that we want to use Reynolds steering AI!
var rey = true;

function ReynoldsAI(){
    
    var _hX;
    var _hY;
    
    // newVector = targetVector - currentVector;
    
    var newVector = createVector();
    var targetVector = createVector(puckX+pMovX*5, puckY+pMovY*5);
    var currentVector = createVector(p2MovX, p2MovY);
    
    newVector = p5.Vector.sub(targetVector, currentVector);
    
    _hX = newVector.x;
    _hY = newVector.y; 
    
    SetAIPaddleDest(_hX, _hY);
    
}

function Ai(){
    // The basic idea will be for the ai to pick a location on their half of the court.
    // at a set interval, mirroring player taps.
   
    if (millis() - aiTimeStamp < aiTime * 600) return;
    aiTimeStamp = millis(); // New time stamp.
    
    if (rey === true){ ReynoldsAI(); return;}
    
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    // Decide where new heading is.
    // This is the core of the ai!
    
    // Heading co-ordiates (Cartesian), which can then be
    // used to create a vector.
    var _hX;
    var _hY;
    
    // If puck is in player's half, and moving away from ai...
    // Randomize heading! -- legacy
    // Follow puck, and head to mid-half -- new!
    if (puckX < width/2 && pMovX < 0){
    //_hX = random(width/2, width);
    //_hY = random(0, height);
      _hX = width-width/4;
      _hY = puckY;
    } 
    else
        {
            // Behind puck...
            // Shoot!
            if (p2X > puckX) { _hY = puckY; _hX = width/2;}
            // In front of puck and higher...
            // Run back to baseline, and top of court.
          // NEW -- IGNORE COMMENTS HERE.
            if (p2X < puckX && p2Y < puckY) 
            { _hY = puckY; _hX = width; }
            // In front of puck and lower...
            // Run back to baseline, and bottom of court.
            if (p2X < puckX && p2Y > puckY) 
            { _hY =puckY; _hX = width; }
        }
        
    
    //%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    
    SetAIPaddleDest(_hX, _hY);

}


function SetAIPaddleDest(_hX, _hY){
    let hV = createVector(_hX, _hY);    // Destination vector.
    let pV = createVector(p2X, p2Y);    // Ai's paddle vector.
    
    let newV = p5.Vector.sub(hV, pV);
    newV = newV.normalize();
    
    p2MovX += newV.x * 5;
    p2MovY += newV.y * 5;
}

function MovePuck(){
    // The basic movement.
    puckX += pMovX;
    puckY += pMovY;
    
    // Dampening.
    pMovX *= 0.99;
    pMovY *= 0.99;
   
    // Collision detection.
    // First, create some temporary variables refering to edges of puck for convenience.
    var pL = puckX - puckSize/2;
    var pR = puckX + puckSize/2;
    var pU = puckY - puckSize/2;
    var pB = puckY + puckSize/2;
    
    // Player 1 paddle collisions.
    if (    pL < p1X + pSizeX && pR > p1X - pSizeX &&
            pU < p1Y + pSizeY &&
            pB > p1Y - pSizeY){
      
      makeExplosion(p1X, p1Y, 1);
      
        if (Math.abs(pMovX) > 0.2 || Math.abs(pMovY) > 0.2) // Ordinary collision response if paddle moving at fair speed.
        {pMovX = Math.abs(p1MovX)*2;
        pMovY = p1MovY*2;}
        else if (p1X < puckX) pMovX = 5;    // Else, always add speed of 5.
        else if (p1X >= puckX) pMovX  -5;
    }
    
    // Player 2 paddle collisions.
    if (    pL < p2X + pSizeX && pR > p2X - pSizeX &&
            pU < p2Y + pSizeY &&
            pB > p2Y - pSizeY){
        if (Math.abs(pMovX) > 0.1 || Math.abs(pMovY) > 0.1) // Ordinary collision response if paddle moving at fair speed.
        {pMovX = Math.abs(p2MovX)*-2;
        pMovY = p2MovY*2;}
        else if (p2X < puckX) pMovX = 5;    // Else, always add speed of 5.
        else if (p2X >= puckX) pMovX  -5;
    }
    
    // Check goal...
    if (pL <= 0) { p2Score++; puckEmoji = NewEmoji(); pMovX = 0;  puckX = width/2; puckY = height/2; }
    if (pR >= width) { p1Score++; puckEmoji = NewEmoji(); pMovX = 0; puckX = width/2; puckY = height/2; }
    
    // Check court barriers.
    //if (pL < 0 || pR > width)  {  }
    if (pU < 2) { pMovY = 5;  }
    if (pB > height - 2) { pMovY = -5; }
    puckY = constrain(puckY, 2, height - 2);
    puckX = constrain(puckX, 2, width - 2);
    
}

function SetStartPositions(){
    
    // Player 1 and 2 positions and size.
    p1Y = height/2;
    p2Y = height/2;
    
    p1X = 54;
    p2X = width-54;
    
    p1MovX = 0;
    p1MovY = 0;
   
    
    pSizeX = 10;
    pSizeY = 30;
    
    // Puck position, size, and movement.
    puckX = width/2;
    puckY = height/2;
    
    puckSize = 100;
    
    pMovX = random(-2,2) * 2.5;
    pMovY = random(-25, 25);
    
    // Ai setup.
    p2MovX = 0;
    p2MovY = 0;
    
    aiHeading = createVector(0,0);
    aiTime = 1; // Ai does something every one seconds (default).
    aiTimeStamp = millis(); // Incipient time stamp.
    
    // Emojis...
    puckEmoji = NewEmoji();
    p1Emoji = NewEmoji();
    p2Emoji = NewEmoji();
    
    // Setup new game.
    p1Score = 0;
    p2Score = 0;
    
}

function NewEmoji(){
    // return String.fromCodePoint(
    // '0x1F' + round(random(1536, 1616)).toString(16));
  
  return String.fromCodePoint(0x1F600 + round(random(0,42)));
 
}

function DrawPadle(_x, _y){
  
//    stroke(0);
//    strokeWeight(3);
//  
//    if (_x < width/2)
//    fill(255,0,255, 255);
//  else fill(255, 255);
//    
//    rect(_x, _y, pSizeX, pSizeY);
    
    paddleEmoji(_x, _y);
}

function DrawPuck(_x, _y){
    stroke(0);
    strokeWeight(5);
    fill(0,0,12*(Math.abs(pMovX)+Math.abs(pMovY)), 101);

    ellipse(_x, _y, puckSize, puckSize);
    
    strokeWeight(1);
    stroke(255);
    fill(255);
    //pop();
    textSize(puckSize/1.3);
    text(puckEmoji, puckX-puckSize/2.5, puckY+puckSize/3);
}

function paddleEmoji(_x, _y){
    strokeWeight(1);
    stroke(255);
    fill(255);
    
    //pop();
    textSize(32);
    if (_x < width/2)
    text(p1Emoji, _x, _y);
    else text(p2Emoji, _x, _y);
}

function DisplayScore(){
    stroke(0);
    strokeWeight(3);
    fill(0);
    textSize(32);
    text(p1Score + " : " + p2Score, (width/2)-32, (height/2)+10);
}



// Should we add splashes?


// Array of splashes/explosions.

var splashes = [];

// Number of particles will be
// *twice* this number.
const particleNumber = 3;

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
    fill(colF,0,colF,100);
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

