// Array of particles.
let dots = [];

function setup(){
    
    createCanvas(400,400);
    
    background(random(0,255),0,random(0,255));
}

function draw(){
    background(142,0,142);
    
    dots.forEach(function(dot){
                if (dot.pv.y < height - 12){
                dot.pv.add(new p5.Vector(0,random(0.04,2)));
                } else dot.r += 0.01;
                dot.update();
                dot.screenWrap();
                dot.render();
                 });
    
}

function mouseMoved(){
    dots.push(new 
        Particle(mouseX,mouseY, random(0.4,7)));
}

// Let's see if I can remember ES6.

class Particle{
    constructor(_x, _y, _r){
        // Radius.
        this.r = _r;
        // Position.
        this.pv = new p5.Vector(_x, _y);
        // Acceleration.
        this.av = new p5.Vector(0,0);
        // Velocity.
        this.vv = new p5.Vector(0,0);
    }
    
    update(){
        // Euler integration.
        this.vv.add(this.av); // Add acc to vel.
        this.pv.add(this.vv); // Add vel to pos.
        
        // Zero out acceleration.
        this.av.mult(0);
    }
    
    render(){
        circle(this.pv.x, this. pv.y, this.r);
    }
    
    screenWrap(){
        // If going off screen, transport to
        // opposite side.
        if (this.pv.x < 0) this.pv.x = width;
        if (this.pv.y < 0) this.pv.y = height;
        if (this.pv.x > width) this.pv.x = 0;
        if (this.pv.y > height) this.pv.y = 0;
    }
    
    
}