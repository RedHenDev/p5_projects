
//*********&&&&&&&&&&&&****************&&&&&&&&&&&&****************

// New particle class for use with matter.js 
// B New 2017.
//
// Use this file as template for matter.js implementation -- i.e. use of a wrapper class for dealing with matter's bodies etc.


function Pa2D(x,y,r,op){
    
    // Options for matter.js physics body.
    if (op)
    var options = {
        isStatic: true,
        restitution: 1,
        friction: 0.3
    }
    else
        var options = {
        isStatic: false,
        restitution: 0.2,
        friction: 0.3
    }
    
    // Create a 2D Physics Body, a circle.
    this.bod = Matter.Bodies.circle(x,y,r,options);
    // Add the body to the Physics World.
    Matter.World.add(myWorld, this.bod);

}

Pa2D.prototype.remove = function(){
  Matter.World.remove(myWorld, this.bod);
}

Pa2D.prototype.checkOffScreen = function(_p){
  return (this.bod.position.y > height + _p ||
         this.bod.position.x < 0 - _p ||
         this.bod.position.x > width + _p);
}

Pa2D.prototype.render = function(){
    
    var theColour;
    theColour = this.bod.speed * 50;
    if (this.bod.speed < 0.1) theColour = 255;
   
    constrain(theColour, 0, 255);
    
    stroke(0);
    strokeWeight(1);
    fill(0, 0,theColour, 101);
    ellipse(this.bod.position.x,
            this.bod.position.y,
            this.bod.circleRadius*2,
            this.bod.circleRadius*2);
  
  var iX = this.bod.position.x;
  var iY = this.bod.position.y;
  var iS = this.bod.circleRadius*2;
  
  // textSize(iS);
  // text(String.fromCodePoint('0x1F' + 422).toString(16),iX-iS/2,iY+iS/2);
  
  // text(String.fromCodePoint(
  // '0x1F' + round(random(1536, 1616)).toString(16)),iX-iS/2,
  //           iY+iS/2);
  
            
}

function Ledge(x,y,w,h){
    
    // Create a 2D Physics Body, a rectangle.
    this.bod = Matter.Bodies.rectangle(x,y,w,h,{isStatic: true, restitution: 1});
    // Add the body to the Physics World.
    Matter.World.add(myWorld, this.bod);
    
    this.width = w;
    this.height = h;
    
} 

Ledge.prototype.remove = function(){
  Matter.World.remove(myWorld, this.bod);
}

Ledge.prototype.render = function(){
    
    stroke(0);
    strokeWeight(4);
    fill(0,0,100,100);
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
var orX;
var orY;
var rX;
var rY;
var rTheta;
var rRad;
var rSpeed;

var voxa;

function setup() {
    
    createCanvas(window.innerWidth,window.innerHeight);
    background(72);
    
  voxa = new p5.Oscillator();
  voxa.setType('square');
  voxa.amp(0.01);
  voxa.freq(440);
  voxa.start();
  
    myEngine = Matter.Engine.create();
    myWorld = myEngine.world;
    
//    p = new Particle(200,200,50);
    
    for (var i = 0; i < 9; i++){
       //var e = Math.round(random()) % 2 === 0;
        var e = false; // set to non-static.
        pA.push(new Pa2D(random(0,width),random(0,height/2),random(1,42),e)); 
    }
    
    // p = new Ledge(width/2, height, width-12, 100);
    // leftW = new Ledge(0+12, height/2, 20, height);
    // rightW = new Ledge(width-21, height/2, 20, height);

    //SetupRotor();
    
   // p = new Pa2D(width/2,height+100,width/2,true);
    
    // Start the engine!
    Matter.Engine.run(myEngine);
    
}

function ChangeFreq(_osc, _freq){
  _osc.freq(_freq);
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
   
     pA.push(new Pa2D(mX,mY,random(1,mS),false));
    // else{
    //         Matter.World.remove(myWorld, pA[0].bod);
    //         pA.splice(0,1);
    //         pA.push(new Pa2D(mX,mY,random(1,mS),false))
    //     } 
}

function mouseDragged(){
    
    PlaceBubl(mouseX,mouseY,24);
    
}
   


function draw() {
    background(72);
    
   // Matter.Engine.update(myEngine);
      
    // Set frequency of tone relative to height of pA[0].
  
    if (pA.length > 0){
    ChangeFreq(voxa, pA[0].bod.position.y*2); voxa.amp(0.01,0.5);}
  else { voxa.freq(220); voxa.amp(0,0.5);}
  
    for (var i = 0; i < pA.length; i++){
      pA[i].render();
      
      if (pA[i].checkOffScreen(40)){
        pA[i].remove();
      pA.splice(i,1);
        i--;}
      
    }
  
  text(pA.length, 20,20);
    
//     p.render();
//     leftW.render();
//     rightW.render();
    
//   fill(0,120,255,100);
//   rect(20,height/2,width-48,height/2);
  
  //  SpinRotor();
    
}

//*&*&*&*&*&*&*&
//&*&*&*&*&*&*&*
//*&*&*&&&*&*&*&



