// First, cloning class object.

// The idea will be to have a circular area
// in which a blinkie will clone itself upon
// entering.

class CloningOrb {
    
    constructor(_x, _y, _radius){
        
        this.pos = createVector(_x, _y);
        
        this.radius = _radius;
        this.dia = this.radius * 2;
        
        this.lastCloneTime = millis();
        this.rate = 600;
    }
    
    render(){
        fill(0,200,0,172);
        stroke(0,200,0);
        strokeWeight(1);
        
        ellipse(this.pos.x, this.pos.y, this.dia);
    }
    
    // Check whether an object has entered
    // this cloning orb's mouth.
    checkEntry(_x, _y, _rad, _obj){
        
        
        let distV = createVector(_x, _y);
        
        distV = p5.Vector.sub(distV, this.pos);
        if (distV.mag() < this.radius + _rad){
            
            if (millis() - this.lastCloneTime > this.rate){
            this.lastCloneTime = millis();
            console.log("Cloning time! @ " + this.lastCloneTime);
        } else return;
            
            RH_ants.push(new antBot(true, this.pos.x, this.pos.y + this.dia*2, 1));
            // Clone paren'ts colour.
            RedHen_antBot.returnLastAntCreated().col =
                _obj.col;
            // Give baby a brain!
            antBrains.push(new antBrain(RedHen_antBot.returnLastAntCreated()));
            
        }
        
    }

    
}