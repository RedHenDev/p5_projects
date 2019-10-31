// Sparkle class :)

class Sparkle{
    
    constructor(x,y){
        this.pos = createVector(x,y);
        
        this.rad = 20;
        this.fallRate = 0.1;
        
        this.acc = 0.01;
        
        // Ready to deactivate?
        this.rip = false;
        
    }
    
    update(){
        this.pos.y += this.fallRate;
        this.fallRate += this.acc;
        
        if (this.pos.y > height)
            this.rip = true;
    }
    
    render(){
        
        
        if (this.pos.x < width-width/4 &&
           this.pos.x > tSize * 2){
            stroke(255,202);
            noFill();
            strokeWeight(1);
            //fill(255,140);
            if (Math.floor(this.pos.y) % 2 === 0)
            ellipse(this.pos.x, this.pos.y,
                   this.rad/2);
        }
        else{
            strokeWeight(this.rad);
            stroke(0,0,244,140);
            fill(0,0,255,140);
            point(this.pos.x, this.pos.y);
        }
        
    }
    
}