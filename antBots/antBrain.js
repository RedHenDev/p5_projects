
// Global array of antBrains.
var antBrains = [];

// The antBrain object, then, will 
// become a child of the antBot object itself.
class antBrain{

    constructor(_parent){
        this.antBot = _parent;
        this.state = "chase";
        this.wayPoint = createVector(width/2,height/2);
    }

    findHeading(){
        //let headingV = p5.Vector.sub(this.wayPoint, this.antBot.myBod.bod.position);
        
        // Angle of rotation for this vector.
        //headingV = headingV.normalize();
       
        let newH = Math.atan2(this.wayPoint.x - this.antBot.myBod.bod.position.x, this.antBot.myBod.bod.position.y-this.wayPoint.y);
        
        // Apply this rotation to the antBot.
        this.antBot.myBod.makeAngle(newH);
        
    }
    
    setWayPoint(_x, _y){
        this.wayPoint.x = _x;
        this.wayPoint.y = _y;
    }
    
    chaseWayPoint(){
        this.findHeading();
        this.antBot.moveForward(2);
    }


}