function goobaCloud(){
    
    this.pos = createVector(random(-99, width+99),random(84, height/2));
   
    this.speed = random (0.01, 0.1); 
    
    // Build the cloud...
    this.howMany = 16;
    this.lobes = [this.howMany];
    for (var i = 0; i < this.howMany; i++){
        this.lobes[i] = createVector();
        this.lobes[i].x = random(-64,64);
        this.lobes[i].y = random (-12,12);
        this.lobes[i].size = random(22,123);
    }
    
    
    this.drift = function(){
        // Drit cloud left.
        this.pos.x -= this.speed;
        // Wrap around screen.
        if (this.pos.x < - 150)
            this.pos.x = width + 150;
    }
    
    this.render = function(){
        //stroke(0,0,0,150);
        noStroke();
        strokeWeight(6);
        fill(255, 255, 255, 142);
       
        for (var j = 0; j < this.lobes.length; j++){
       ellipse(this.pos.x+this.lobes[j].x, this.pos.y+this.lobes[j].y,
               this.lobes[j].size*1.2, this.lobes[j].size);
    }
    
       // ellipse(this.pos.x, this.pos.y, 184, 144);
    }
};