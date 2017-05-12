

var fibly;

function setup(){
    
    createCanvas(windowWidth, windowHeight);
    
    background(0,51,111);
    
    rectMode(CENTER);
    
    fibly = new Fbox(width/2, height/2, (height/2)*0.618);
    
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
        
        
        
        push();
        
        
        translate(this.pos.x, this.pos.y);
        
        //rotate(radians(-90*this.n));
        
        rect(0, 0, this.wid, this.wid);
        
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








