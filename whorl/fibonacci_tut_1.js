// Use the p5.js library!

// Use ES6 2015 -- classes!


var fibly;

function setup(){
    
    createCanvas(windowWidth, windowHeight);
    
    background(0,0,100);
    
    
    fibly = new GBox(width/2, height/2, height/2*0.618); 
    
    fibly.render();
    
}

function mousePressed(){
    
    fibly.iterate();
    fibly.render();
    
}

class GBox {
    constructor(_x, _y, _w){
        
        this.pos = createVector(_x, _y);
        
        this.wid = _w;
        
        this.n = 0;
        
        this.dir = 0;
        
    }
    
    
    render(){
        
        rectMode(CENTER);
        
        fill(255,61);
        strokeWeight(2);
        stroke(0);
        
        translate(this.pos.x, this.pos.y);
        
        rotate(radians(90)*this.n);
        
        rect(0,0, this.wid, this.wid);
        
        strokeWeight(7);
        stroke(255,255,0);
        
        beginShape(POINTS);
            
            for (let i = 180; i < 270; i++){
                
                let vX = (0 + (this.wid/2)) + this.wid * Math.cos(radians(i));
                let vY = (0 + (this.wid/2)) + this.wid * Math.sin(radians(i));
                vertex(vX, vY);
            }
        
        endShape();
        
    }
    
    iterate(){
        
        this.n++;
        
        this.dir++;
        if (this.dir > 4) this.dir = 1;
        
        if (this.dir === 1){
        this.pos.x += (this.wid/2) + ((this.wid/2) * 0.618);
        this.pos.y -= (this.wid/2) - ((this.wid/2) * 0.618);
        }
        else if (this.dir === 2){
        this.pos.x += (this.wid/2) - ((this.wid/2) * 0.618);
        this.pos.y += (this.wid/2) + ((this.wid/2) * 0.618);
        }
        else if (this.dir === 3){
        this.pos.x -= (this.wid/2) + ((this.wid/2) * 0.618);
        this.pos.y += (this.wid/2) - ((this.wid/2) * 0.618);
        }
         else if (this.dir === 4){
        this.pos.x -= (this.wid/2) - ((this.wid/2) * 0.618);
        this.pos.y -= (this.wid/2) + ((this.wid/2) * 0.618);
        }
        
        this.wid *= 0.618;
            
    }
    
    
}



