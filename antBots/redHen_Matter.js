
//*********&&&&&&&&&&&&****************&&&&&&&&&&&&****************

// New particle class for use with matter.js 
// B New 2017.


// The ability to remove matter.js bodies needs to be included.
//Matter.World.remove(myWorld, pA[0].bod);
//            pA.splice(0,1);


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

function setGravity(_x, _y){
    myWorld.gravity = createVector(_x, _y);
}


function setupMouseConstraint(){
    canvasMouse = Matter.Mouse.create(canvas.elt);
  
  // For retina screens, ratio will be 2 not 1. P5's 'pixelDensity' will dynamically return correct ratio for us :) Thanks P5!
  canvasMouse.pixelRatio = pixelDensity();
  
  var options = {
    mouse: canvasMouse
  }
    
  mConstraint = Matter.MouseConstraint.create(myEngine, options);
  Matter.World.add(myWorld, mConstraint);
}

function renderMouseConstraint(){
  
   if (mConstraint.body){
    strokeWeight(1);
     fill(255,101);
     var pos = mConstraint.body.position;
     ellipse(pos.x,pos.y,30,30);
     stroke(255,101);
     line(pos.x, pos.y, mouseX, mouseY);
   }
}



// Particle Object. op: 0=invisible;1=vis_static;2=vis_dynm.
// A wrapper object.
function Pa2D(_x,_y,_r,_rH,_op){
    
    // Options for matter.js physics body.
    if (_op===0)
        var options = {
        isStatic: false,
        restitution: 0.7,
        friction: 0.04
    }
    else if (_op===1)
    var options = {
        isStatic: true,
        restitution: 1,
        friction: 0.03
    }
    else if (_op===2)
        var options = {
        isStatic: false,
        restitution: 0.7,
        friction: 0.04
    }
    else if (_op===3)
        var options = {
        isStatic: false,
        restitution: 0.4,
        friction: 0.04
    }
    else if (_op===4)
        var options = {
        isStatic: true,
        restitution: 0.4,
        friction: 0.04
    }
   
    this.type = _op;
    
    // Create a 2D Physics Body, an (invisible) rectangle.
    if (_op===0)
    this.bod = Matter.Bodies.rectangle(_x,_y,_r,_rH,options);
    
    // Create a 2D Physics Body, a circle.
    if (_op===1 || _op===2){
    this.bod = Matter.Bodies.circle(_x,_y,_r,options);
    this.dia = this.bod.circleRadius * 2;
    }
    
    // Create a 2D Physics Body, a rectangle.
    if (_op===3 || _op===4){
    this.bod = Matter.Bodies.rectangle(_x,_y,_r,_rH,options);
        this.width = _r;
        this.height = _rH;
    }
    
    // Add the body to the Physics World.
    Matter.World.add(myWorld, this.bod);

}



// Makes the body static.
Pa2D.prototype.makeScale = function(_scale){
    Matter.Body.scale(this.bod, _scale, _scale);
}

// Makes the body static.
Pa2D.prototype.makeStatic = function(){
    Matter.Body.setStatic(this.bod, true);
}

// Sets a new angle, without affecting forces etc.
Pa2D.prototype.makeAngle = function(_angle){
    Matter.Body.setAngle(this.bod, _angle);
}

// Rotates body in terms of physics engine (cf. makeAngle())
// relative to current rotation.
Pa2D.prototype.makeRotate = function(_deg){
    Matter.Body.rotate(this.bod, _deg);
}

// Sets a new position (without affecting velocity etc.).
Pa2D.prototype.makePosition = function(_x, _y){
    let newPos = createVector(_x, _y);
    Matter.Body.setPosition(this.bod, newPos);
}

// Applies force from centre of the matter.js body.
Pa2D.prototype.addForce = function(_vector){
    Matter.Body.applyForce(this.bod, this.bod.position, _vector)
}

Pa2D.prototype.render = function(){
    
    if (this.type===0) return; // Rendered elsewhere.
    
    var theColour;
    
    // Static ball.
    if (this.type===1){
        stroke(0);
        strokeWeight(1);
        fill(0,101,0);
        ellipse(this.bod.position.x,
                this.bod.position.y,
                this.dia,
                this.dia);
        return;
    }
    
     // Dynamic ball.
    if (this.type===2){
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
        return;
    }
    
     // Dynamic rectangle.
    if (this.type===3){
        push();
        translate(this.bod.position.x, this.bod.position.y);
        rotate(this.bod.angle);
        rectMode(CENTER);
        //stroke(255);
        //strokeWeight(3);
        noStroke();
        fill(0,190,0);
        rect(0, 0,
            this.width,
            this.height);
        pop();
        return;
    }
    
    // Static rectangle.
    if (this.type===4){
        push();
        translate(this.bod.position.x, this.bod.position.y);
        rotate(this.bod.angle);
        rectMode(CENTER);
        stroke(255);
        strokeWeight(2);
        noStroke();
        fill(0,101);
        rect(0, 0,
            this.width,
            this.height);
        pop();
        return;
    }
            
}
// ******&*&*&*&*&*&*&*&*&&&&&&&&&&&&&&&*&*&*&*&*&*

// 2D boundary.
function Ledge(x,y,w,h){
    
    // Create a 2D Physics Body, a rectangle.
    this.bod = Matter.Bodies.rectangle(x,y,w,h,{isStatic: true, restitution: 1, friction: 0.01});
    // Add the body to the Physics World.
    Matter.World.add(myWorld, this.bod);
    
    this.width = w;
    this.height = h;
    
} 

Ledge.prototype.render = function(){
    
    stroke(0);
    strokeWeight(4);
    fill(255);
    rectMode(CENTER);
    rect(this.bod.position.x, 
         this.bod.position.y, 
         this.width, this.height);
    
}





//*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&
//*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&




