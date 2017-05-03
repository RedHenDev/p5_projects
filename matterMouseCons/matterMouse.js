
//*********&&&&&&&&&&&&****************&&&&&&&&&&&&****************

// New particle class for use with matter.js 
// B New 2017.

function Pa2D(x,y,r,op){
    
    // Options for matter.js physics body.
    if (op)
    var options = {
        isStatic: true,
        restitution: 1,
        friction: 0.03
    }
    else
        var options = {
        isStatic: false,
        restitution: 0.7,
        friction: 0.04
    }
    
    // Create a 2D Physics Body, a circle.
    this.bod = Matter.Bodies.circle(x,y,r,options);
    // Add the body to the Physics World.
    Matter.World.add(myWorld, this.bod);

}

Pa2D.prototype.render = function(){
    
    var theColour;
    theColour = this.bod.speed * 50;
    if (this.bod.speed < 0.1) theColour = 255;
   
    constrain(theColour, 101, 255);
    
    stroke(0);
    strokeWeight(3);
    fill(0,0,theColour,255);
    ellipse(this.bod.position.x,
            this.bod.position.y,
            this.bod.circleRadius*2,
            this.bod.circleRadius*2);
  
  var iX = this.bod.position.x;
  var iY = this.bod.position.y;
  var iS = this.bod.circleRadius*2;
  
//   textSize(iS);
//   text(String.fromCodePoint('0x1F' + 422).toString(16),iX-iS/2,iY+iS/2);
  
//   // text(String.fromCodePoint(
//   // '0x1F' + round(random(1536, 1616)).toString(16)),iX-iS/2,
//   //           iY+iS/2);
  
            
}

function Ledge(x,y,w,h){
    
    // Create a 2D Physics Body, a rectangle.
    this.bod = Matter.Bodies.rectangle(x,y,w,h,{isStatic: true, restitution: 1});
    // Add the body to the Physics World.
    Matter.World.add(myWorld, this.bod);
    
    this.width = w;
    this.height = h;
    
} 

Ledge.prototype.render = function(){
    
    stroke(0);
    strokeWeight(4);
    fill(255);
    rect(this.bod.position.x-this.width/2, 
         this.bod.position.y-this.height/2, 
         this.width, this.height);
    
}





//*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&
//*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&

var pA = [];
var p;

// Global variables, giving reference to engine and world.
// Unlike 'myEngine', 'myWorld' is only an alias.
var myWorld; 
var myEngine;


// Pea farm rotary controller.
var orX = 200;
var orY = 40;
var rX;
var rY;
var rTheta = 0;
var rRad = 42;
var rSpeed;

var mConstraint;

// The larger circle.
var wrecka;
var wVox;

function setup() {
  
    canvas = createCanvas(windowWidth,windowHeight);
    background(255);
    
    
    myEngine = Matter.Engine.create();
    myWorld = myEngine.world;  
    
//    p = new Particle(200,200,50);
    
    for (var i = 0; i < 222; i++){
       //var e = Math.round(random()) % 2 === 0;
        var e = false; // set to non-static.
        pA.push(new Pa2D(random(0,width),random(0,height/2),random(12,24),e)); 
    }
    
    p = new Ledge(width/2, height+50, width-12, 100);
    p2 = new Ledge(width/2, 0-50, width-12, 100);
    leftW = new Ledge(-12, height/2, 20, height);
    rightW = new Ledge(width+12, height/2, 20, height);

   // SetupRotor();
      wrecka = new Pa2D(200,200,80,false); 
   // p = new Pa2D(width/2,height+100,width/2,true);
    wVox = setupOscillator();
   
  canvasMouse = Matter.Mouse.create(canvas.elt);
  
  // For retina screens, ratio will be 2 not 1. P5's 'pixedDensity' will dynamically return correct ratio for us :) Thanks P5!
  canvasMouse.pixelRatio = pixelDensity();
  
  var options = {
    mouse: canvasMouse
  }
    
     mConstraint = Matter.MouseConstraint.create(myEngine, options);
  Matter.World.add(myWorld, mConstraint);
  
  
  
  
    // Start the engine!
    Matter.Engine.run(myEngine);
    
}

function SpinRotor(){
    rX = rRad * Math.sin(radians(rTheta)) + orX;
    rY = rRad * Math.cos(radians(rTheta)) + orY;
    
    orX = (rRad*1.5) * Math.sin(radians(rTheta/4)) + orXX;
    
    rTheta -= rSpeed;
    //if (frameCount % 2 === 0) 
    PlaceBubl(rX,rY,22);
}

function SetupRotor(){
    orX = orXX = width/2;  // Origin.
    orY = 200;       
    rX;             // Position.
    rY;
    rTheta = 0;     // Angle or rotation.
    rRad = 82;      // Radius.
    rSpeed = 20;   // Rotation speed.
}

function PlaceBubl(mX,mY,mS){
   
    // We have a maximum of 222 bodies available.
    if (pA.length < 222)  pA.push(new Pa2D(mX,mY,random(1,mS),false));
    else{
            Matter.World.remove(myWorld, pA[0].bod);
            pA.splice(0,1);
            pA.push(new Pa2D(mX,mY,random(1,mS),false))
        } 
}

function mouseDragged(){
    
    //PlaceBubl(mouseX,mouseY,24);
    
}
   
function doSound(){
    changeFreq(wVox, wrecka.bod.speed*10);
}

function draw() {
    background(200);
    
   // Matter.Engine.update(myEngine);
    // Render bodies.
    wrecka.render();
    for (var i = 0; i < pA.length; i++){
        pA[i].render();
    }
    
    doSound();
    
  // Render ledges (window bound).
    //p.render();
    //leftW.render();
    //rightW.render();
    
//   fill(0,120,255,100);
//   rect(20,height/2,width-48,height/2);
  
    //SpinRotor();
  
  // Render contraint.
//   if (mConstraint.body){
//     fill(255,101);
//     var pos = mConstraint.body.position;
//     ellipse(pos.x,pos.y,30,30);
//     stroke(255,101);
//     line(pos.x, pos.y, mouseX, mouseY);
//   }
    
}

//*&*&*&*&*&*&*&
//&*&*&*&*&*&*&*
//*&*&*&&&*&*&*&



