
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
        
        fill(51,24,12);
        stroke(101);
        strokeWeight(4);
        
        rect(this.pos.x, this.pos.y, this.wid, this.hid);
    }
    
}

class Ball extends Edge {
    
    constructor(_x, _y, _dia){
        
        super (_x, _y, _dia);
        
        this.dia = _dia;
        this.rad = this.dia/2;
        
        //this.vel = createVector(Math.random()*6-3, Math.random()*6-3);
        this.vel = createVector();
        this.acc = createVector();
        
        
    }
    
    checkCol(_b){
        
        let dist = p5.Vector.sub(_b.pos, this.pos);
        let nDist = dist.mag();
        
        if (nDist <= _b.rad + this.rad){
            
            // Pauli exclusion!
            dist = dist.normalize();
            _b.pos.add(dist.mult(0.89));
            this.pos.sub(dist.mult(0.89));
            
              let _dist = p5.Vector.sub(this.pos, _b.pos);
            _dist = _dist.normalize();
            
            let nV = createVector(-_dist.y, _dist.x);
            nV.normalize();
            
            let vStore = this.vel.mag();
            
            this.vel.mult(0.98);
            _b.vel.mult(0.85);
            
            this.acc.add(_dist.mult(0.33));
            //_b.acc.sub(_dist.mult(0.1));
            
            
            //this.acc.sub(_b.vel);
            
//            let _dist = p5.Vector.sub(this.pos, _b.pos);
//            _dist = _dist.normalize();
//            
//            let tN = createVector(-dist.y, dist.x);
//            let _tN = createVector(-_dist.y, _dist.x);
//            this.acc.add(tN);
//            _b.acc.add(tN);
//            
//            this.vel.mult(0.33);
//            _b.vel.mult(0.33);

        }
        
        
    }
    
    render(){
        
        fill(147,0,0);
        stroke(0);
        strokeWeight(1);
        
        ellipse(this.pos.x, this.pos.y, this.dia, this.dia);
        
        
    }
    
    move(){
        
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        
        // Deceleration.
        if (this.vel.mag() > 0)
        this.vel.mult(0.99);
        
        this.acc.mult(0);
        
    }
    
    
}

class Pocket extends Edge {
    
    constructor(_x, _y){
        super (_x, _y);
        
        this.wid = 32;
        
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

class Cue extends Edge {
    constructor(){
        super(mouseX, mouseY, 32);
    }
    
    update(){
        this.pos.x = mouseX;
        this.pos.y = mouseY;
    }
    
    render(){
        fill(0,0,255,142);
        stroke(255);
        strokeWeight(2);
        
      
        ellipse(this.pos.x, this.pos.y, this.wid, this.wid);
    }
    
    checkStrike(_b){
        
        let dist = p5.Vector.sub(_b.pos, this.pos);
        let mDist = dist.mag();
        
        if (mDist < _b.rad + (this.wid/2)){
            
            //dist = dist.normalize();
            //_b.pos.add(dist);
            _b.acc = dist.mult(0.1);
        }
        
    }
}


class CueBall extends Ball {
    constructor(){
        super ();
        this.pos.x = width/2 - 100;
        this.pos.y = height/2;
        
        this.dia = 16;
        this.rad = this.dia/2;
    }
    
    render(){
        fill(255);
        stroke(0);
        strokeWeight(1);
        
        ellipse(this.pos.x, this.pos.y, this.dia, this.dia);
    }
    
}


