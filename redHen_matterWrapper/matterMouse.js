
//*********&&&&&&&&&&&&****************&&&&&&&&&&&&****************

// New particle class for use with matter.js 
// B New 2017.

// Global variables, giving reference to engine and world.
// Unlike 'myEngine', 'myWorld' is only an alias.
var myWorld; 
var myEngine;
// Mouse contraint.
var mConstraint;

function setupMatter(){
    
    myEngine = Matter.Engine.create();
    myWorld = myEngine.world;  
    
       // Start the engine!
    Matter.Engine.run(myEngine);
}

function setupMouseConstraint(){
    canvasMouse = Matter.Mouse.create(canvas.elt);
  
  // For retina screens, ratio will be 2 not 1. P5's 'pixedDensity' will dynamically return correct ratio for us :) Thanks P5!
  canvasMouse.pixelRatio = pixelDensity();
  
  var options = {
    mouse: canvasMouse
  }
    
     mConstraint = Matter.MouseConstraint.create(myEngine, options);
  Matter.World.add(myWorld, mConstraint);
}

  // Render contraint.
//   if (mConstraint.body){
//     fill(255,101);
//     var pos = mConstraint.body.position;
//     ellipse(pos.x,pos.y,30,30);
//     stroke(255,101);
//     line(pos.x, pos.y, mouseX, mouseY);
//   }



// Particle Object. op: 0=invisible;0=vis_static;2=vis_dynm.
function Pa2D(x,y,r,op){
    
    // Options for matter.js physics body.
    if (op===0)
        var options = {
        isStatic: false,
        restitution: 0.7,
        friction: 0.04
    }
    else if (op===1)
    var options = {
        isStatic: true,
        restitution: 1,
        friction: 0.03
    }
    else if (op===2)
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





