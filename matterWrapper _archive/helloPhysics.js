

var pA = [];
var p;

// Global variables, giving reference to engine and world.
// Unlike 'myEngine', 'myWorld' is only an alias.
var myWorld; 
var myEngine;


// Pea farm rotary controller.
var orX = width/2;
var orY = 40;
var rX;
var rY;
var rTheta = 0;
var rRad = 42;
var rSpeed;

function setup() {
    
    createCanvas(window.innerWidth,window.innerHeight);
    background(72);
    
    
    myEngine = Matter.Engine.create();
    myWorld = myEngine.world;  
    
//    p = new Particle(200,200,50);
    
    for (var i = 0; i < 9; i++){
       //var e = Math.round(random()) % 2 === 0;
        var e = false; // set to non-static.
        pA.push(new Pa2D(random(0,width),random(0,height/2),random(1,42),e)); 
    }
    
    p = new Ledge(width/2, height, width-12, 100);
    leftW = new Ledge(0+12, height/2, 20, height);
    rightW = new Ledge(width-11, height/2, 20, height);

    SetupRotor();
    
   // p = new Pa2D(width/2,height+100,width/2,true);
    
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
   
    if (pA.length < 222)  pA.push(new Pa2D(mX,mY,random(1,mS),false));
    else{
            Matter.World.remove(myWorld, pA[0].bod);
            pA.splice(0,1);
            pA.push(new Pa2D(mX,mY,random(1,mS),false))
        } 
}

function mouseDragged(){
    
    PlaceBubl(mouseX,mouseY,24);
    
}
   


function draw() {
    background(72);
    
   // Matter.Engine.update(myEngine);
    
    for (var i = 0; i < pA.length; i++){
        pA[i].render();
    }
    
    p.render();
    leftW.render();
    rightW.render();
    
//   fill(0,120,255,100);
//   rect(20,height/2,width-48,height/2);
  
    SpinRotor();
    
}

//*&*&*&*&*&*&*&
//&*&*&*&*&*&*&*
//*&*&*&&&*&*&*&



