// Class for the attractor object.
// Designed to work in conjunction with particleSystem.js.


function attractor(x, y, st){
    
    this.pos = createVector(x,y);
    
    this.strength = st;
    
    this.visible = false;
    
    this.type = "attractor";
    
    // Pass in a particle object.
    // Add force to that particle.
    this.attract = function(particle){
        
        var G;
        var force = p5.Vector.sub(this.pos, particle.pos);
        var fsq = force.magSq();
        fsq = constrain(fsq, 2048, 10000);
        // for orbits...
        fsq = constrain(fsq, 1, 1000);
       // console.log("Force = " + force.mag());
        if (this.type === "attractor")
        G = 9 * this.strength;
       
       // else 
    //    {if (force.mag() > 100) G = 9 * this.strength;
      //  else G = -9 * this.strength;}
            
        //fsq = constrain(fsq, 15, 1000);
        //var G = 90;
        
        var strength = G/fsq;
        force.setMag(strength);
        particle.acceleration.add(force);
    };
    
    this.render = function(){
       
        if (this.visible === false) return null;
        
       
            stroke(0);
        strokeWeight(4);
       
            fill(255,0,255,127);
            ellipse(this.pos.x,this.pos.y,32,32);
    };
    
};