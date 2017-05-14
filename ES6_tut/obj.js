
// Start of Object.
class BasicOb {
    
    constructor(_x, _y){
        
        // Private variables.
        this.x = _x;
        this.y = _y;
        
        this.dia = 202;
        
    }
    
    // Object method/function.
    drawMe(){
        
        ellipse(this.x, this.y, this.dia, this.dia);
    }
    
    static setupStuff(){
        alert("All set up!");
    }
    
}
// End of object.



class Ball extends BasicOb {
    constructor(_x, _y, _d){
        // You can only call
        // the superconductor
        // once.
        super(_x, _y);
        
        this.dia = _d;
    }
    
}

