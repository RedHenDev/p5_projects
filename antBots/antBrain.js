
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
       
        // Angle directly facing target.
        let newH = Math.atan2(this.wayPoint.x - this.antBot.myBod.bod.position.x, this.antBot.myBod.bod.position.y-this.wayPoint.y);
        
        // Apply this rotation instantly to the antBot.
        //this.antBot.myBod.makeAngle(newH);
        
        // Add a little steering.
        let steerDeg = (newH-this.antBot.myBod.bod.angle);
        this.antBot.steer(steerDeg);
        // NB whatever the steeringDeg here, the steer()
        // function will always scale this between 0 and 1.
        
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