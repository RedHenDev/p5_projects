
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
//var canvasMouse;



// Static class for setting up physics and setting gravity etc.
class RedHen_2DPhysics { 
    
    
    
    // Main program calls this to begin using this wrapper class.
    // Sets up mouse contraint by default.
    static setupMatter(){
        
        // Instantiate a matter.js world and begin physics.
        myEngine = Matter.Engine.create();
        myWorld = myEngine.world;  
    
        // Start the engine!
        Matter.Engine.run(myEngine);
        
        this.setupMouseConstraint();
        
        // Make sure we are drawing rectangles from their centres.
        rectMode(CENTER);
    
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
        
        this.pos = createVector(_x,_y);
        
        
        
        // Some in-built polymorphism.
        // this.pos.x = _x;
        //else            this.pos.x = width/2;
       // this.pos.y = _y;
       // else            this.pos.y = height/2;
       // 
         this.rad = _rad;
       // else                this.rad = 9;
        
        // We calculate now for efficiency when rendering.
        this.dia = this.rad * 2;
        
        
        
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
        
        this.visible = true;
        
        this.fill = color(Math.random()*255,
                          Math.random()*255,
                          Math.random()*255);
        this.alpha          = 255;
        this.stroke         = 255;
        this.strokeWeight   = 2;
        
        
        
        // Instantiate a 2D Physics Body, a circle.
        // Set default poperties of matter.js object.
        var options = {
            isStatic: false,
            restitution: 0.7,
            friction: 0.04
        }
        this.bod = Matter.Bodies.rectangle(this.pos.x,this.pos.y,this.rad,this.rad,options); 
        
        // Add the body to the Physics World.
        Matter.World.add(myWorld, this.bod);
        
    }
    
    render(){
    
        fill(this.fill);
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





