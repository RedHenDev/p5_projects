function NurtleObj(){
    this.pos = createVector(0,0,0);
    
    this.dir = "up";
    
    // Tail segments will store 'where I used to be' positions in a 2D vector.
    this.tailSegments = [];
    
    for (let i = 0; i < 6; i++){
        let newPos = createVector(0, 0, 0);
        // Note that this has an .x and .y, which is mapped over
        // from the .x and .z of the 3D representation.
        this.tailSegments.push(newPos);
    }
}

NurtleObj.prototype.render = function(_X, _Y, _Z, _type){
   push();
//    
    translate(_X, _Y, _Z);
    
    if (_type === 0){
   
        ambientMaterial(0,255,255);
        sphere(160); 
        
        ambientMaterial(0,0,255, 101);
        sphere(220); 
        
        
    }
    else {
        
        ambientMaterial(20*_type,255,10*_type);
         sphere(150); 
    
        ambientMaterial(0,0,255,101);
         sphere(160); 
    
    }
    
    
    pop();
}

// Move the snurtle one space according to its current set direction.
NurtleObj.prototype.move = function(){
        
            if (this.dir === "right") this.pos.x++;
            else if (this.dir === "left") this.pos.x--;
            else if (this.dir === "down") this.pos.z++;
            else if (this.dir === "up") this.pos.z--;
}

