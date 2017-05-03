
var segs = [];

var t1;

var tentacles = [];

var cent;

var kaa = [];

var tStamp = 0;
var scatter = false;


function setup(){
   createCanvas(window.innerWidth, window.innerHeight);
  //createCanvas(512,512);
  background(255,101,170);

  cent = createVector(-width,-height);
  // Parameters: root origin x,y. Length of root. Rotation of root. Number of segments.
  var tNum = 22;
  for (j = 0; j < tNum; j++){
    tentacles.push(new Tentacle((width/tNum)*j+1, height, 12, -90,random(2,84)));
  }
  
  // Create instances of iSnakes (inversely kinematic 'snakes').
  for (var s = 0; s < 29; s++){
    kaa.push(new iSnake(random(0,width),random(0,height),2, 1, 0, 3,random(2,9)));
    // Let's turn on each iSnake's wiggling...
    kaa[s].wiggling = true;
    
  }
  
  tStamp = millis();
  
}

var r = 0;  // Guides rotation of the group.
function draw(){
   
 
  
  //background(0,75,222, 101);
  background(0,0,200,84);
 
  // translate(width/2,height/2);
  // rotate(r+=0.01);
  
  r += 0.1; // For rotation of WP...
  
  for (var k = 0; k < kaa.length; k++){
    
    // Time to change heading?
    if (millis() - kaa[k].tStamp > kaa[k].NHdelta * 1000){
   
      kaa[k].WP.x = Math.random() * width;
      kaa[k].WP.y = Math.random() * height;
      
      kaa[k].tStamp = millis();
      
    }
    
    // Circle dance...
    kaa[k].WP.x = kaa[k].WP.x + 12 * Math.cos(r+k);
    kaa[k].WP.y = kaa[k].WP.y + 12 * Math.sin(r+k);

    // Render behaviour...
    kaa[k].slither(kaa[k].WP.x, kaa[k].WP.y);
  
  }
  
  for (var j = 0; j < tentacles.length; j++){
    tentacles[j].render(true,true);
  }
  
}

function mouseMoved(){
  
  for (var i = 0; i < kaa.length; i++){
  
    kaa[i].WP.x = mouseX;
    kaa[i].WP.y = mouseY;
  }
  
}


//(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)
//(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)(*)

// Kinematic segment class.
function Segment(_x, _y, _len, _theta, _phase, _parent){
  
  this.parent = _parent;
  
  this.length = _len;
  this.angle = _theta;
  this.selfAng = this.angle;
  
  this.xoff = 0;
  this.phase = _phase;
  
  if (_parent === null)
  this.orig = createVector(_x, _y);
  else this.orig = createVector(_parent.dest.x, _parent.dest.y);
  
  this.dest = createVector(0,0);
  this.calcPC();
  
}

// Calculate polar co-ordinates. 
Segment.prototype.calcPC = function(){
  
  this.angle = this.selfAng;
  
  // First, unless parent is null, make sure my origin identifies with my parent's destination.
  if (this.parent !== null){
    this.orig = this.parent.dest;
    // Now, also pass parent's angle.
    this.angle += this.parent.angle;
  } 
 // else { this.orig.x = mouseX;
         //   this.orig.y = mouseY;}
  
  this.dest.x = this.orig.x + this.length * Math.cos(this.angle);
    this.dest.y = this.orig.y + this.length * Math.sin(this.angle); 
}

Segment.prototype.wiggle = function(){

  // This function changes the selfAng.
  //this.xoff += 0.01;
  
  //var newAng = map(noise(this.phase), 0,1, -0.4,0.4675);
  var newAng = map(Math.sin(this.phase), -1,1, -0.09, 0.09);
  this.selfAng += radians(newAng);

  this.phase -= 0.04;
  
}

Segment.prototype.render = function(){
  
  // Draw segment line.
 
  //var nV = p5.Vector.sub(this.dest, cent);
  
  strokeWeight(0.02* this.orig.y);
  stroke(0,200,0,42);
  //line (this.orig.x, this.orig.y, this.dest.x, this.dest.y);
  
  //Draw joint circle.
  //noFill();
  //strokeWeight(200-nV.mag()*0.9);
  //stroke(255,25);
//   noStroke();
  fill(255,101,170,12);
//   fill(0,0,255,172);
   ellipse(this.dest.x, this.dest.y, 2*this.length,2*this.length);
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Inverse kinematic class.
function iSegment(_x, _y, _len, _theta, _phase, _speed, _index, _sN){
  
  //this.parent = _parent;
  this.id = _index;
  this.sN = _sN;  // Total number of segments.
  this.speed = _speed;
  
  this.length = _len;
  this.angle = _theta;
  this.hV = createVector(); // Heading vector (see pursue()).
  this.selfAng = this.angle;
  
  this.xoff = 0;
  this.phase = _phase;
  
  this.orig = createVector(_x, _y);
  
  this.dest = createVector(0,0);
  this.calcPC();
  
}

iSegment.prototype.pursue = function(_tx, _ty){
   // Rotate from current rotation to face target vector.
  
  // First, then, I need a heading.
  this.hV.x = _tx;
  this.hV.y = _ty;
  this.hV = p5.Vector.sub(this.hV, this.orig);
  this.selfAng = this.hV.heading();
  this.selfAng *= 0.0001;
  
  if (this.hV.mag() > this.length){
    this.hV = this.hV.normalize();
    this.hV.mult(this.speed);
    this.orig.add(this.hV);
}
  
}

// Calculate polar co-ordinates. 
iSegment.prototype.calcPC = function(){
  
   this.angle = this.selfAng;
  
    // Now, also pass parent's angle.
 
  this.dest.x = this.orig.x + this.length * Math.cos(this.angle);
    this.dest.y = this.orig.y + this.length * Math.sin(this.angle); 
}
var newAng;
iSegment.prototype.wiggle = function(){

  // This function changes the selfAng.
  //this.xoff += 0.01;
  
  //var newAng = map(noise(this.phase), 0,1, -0.4,0.4675);
  newAng = map(Math.sin(this.phase), -1,1, 0, 62);
  this.selfAng += radians(newAng);

  this.phase += 0.3;
  
}
 var pC;
iSegment.prototype.render = function(){
  
  // Calculate percentage number of iSegment. E.g. head iSegment = 1%, and last iSegment is 100%.
  
      pC = this.id + 1;
      pC = map(this.id, 1, this.sN, 100, 30);
  
  // Draw iSegment line.
  //strokeWeight(0.2 * pC);
  // stroke(255,0,200,77);
  // stroke(255,101);
  //line (this.orig.x, this.orig.y, this.dest.x, this.dest.y);
  //noStroke();
  strokeWeight(pC*0.072);
  stroke(255,47);
    fill(0,255,255,177);
   ellipse(this.dest.x, this.dest.y, 0.062 * pC,0.062 * pC);
 
  //iHead...
  // if (this.id === 0){
  //   //noStroke();
  //   strokeWeight(2);
  //   stroke(0);
  //   fill(255,201);
  //   ellipse(this.dest.x, this.dest.y, pC*0.2,pC*0.2);}
  
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// iSnake class.
// This object structures itself from inversely kinematic objects, namely iSegments.

function iSnake(xO, yO, rootL, dimL, rootR, sp, segN){
  // Origin x & y.
  // First isegment (root) length.
  // (Usually diminishing) ratio of next isegment length.
  // Root rotation (-90) = up.
  // Speed of slither.
  // Number of iSegments.
  
  this.orig = createVector(xO, yO);
  
  this.rLen = rootL;
  
  this.dimL = dimL;
  
  this.rRot = rootR;
  
  this.speed = sp;
  
  this.segN = segN;
  
  // Addenda...
  
  // New Heading delta -- after how long (secs) to change heading.
  this.NHdelta = random(3,7);
  // When did we last change heading?
  this.tStamp = 0;
  // WayPoint.
  this.WP = createVector(200,200);
  
  this.wiggling = false;
  
  // Array of segments.
  this.iSegs = [];
  
  // Now we create the iSnake's iSegments.
  for (var i = 0; i < this.segN; i++){
    this.iSegs.push(new iSegment(this.orig.x-(i*this.rLen), this.orig.y+(i*this.rLen), this.rLen * (this.dimL + i), this.rRot, (i+1), this.speed, i, this.segN));
  }
  
}

// This articulates the pursue() behaviour of the iSnake's iSegments.
// This will also render() the iSegments, since will be more efficient to only cycle this loop once.
// _x & _y determine what the head iSegment will pursue().
iSnake.prototype.slither = function(_x, _y){
  
  for (var i = 0; i < this.iSegs.length; i++){
   
    // First, the pursue rotation and slide.
    if (i === 0)  // If head, pursue designated _x, _y.
    this.iSegs[i].pursue(_x, _y);
    else         // Else, pursue previous iSegment origin. 
    this.iSegs[i].pursue(this.iSegs[i-1].orig.x, this.iSegs[i-1].orig.y);
    
    // Pre-second, a little wiggle.
    if (this.wiggling)
    this.iSegs[i].wiggle();
    
    // Second, calculate polar co-ordinate of dest.
    this.iSegs[i].calcPC();
    
    // Third and final, render().
    this.iSegs[i].render();
  }
  
}
// END of iSnake class.
// ()()()()()()()()()()()()()()()()()



//&*&*&*&*&*&*&****&*&*&*&*&*&*&*&*&*&
 
// The tentacle class.
// This object is structured from a number of forwardly kinematic 'Segments'.

function Tentacle(xO, yO, rootL, rootR, segN){
  
  // Root origin.
  this.orig = createVector(xO, yO);
  // Root length.
  this.rLen = rootL;
  // Root rotation. E.g. -90 will be pointing straight up.
  this.rRot = rootR;
  // Array of (forward) kinematic segments.
  this.segs = [];
  // Number of segments.
  this.sNum = segN;
  
  // Create my segments.
  var sLen = this.rLen; // Root length is rLen.
  var _rRot;
  var _phase;
  for (var i = 0; i < this.sNum; i++){
    var nParent;
    _rRot = radians(random(-12,12));
    //_phase = (this.sNum-i*0.123) + 0.123;
    _phase = (i*0.123) + 0.123;
    //_rRot = 0;
    sLen *= 0.95;
    if (i == 0) { nParent = null; _rRot = radians(this.rRot); }
    else nParent = this.segs[i-1];
    // Only first segment will keep tentacle origin's x and y, since parent is null; other segments will be passed previous segment's destination co-ordinates.
    this.segs[i] = new       Segment(this.orig.x,this.orig.y,sLen, _rRot, _phase, nParent);
  }
  
  
  
}

// If update is false, then will only render segments.
// Ditto for wiggle.
Tentacle.prototype.render = function(_update, _wiggle){
  for (var i = 0; i < this.segs.length; i++){
    if (_wiggle) this.segs[i].wiggle();
    if (_update) this.segs[i].calcPC();
    this.segs[i].render();
  }
}




