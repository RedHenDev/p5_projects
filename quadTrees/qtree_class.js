

class Quad{
    constructor(_x, _y, _rX, _rY){
        this.x = _x;
        this.y = _y;
        this.rX = _rX;
        this.rY = _rY;
        
        this.l = this.x - this.rX;
        this.r = this.x + this.rX;
        this.t = this.y - this.rY;
        this.b = this.y + this.rY;
    }
    
    contains(_p){
        if (_p.x <= this.l ||
           _p.x > this.r ||
           _p.y <= this.t ||
           _p.y > this.b){
            return false;
        } else return true;
    }
}

class QTree{
    constructor(_boundary){
        this.boundary = _boundary;
        this.capacity = 4;
        this.points = [];
        this.divided = false;
    }
    
    render(){
        rect(this.boundary.x,
            this.boundary.y,
            this.boundary.rX*2,
            this.boundary.rY*2);
        
        if (this.divided){
            this.qNE.render();
            this.qSE.render();
            this.qNW.render();
            this.qSW.render();
        }
    }
    
    subdivide(){
        let nw = new Quad(
            this.boundary.x - this.boundary.rX/2,
            this.boundary.y - this.boundary.rY/2,
            this.boundary.rX/2,
            this.boundary.rY/2);
        let ne = new Quad(
            this.boundary.x + this.boundary.rX/2,
            this.boundary.y - this.boundary.rY/2,
            this.boundary.rX/2,
            this.boundary.rY/2);
        let sw = new Quad(
            this.boundary.x - this.boundary.rX/2,
            this.boundary.y + this.boundary.rY/2,
            this.boundary.rX/2,
            this.boundary.rY/2);
        let se = new Quad(
            this.boundary.x + this.boundary.rX/2,
            this.boundary.y + this.boundary.rY/2,
            this.boundary.rX/2,
            this.boundary.rY/2);
        
        this.qNW = new QTree(nw);
        this.qNE = new QTree(ne);
        this.qSW = new QTree(sw);
        this.qSE = new QTree(se);
        
        this.divided = true;
        
    }
    
    insert(_point){
        
        if (!this.boundary.contains(_point)){
            return;
        }
        
        if (this.points.length < this.capacity){
            this.points.push(_point); 
        } else if (!this.divided){
            this.subdivide();
        }
            
            if (this.divided){
                this.qNE.insert(_point);
                this.qNW.insert(_point);
                this.qSE.insert(_point);
                this.qSW.insert(_point);
            }
            
    }
}

class Point{
    constructor(_x, _y){
        this.x = _x;
        this.y = _y;
    }
}