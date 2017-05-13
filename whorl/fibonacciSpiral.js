

var fibly;

function setup(){
    
    createCanvas(windowWidth, windowHeight);
    
    background(0,51,111);
    
    rectMode(CENTER);
    
    var wid = (height)*0.618;
    
    fibly = new Fbox((width/2)+(wid*0.618)/2, height/2, wid);
    
    fibly.render();
    
}


function draw(){
    
    
    
}

function mousePressed(){
    
    fibly.iterate();
    fibly.render();
}


function Fbox(_x, _y, _w){
   
    this.n = 0;
    this.dir = 0;
    
    this.pos = createVector(_x, _y);
    
    this.wid = _w;
    
    this.render = function(){
        
        fill(255,61);
        noFill();
        
        
        push();
        
        
        translate(this.pos.x, this.pos.y);
        
        rotate(radians(90*this.n));
        
        rect(0, 0, this.wid, this.wid);
        
        noFill();
//        ellipse(this.wid/2, this.wid/2, this.wid*2, this.wid*2);
        strokeWeight(1);
        stroke(255,255,0);
        beginShape(POINTS);
//            vertex(-this.wid/2, this.wid/2);
//            vertex(this.wid/2, -this.wid/2);
            for (var i = 90; i < 180; i+=0.1){
                vertex((this.wid/2)+this.wid * Math.cos(radians(i)), (this.wid/2)-this.wid * Math.sin(radians(i)));
            }
        endShape();
        
        pop();
    }
    
    this.iterate = function(){
        
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








