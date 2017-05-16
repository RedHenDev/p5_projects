
class Edge {
    
    constructor(_x, _y, _w, _h){
        this.pos = createVector(_x, _y);
        
        this.wid = _w;
        
        this.hid = _h;
    }
    
    checkHit(_b){
        
        let newV = createVector();
        let eRad = 0;
        
        if (this.wid > this.hid){
            newV = createVector(_b.pos.x, this.pos.y);
            eRad = this.hid/2;
        }
        else {
            newV = createVector(this.pos.x, _b.pos.y);
            eRad = this.wid/2;
        }
        
        let dist = p5.Vector.sub(_b.pos, newV);
        dist = dist.mag();
        
        if (dist < _b.rad + eRad)
            return true;
        else
        return false;
    }
    
    render(){
        
        rectMode(CENTER);
        
        fill(250);
        stroke(0);
        strokeWeight(4);
        
        rect(this.pos.x, this.pos.y, this.wid, this.hid);
    }
    
}

class Ball extends Edge {
    
    constructor(_x, _y, _dia){
        
        super (_x, _y, _dia);
        
        this.dia = _dia;
        this.rad = this.dia/2;
        
        this.vel = createVector(Math.random()*6-3, Math.random()*6-3);
        this.acc = createVector();
        
        
    }
    
    checkCol(_b){
        
        let dist = p5.Vector.sub(_b.pos, this.pos);
        dist = dist.mag();
        
        if (dist < _b.rad + this.rad){
            let o3 = this.vel;
            this.vel = _b.vel;
            _b.vel = o3;
        }
        
        
    }
    
    render(){
        
        fill(147,0,0);
        stroke(255);
        strokeWeight(2);
        
        ellipse(this.pos.x, this.pos.y, this.dia, this.dia);
        
        
    }
    
    move(){
        
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        
        this.acc.mult(0);
        
    }
    
    
}

class Pocket extends Edge {
    
    constructor(_x, _y){
        super (_x, _y);
        
        this.wid = 42;
        
    }
    
     render(){
        
        fill(0);
//        stroke(0);
//        strokeWeight(4);
         noStroke();
        
        ellipse(this.pos.x, this.pos.y, this.wid, this.wid);
    
    }
    
    checkSink(_b){
        
        let dist = p5.Vector.sub(_b.pos, this.pos);
        dist = dist.mag();
        
        if (dist < _b.rad + this.wid/2)
            return true;
        else return false;
        
        
    }
    
}






