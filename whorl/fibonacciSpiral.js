class Fbox {
    
    constructor(_x, _y, _w){
   
        this.n = 0;
        this.dir = 0;
    
        this.pos = createVector(_x, _y);
    
        this.wid = _w;
    
        // Stroke delta.
        // Yellow curve will decrease in thickness if true.
        this.strokeD = false;
    }
    
    render(){
        
        fill(255,61);
        //noFill();
        strokeWeight(2);
        stroke(255);
        
        push();
        
        
        translate(this.pos.x, this.pos.y);
        
        rotate(radians(90*this.n));
        
        rect(0, 0, this.wid, this.wid);
        
        // Yellow curve.
        if (this.strokeD)
        strokeWeight(22-(this.n*1.618));
        else
        strokeWeight(2-this.n);
        stroke(255,255,0);
        beginShape(POINTS);

            for (var i = 90; i < 180; i+= 0.33){
                vertex((this.wid/2)+this.wid * Math.cos(radians(i)), (this.wid/2)-this.wid * Math.sin(radians(i)));
            }
        endShape();
        
        pop();
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



var fibly;

var fibs = [];

var globalTheta = 0;

function setup(){
    
    createCanvas(windowWidth, windowHeight);
    
    background(0,51,111);
    
    rectMode(CENTER);
    
    var wid = (height)*0.618;
    
    fibly = new Fbox((width/2)-(wid*0.618)/2, height/2, wid);
    fibly.strokeD = true;
    
    var miniPosX = fibly.pos.x - fibly.wid/2;
    var miniWid = miniPosX/3;
    miniPosX = (miniPosX/2) - (miniWid/2) + ((miniWid*0.618)/2);
    
    for (let i = 0; i < floor(height/(miniWid+20)); i++){
        
        fibs.push(new Fbox(miniPosX, miniWid+(i*(miniWid+20)), miniWid));
        
        fibs[i].render();
    }
    
    fibly.render();
    
  noStroke();
  fill(255);
  textSize(20);
  text("Click or tap to iterate. Or, you know, go re-read Nietzsche or something.", miniWid * 3, fibly.pos.y-(fibly.wid/1.618));
  
}


function draw(){  }

function mousePressed(){
    
    for (let i = 0; i < fibs.length; i++){
        fibs[i].iterate();
        fibs[i].render();
    }
    
    fibly.iterate();
    fibly.render();
}