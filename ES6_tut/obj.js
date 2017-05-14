
// Start of Object.
class BasicOb {
    
    constructor(_x, _y){
        
        // Private variables.
        var x = _x;
        var y = _y;
        
        this.dia = 202;
        
    }
    
    // Object method/function.
    drawMe(){
        
        ellipse(x, y, dia, dia);
    }
    
    getX(){
        console.log('x = ' + x);
    }
    
}
// End of object.