
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
    
    /*
    // The collision events function.
    // Collision *events* may need to use the
    // *indexID* of the body in order to 
    // reference the wrapper object's variables.
    // [This is not yet implemented!!!]
    function collision(event){
        // Ref to all pairs of bodies colliding.
        var pairs = event.pairs;
        // Iterate over the pairs to
        // find the condition you're
        // looking for.
        for (var i = 0; i < pairs.length; i++){
            // The event's pairs will have a 
            // bodyA and bodyB object that
            // we can grab here...
            var bodA = pairs[i].bodyA;
            var bodB = pairs[i].bodyB;
            // E.g.
             if (Math.abs(bodA.velocity.x *             bodA.velocity.y) > 4){
                Matter.Body.setStatic(bodB, true);
             }
        }   // End of forLoop.
    }       // End of collision events function. 
    // Turn on collision events.
    // The third parameter 'collision' is a 
    // call back to the function above.
    Matter.Events.on(myEngine, 'collisionStart', collision);
    */
    
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



// Particle Object.
// A wrapper object.
// x pos, y pos, radius x, radius y, type, array of vertices (vectors).
function Pa2D(_x,_y,_r,_rH,_op,_vx){
    
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
    else if (_op===5)
        var options = {
        isStatic: true,
        restitution: 0.8,
        friction: 0.04
    }
   
    this.type = _op;
    this.pos = createVector(_x, _y);
    this.radX = _r;
    this.radY = _rH;
    
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
    
    // Create a 2D Physics Body, a 'vertex body shape'.
    if (_op===5){
        // mV is an array of vertices.
        // _vx is the number or 'resolution' of
        // vertices.
        this.vRes = _vx;
        this.mV = this.generateVertices(_vx);
        // HACK ALERT!
        this.width = _r * 1.44;
        this.height = _rH * 2.06;
        this.bod = 
        Matter.Bodies.fromVertices(_x,_y,this.mV, options);
    }
        
    // Add the body to the Physics World.
    Matter.World.add(myWorld, this.bod);

}


Pa2D.prototype.generateVertices = function(){
    var vBSpos = createVector(0,0);
    var vBSw = this.radX;
    var vBSh = this.radY;
    var vBSres = this.vRes;
    
    var myVertices = [];
    for (let i = 0; i < vBSres; i++){
        let py = 0;
        let px = 0;
       if (i < vBSres/2){ 
           px = (vBSpos.x + (vBSw/2)) - (i*(vBSw/(vBSres/2)));
            py = vBSpos.y + (vBSh/2);
        }
        else {
            py = vBSpos.y - (vBSh/2);
            px = (vBSpos.x - (vBSw/2)) + ((i-vBSres/2)*(vBSw/(vBSres/2)));
        }
        px += Math.random()*20;
        py += Math.random()*20;
        let blo = createVector(px,py);
        myVertices.push(blo);
    }
    return myVertices;
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
    _deg *= 0.001/(this.bod.mass/80);
    Matter.Body.rotate(this.bod, _deg);
}

// Sets a new position (without affecting velocity etc.).
Pa2D.prototype.makePosition = function(_x, _y){
    let newPos = createVector(_x, _y);
    Matter.Body.setPosition(this.bod, newPos);
}

// Add rotation force. Just an ordinary applyForce, but
// off centre, so as to spin body.
// Turn is either -1 or +1, for left and right.
Pa2D.prototype.makeSteer = function(_turn){
    // We find the extremest left or right point from
    // the body's centre, using ob's radius.
    
    // Find forward vector of body...
//    let turnVec = createVector(0,0);
//    turnVec.x = Math.sin(radians(this.bod.angle+(_turn*3)));
//    turnVec.y = -Math.cos(radians(this.bod.angle+(_turn*3)));
//    turnVec.mult(0.001);
    let tF = (_turn) * (this.bod.mass * this.bod.mass * 10);
    this.bod.torque += tF;
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
        strokeWeight(2);
        fill(200,100,42);
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
            this.dia,
            this.dia);
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
    
    if (this.type===5){
        push();
        translate(0, 0);
        rotate(this.bod.angle);
        
        stroke(255);
        strokeWeight(4);
        fill(200,100,42);
        
        beginShape();
        for (let i = 0; i < this.mV.length; i++){
            vertex(this.bod.position.x+this.mV[i].x, this.bod.position.y+this.mV[i].y);  
        }
        
        endShape(CLOSE);
        
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




