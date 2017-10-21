// Generic object that will take a ghost shape
// from my matter.js wrapper, but will crucially
// have its own rederer.

// Perhaps a member constant should be type of
// matter.js body to take on -- held as a string
// for transparency of code.

// But the key thing will be the renderer method.
// Looking forward, perhaps also a means of connecting
// kinematic 'satellite' bodies. Ai brain too?


// _shape: "GhostCircle", "GhostRectangle", "GhostBox".
class GhostO {
    constructor(_x, _y, _width, _height, _shape){
        // Now, get a matter.js body.
        RedHen_2DPhysics.newObj
        (_shape, _x, _y, _width, _height);
        // Grab a handle on the matter.js body.
        this.myBod = 
        RedHen_2DPhysics.lastObjectCreated();
        
        this.width = _width*4;
        this.height = _height;
    }
    
    render(){
    }
    
    think(){   
    }
    
}

class SpaceBuddha extends GhostO{
    constructor(_x, _y, _radius){
        super(_x, _y, _radius, _radius, "GhostCircle")
    }
    
    render(){
        push();
        fill(255,100);
        stroke(0,100,100,100);
        strokeWeight(2);
        translate(this.myBod.bod.position.x,
                 this.myBod.bod.position.y);
        ellipse(0,0,this.width);
        
        //Light spot.
        fill(255,240);
        noStroke();
        ellipse(-this.width/5, -this.width/4, this.width/8);
        pop();
    }
    
    control(){
        let yF = 0.08;
        let xF = 0.03;
        if (keyIsDown(UP_ARROW)){
            let force = createVector(0,-yF);
            this.myBod.addForce(force);
        }
         if (keyIsDown(DOWN_ARROW)){
            let force = createVector(0,yF);
            this.myBod.addForce(force);
        }
         if (keyIsDown(LEFT_ARROW)){
            let force = createVector(-xF,0);
            this.myBod.addForce(force);
        }
         if (keyIsDown(RIGHT_ARROW)){
            let force = createVector(xF,0);
            this.myBod.addForce(force);
        }
    }
}
