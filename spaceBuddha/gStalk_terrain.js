// Infinite 2D terrain using Perlin noise.

// Each 'gStalk' will need to keep a track of two things:
// who its neighbour(s) are. Oh, and position, shape, colour, etc.

// Additionally, then, we need a 'manager', whose job will simply enough be to keep a track of which two gStalks are the current 'edge stalks' -- left and right (negative and positive).


class GSterrain{
    constructor(_wid, _span, _xBegin){
        // Constructor will have to
        // create then store how many
        // gStalks needed to fit across
        // the designated 'span'.
        // Only then can it grab the
        // right-most or 'positive' edge stalk.
        // 'Negative' edge stalk will of course
        // be first edge stalk in array.
        // NB. should only grab the index, not the
        // stalk object itself :)
        
        this.width = _width;    // Width of each gStalk.
        this.height = height*2; // Height of each gStalk.
        this.xBegin = _xBegin;  // Where to start span. 
        this.yPos = height*3;      // Y position.
        this.seed = 9;
        
        this.gStalks = [];      // Array of gStalks.
        
        this.lEdge = null;
        this.rEdge = null;
    }
    
    // Bool moving right?
    moveTerrain(_goingRight){
        if (_goingRight){
            
        }
        else if (!_goingRight){
            console.log("Unicorns are fancy.");
        }
    }
    
    // Generate new terrain.
    genTerrain(){
    
        let amplitude = height*3;
        let resolution = height;
    
        let thisWidth = this.width;
        
        totalW = 0; // Total width so far.

        noiseSeed(this.seed);
    
        for (let i = 0; totalW < width * 3; i++){
        
        let xOffset = this.xBegin + totalW + thisWidth/2;
        
        let noiseF = noise(xOffset/resolution)
        *amplitude;
        
        // Spawn a new stalk body with matter.js.
        RedHen_2DPhysics.newObj
        ('rectangle', xOffset, 
         this.yPos + noiseF/2 - amplitude/2, 
         thisWidth, this.height);
        // ...and grab this body.
        this.gStalks[i] =
            RedHen_2DPhysics.lastObjectCreated();
        
        RedHen_2DPhysics.lastObjectCreated().OSR = false;
        RedHen_2DPhysics.lastObjectCreated().
        makeStatic();
        RedHen_2DPhysics.lastObjectCreated().
        fill = color(0,Math.random()*100+155,0);
        RedHen_2DPhysics.lastObjectCreated().
        stroke = color(255,100);
        //RedHen_2DPhysics.lastObjectCreated().
        //fill; 
        
        totalW += thisWidth;  
    }   // End of for loop.
        
        // So, now we can find our 'edge stalks'.
        // Well, rEdge the only mystery.
        this.lEdge = 0;
        this.rEdge = this.gStalks.length-1;
    
}   // End of GSterrain object.

class Gstalk{
    constructor(_Lneighbour, _Rneighbour,
                _x, _y,
                _width, _height,
                _fill,
                _matterBody){
        this.Lneighbour = _Lneighbour;
        this.Rneighbour = _Rneighbour;
        
        this.x = _x;
        this.y = _y;
        
        this.width = _width;
        this.height = _height;
        
        this.fill = _fill;
        
        this.body = _matterBody;
    }
    
    moveMe(_x, _y){
        this.body.makePosition(_x, _y);
    }
}


