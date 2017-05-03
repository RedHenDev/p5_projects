// Class for the attractor object.
// Designed to work in conjunction with particleSystem.js.

function attractor(x, y, st){
    
    this.pos = createVector(x,y);
    
    this.strength = st;
    
    this.type = "attractor";
    
    // Pass in a particle object.
    // Add force to that particle.
    this.attract = function(_particle){
        
        var G;
        var force = p5.Vector.sub(this.pos, _particle.pos);
        var fsq = force.magSq();
        fsq = constrain(fsq, 0.5, 1000);
       // console.log("Force = " + force.mag());
        if (this.type === "attractor")
        G = 9 * this.strength;
        else 
        {if (force.mag() > 100) G = 9 * this.strength;
        else G = -9 * this.strength;}
            
        //fsq = constrain(fsq, 15, 1000);
        //var G = 90;
        
        var strength = G/fsq;
        force.setMag(strength);
        _particle.acceleration.add(force);
    };
    
    this.render = function(){
        noFill();
        strokeWeight(2);
        if (this.strength > 0)
        {stroke(0,255,0,122);
        if (!drawMags)fill(BGCOLOUR, 255);}
        else
        {stroke(255,0,0,122);
        if (!drawMags)fill(BGCOLOUR, 255);}
        
        ellipse(this.pos.x,this.pos.y,32,32);
    }
    
};