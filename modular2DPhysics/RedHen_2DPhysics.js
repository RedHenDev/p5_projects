
//*********&&&&&&&&&&&&****************&&&&&&&&&&&&****************

// Modular 'Obj' wrapper classes for use with Liam Brummit's matter.js 

// B 'Red Hen' New 2017.

//*********&&&&&&&&&&&&****************&&&&&&&&&&&&****************


// Global variables, giving reference to engine and world.
// Unlike 'myEngine', 'myWorld' is only an alias.
var myWorld; 
var myEngine;
// Mouse contraint.
var mConstraint;


// Array of RedHen_2DPhysics bodies.
// Handled via this wrapper class.
// However, should build in clear way
// for main .js file to create own arrays
// (as is the necessary case at time of writing).
var bods = [];

// Off Screen Remove.
// See updateBods().
var OSR = true;

// Static class for setting up physics and setting gravity etc.
// Mouse interaction will be ON as default.
class RedHen_2DPhysics { 
    
    // Main program calls this to begin using this wrapper class.
    // Sets up mouse contraint by default.
    static setupMatter(){
        
        // Instantiate a matter.js world and begin physics.
        myEngine = Matter.Engine.create();
        myWorld = myEngine.world;  
    
        // Start the engine!
        Matter.Engine.run(myEngine);
        
        // Mouse constraint on as default.
        // NB have to use this. keyword here
        // to refer to static method of this
        // class?!
        this.setupMouseConstraint();
        
        // We have functionality, but not yet implemented for general use.
        //this.setupCollisions();
        
        // Instantiate a box as default!
        this.newObj
        ("box",width/2,height-9+width/2,width);
        bods[0].makeStatic();
        bods[0].fill = color(255,101);
        
        // Make sure we are drawing rectangles from their centres.
        rectMode(CENTER);
    
    }
    
    static setupCollisions(){
        
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
        for (var i = 0; i < pairs.length;       i++){
            // The event's pairs will have a 
            // bodyA and bodyB object that
            // we can grab here...
            var bodA = pairs[i].bodyA;
            var bodB = pairs[i].bodyB;
            // E.g.
             if (Math.abs(bodA.velocity.x *             bodA.velocity.y) > 4){
                Matter.Body.setStatic(bodB, true);}
            }   // End of forLoop.
        }       // End of collision events function. 
    // Turn on collision events.
    // The third parameter 'collision' is a 
    // call back to the function above.
        Matter.Events.on(myEngine, 'collisionStart', collision);
    
    }
    
    // ON as default. Bodies removed from world and array if having gone off-screen.
    static offscreenRemove(_trueIfOn){
        if (typeof _trueIfOn == Boolean)
             OSR = _trueIfOn;
        else OSR = true;
    }
    
    static removeObj(_index){
        
        // First remove body from matter.js world.
        Matter.World.remove(myWorld, bods[_index].bod);
        
        // Next, remove this object from bods array.
        bods.splice(_index,1); 
    }
    
   
    
    static newObj(_requestedBody, _x, _y, _size, _size2, _other){
        
        // If user enters nonsense, they'll hopefully just get a box. So, not too big a loss :)
        if (_requestedBody == null ||
            typeof _requestedBody != String || _requestedBody === 'Box' ||
           _requestedBody == 'box')
        bods.push(new Box(_x, _y, _size));
    }
    
    // Renders all objects to canvas. This is managed through an array. Main js file, then, does not have to look after this array -- it's all taken care of by the RedHen_2DPhysics class.
    static updateObjs(){
        for (let i = bods.length-1; i >= 0; i--){
            // Render to canvas.
            bods[i].render();
            // Off_Screen_Remove ON?
            // Off screen position?
            if (OSR && (    
                    bods[i].bod.position.x + bods[i].dia < -9 ||
                    bods[i].bod.position.y + bods[i].dia < -9 ||
                    bods[i].bod.position.x - bods[i].dia > width+9 ||
                    bods[i].bod.position.y - bods[i].dia > height+9
                        )
                ){this.removeObj(i);}
        }
    }
    
    static setupMouseConstraint(){
       let canvasMouse = Matter.Mouse.create(canvas.elt);
  
        // For retina screens, ratio will be 2 not 1. P5's 'pixedDensity' will dynamically return correct ratio for us :)
        canvasMouse.pixelRatio = pixelDensity();
  
        let options = {
            mouse: canvasMouse
        }
        
        // Add the mouse contraint to the world.
        mConstraint = Matter.MouseConstraint.create(myEngine, options);
        Matter.World.add(myWorld, mConstraint);
    }
    
    // Draw a circle and constraint line from mouse to selected body.
    static renderMouseConstraint(){
  
        if (mConstraint.body){
        strokeWeight(1);
        fill(0,0,255,101);
        let pos = mConstraint.body.position;
        ellipse(pos.x,pos.y,12,12);
        stroke(0,0,255,101);
        line(pos.x, pos.y, mouseX, mouseY);    
        }
    }
}
    

// The fundamental object. 
// A non-rendered circle, e.g. if you want to render yourself.
// The Obj (and extended objs) will have a .bod matter.js body.
class Obj { 
    
    // Constructor can accept no or null parameters.
    constructor(_x, _y, _rad){
        
        this.pos = createVector(0,0);
        
        // Some in-built polymorphism.
        if (_x != null) this.pos.x = _x;
        else            this.pos.x = width/2;
        if (_y != null) this.pos.y = _y;
        else            this.pos.y = height/2;
       
        if (_rad != null)   this.rad = _rad;
        else                this.rad = 9;
        
        // We calculate now for efficiency when rendering.
        this.dia = this.rad * 2;
        
        
        // Maybe we could set a parameter to control whether this basic contructor makes a body...? Else, extended class will do so...THIS WOULD THEN allow us to use the present class object as the invisible body, which the antBot, for instance, uses.
        
        // Instantiate a 2D Physics Body, a circle.
       // this.bod = Matter.Bodies.circle(this.pos.x,this.pos.y,this.pos.rad,options); 
        
        // Add the body to the Physics World.
       // Matter.World.add(myWorld, this.bod);
    }
    
    // Changes the body's scale.
    makeScale(_scale){
        Matter.Body.scale(this.bod, _scale, _scale);
    }

    // Makes the body static.
    makeStatic(){
        Matter.Body.setStatic(this.bod, true);
    }

    // Sets a new angle, without affecting forces etc.
    makeAngle(_angle){
        Matter.Body.setAngle(this.bod, _angle);
    }

    // Sets a new position (without affecting velocity etc.).
    makePosition(_x, _y){
        let newPos = createVector(_x, _y);
        Matter.Body.setPosition(this.bod, newPos);
    }

    // Applies force from centre of the matter.js body.
    addForce(_vector){
        Matter.Body.applyForce(this.bod, this.bod.position, _vector)
    }

}


class Box extends Obj {
    constructor(_x, _y, _diameter){
        super(_x, _y, 0.5 * _diameter);
        
        // Render() returns immediately if set to false.
        this.visible = true;
        
        // Randomizes colour.
        let boodles = Math.random();
        if (boodles <= 0.19){
        this.fill =                                 color(Math.random()*55+200,
                    Math.random()*55+200,
                    Math.random()*55+200);
                            }
        else if (boodles < 0.0){
        this.fill =                                 color(Math.random()*55+200,
                    0,
                    0);
        }
        else if (boodles < 0.0){
        this.fill =                                 color(0,
                    Math.random()*55+200,
                    0);   
        }
        else {
        this.fill =                                 color(0,
                    0,
                    Math.random()*55+200);   
        }
        this.alpha          = 25;
        this.stroke         = 255;
        this.strokeWeight   = 1;
        
        
        
        // Instantiate a 2D Physics Body, a circle.
        // Set default poperties of matter.js object.
        var options = {
            isStatic: false,
            restitution: 0.89,
            friction: 0.04
        }
        this.bod = Matter.Bodies.rectangle(this.pos.x,this.pos.y,this.dia,this.dia,options); 
        
        // Add the body to the Physics World.
        Matter.World.add(myWorld, this.bod);
        
    }
    
    render(){
    
        if (!this.visible) return;
        
        fill(this.fill, this.alpha);
        stroke(this.stroke);
        strokeWeight(this.strokeWeight);
    
        push();
        //this.pos.x = this.bod.position.x;
        //this.pos.y = this.bod.position.y;
        translate(this.bod.position.x, this.bod.position.y);
        rotate(this.bod.angle);
        
        rect(0,0,this.dia,this.dia);
        
        pop();
    
    }

}


//*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&
//*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&





