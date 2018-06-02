// Space Map!

let sector;

function setupNavig(){
    
    // Origin sector.
    // 4,5 = 4.5 billion years.
    // Creation of Earth.
    sector = createVector(4,5);
    
    // Initialize layer.
    spaceMapLayer(0);
    
}

function spaceMap(){
    
    background(0,200,0,12);
    
    spaceMapLayer(1);
     
}



// Map design layer.

// Space map layer.
let sMap;

function spaceMapLayer(_state){
    if (_state === 0){
        sMap = createGraphics(width,height, WEBGL);
    }
    
    if (_state === 1){
        
        let size = height/7;
        
        // Light source from top-left.
        sMap.pointLight(255,255,255,
                      -100, -100,142);
        
        // Clear background (no alpha).
        sMap.background(0,0);
        
        sMap.push();
        
        sMap.translate(width/2-size*2,height/2-size*2,0);
        
        sMap.noFill();
        sMap.stroke(255);
        sMap.strokeWeight(1);
        
        sMap.push();
        sMap.rotateX(-Math.sin(frameCount/68)*PI*7
                    *deltaTime);
        sMap.sphere(size,14,12);
        sMap.pop();
        
        sMap.push();
            // Engine block.
            sMap.rotateZ(
                -frameCount/100);
            sMap.translate(size/3,
                     0);
            sMap.stroke(0);
            sMap.fill(0,250,250,100);
            sMap.box(size/7);
        sMap.pop();
        
        sMap.pop();
        // Render to main canvas as image.
        image(sMap,0,0);
    }
}