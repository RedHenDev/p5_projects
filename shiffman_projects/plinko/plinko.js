
//*********&&&&&&&&&&&&****************&&&&&&&&&&&&****************

// New particle class for use with matter.js 
// B New 2017.

function Pa2D(x,y,r,op){
    // Will be set to millis() when ball has done plinko run. When a number of seconds has elapsed thereafter, ball will be set to static.
    this.done = 0;
  
    // Options for matter.js physics body.
    if (op)
    var options = {
        isStatic: true,
        restitution: random(0.8,1),
        friction: 0
    };
    else
        var options = {
        isStatic: false,
        restitution: random(0.8,1),
        friction: 0,
          density: 0.001
    };
  
  
    
    // To better represent 50/50 chance of plinko balls going either right or left upon hitting first pin, when that pin is placed at width/2. Else, plinko balls will always fall to the left.    
    var xCorrect = random(-0.17,0.14);
        
    // Create a 2D Physics Body, a circle.
    this.bod = Matter.Bodies.circle(x+xCorrect,y,r,options);
    // Add the body to the Physics World.
    Matter.World.add(myWorld, this.bod);
    if (op===true) 
    this.bod.label = "peg";

}

// Pa2D.prototype.checkLanded = function(){
//    if (this.bod.position.y > height-100) 
//      this.bod.isStatic = true;
// }

Pa2D.prototype.render = function(){
    
     var theColour;
     theColour = this.bod.speed * 50;
     if (this.bod.speed < 0.1) theColour = 255;
   
     constrain(theColour, 0, 255);
    var theColour = 255;
  
  
    stroke(255);
    strokeWeight(1);
  
    fill(theColour, 0, theColour, 200);
    
  if (this.bod.isStatic) {fill(255,51);
                            stroke(0);}
  
  if (this.done !==0) {fill(255);}
  
    ellipse(this.bod.position.x,
            this.bod.position.y,
            this.bod.circleRadius*2,
            this.bod.circleRadius*2);
    
    if (this.bod.isStatic !== true)
    image(myImg, this.bod.position.x-this.bod.circleRadius*2,
            this.bod.position.y-this.bod.circleRadius*2,
            this.bod.circleRadius*4,
            this.bod.circleRadius*4);
  
  var iX = this.bod.position.x;
  var iY = this.bod.position.y;
  var iS = this.bod.circleRadius*2;
            
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
    strokeWeight(1);
    fill(0,0,0);
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

var myImg;

function preload(){
    myImg = loadImage("RedHenIcon Alpha 512 512.png");
}

function setup() {
    
    createCanvas(800,600);
    background(72);
    
    
    myEngine = Matter.Engine.create();
    myWorld = myEngine.world;  
    
  // Collision events****************************************************
//  function collision(event){
// 
//    var pairs = event.pairs;
//    for (var i = 0; i < pairs.length; i++){
//      var bodA = pairs[i].bodyA;
//      var bodB = pairs[i].bodyB;
//        console.log(bodA.label);
//        if (bodA.label === "peg") pairs[i].bodyA.isStatic = false;
//       // if (bodB.label === "peg") pairs[i].bodyB.isStatic = false;
//    }
//  }
    
   // Matter.Events.on(myEngine, 'collisionStart', collision);
    
      // Collision events****************************************************
  
  
    
    
//    p = new Particle(200,200,50);
    
    // for (var i = 0; i < 9; i++){
    //    //var e = Math.round(random()) % 2 === 0;
    //     var e = false; // set to non-static.
    //     pA.push(new Pa2D(random(0,width),random(0,height/2),random(1,42),e)); 
    // }
    
    p = new Ledge(width/2, height, width, 10);
    leftW = new Ledge(0, height/2, 10, height);
    rightW = new Ledge(width, height/2, 10, height);

    //SetupRotor();
    
    SetupPegs();
    SetupBuckets();  
  
    // Start the engine!
    //Matter.Engine.run(myEngine);
    
}



function ResetPlinko(){
  
}

function SetupPegs(){
  
  var rowNum = 10;
  var colNum = 14;
  
  for (var row = 1; row <= rowNum; row++){
    
    for (var col = 1; col <= colNum; col++){
      var offSet = 0;
      if (row % 2 === 0) offSet = width/colNum*0.5;
      if (row > rowNum-3) break;
      if (offSet === 0 || col < colNum-1)
      PlaceBubl(width/colNum*col + offSet,
               height/rowNum*row,
               14,true);
    }
    
  }
  
}

function SetupBuckets(){
  var bucketNum = 24;
  
  for (var i = 1; i <= bucketNum; i++){
    pA.push(new Ledge(width/bucketNum*i,height-40,
                     2,80));
  }
  
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

function PlaceBubl(mX,mY,mS,sS){
   
  pA.push(new Pa2D(mX,mY,mS,sS));
  
    // if (pA.length < 222)  pA.push(new Pa2D(mX,mY,mS,false));
    // else{
    //         Matter.World.remove(myWorld, pA[0].bod);
    //         pA.splice(0,1);
    //         pA.push(new Pa2D(mX,mY,mS,false))
    //     } 
}

function mouseDragged(){
    
    //PlaceBubl(mouseX,mouseY,24);
    
}
   


function draw() {
    background(72);
  //console.log(frameRate());  
  Matter.Engine.update(myEngine, 15);
  
   // Matter.Engine.update(myEngine);
  if (frameCount % 20 === 0) PlaceBubl(width/2,-10,7,false);  
  
  
    for (var i = 0; i < pA.length; i++){
        pA[i].render();
      // Check to see if ball finished run.
      // If so, turn to static after a certain duration.
      if (pA[i].bod.position.y > height-100 &&
          pA[i].done !== 0){
         if (millis() - pA[i].done > 7000)
           pA[i].bod.isStatic = true;}
         else if (pA[i].bod.position.y > height-100) pA[i].done = millis();
       
        
        //pA[i].checkLanded();
    }
    
    p.render();
    leftW.render();
    rightW.render();
    
  //fill(0,120,255,100);
 // rect(20,height/2,width-48,height/2);
  
    //SpinRotor();
    
}

//*&*&*&*&*&*&*&
//&*&*&*&*&*&*&*
//*&*&*&&&*&*&*&



