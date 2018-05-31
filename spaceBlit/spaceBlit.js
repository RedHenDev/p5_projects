

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0,29,0);
    
    // Initialize layers (to be rendered as images).
    lettherebeStars(0); // First star layer.
    lettherebeStars(2); // Second star layer.
    
    lettherebePlanets(0); // Planet layer.
    
    mouseX = width;
    mouseY = height;
}


function draw(){
    background(0,29,0);
    
    // Bottom starry layer.
    lettherebeStars(3);
    
    // Planet layer (WEBGL).
    lettherebePlanets(1);
    
    // Player's ship.
    //renderShip();
    
    // Top starry layer.
    lettherebeStars(1);
}


function renderShip(){
    fill(200,100,200);
    ellipse(mouseX,mouseY,200,200);
}

// First, we want to be able to create the 'stars' by creating a procedural texture.
// Next, 'volcanic debris' --> a fragmented remnant of the Singularity. Or something.
function lettherebeStars(_state){
    // Initialize.
    if (_state === 0){
        foh = createGraphics(width,height);
        //foh.background(200,0,100);
        let fohX = 0;
        let fohY = 0;
        for (let i = 0; i < 512; i++){
            foh.strokeWeight(Math.random()*4);
            foh.stroke(0,255,0);
            fohX = Math.random()*width;
            fohY = Math.random()*height;
            foh.point(  fohX,
                        fohY);
        }
        
        return;
    }
    
    // Initialize second.
    if (_state === 2){
        foh2 = createGraphics(width,height);
        //foh.background(200,0,100);
        
        for (let i = 0; i < 512; i++){
            foh2.strokeWeight(Math.random()*3);
            //foh2.stroke(99,0,255);
            foh2.stroke(255);
            foh2.point(  Math.random()*width,
                         Math.random()*height);
        }
        
        return;
    }
    
    // Render FIRST to canvas.
    if (_state === 1){
        image(foh,0,0);
        return;
    }
    // Render SECOND to canvas.
    if (_state === 3){
        image(foh2,0,0);
        return;
    }
    
}

function lettherebePlanets(_state){
    if (_state === 0){
        fop = createGraphics(width,height, WEBGL);
    }
    
    if (_state === 1){
        // Size of ship.
        //let sSize = map(mouseY, 0,height,14,100);
        let sSize = 22;
        
        fop.pointLight(255,255,255,
                      mouseX, mouseY,142);
        
        // Clear background (no alpha).
        fop.background(0,0);
        fop.push();
        
        fop.stroke(0);
        fop.strokeWeight(2);
        //fop.fill(250);
        fop.specularMaterial(250);
        
        fop.translate(mouseX-width/2,mouseY-height/2);
        fop.rotateZ(frameCount/42);
        fop.box(sSize,sSize,sSize);
        fop.translate(sSize+2,
                      0);
        fop.box(sSize,sSize,sSize);
        fop.translate(-sSize*2-4,
                      0);
        fop.box(sSize,sSize,sSize);
        fop.translate(sSize+2,
                      -sSize-2);
        fop.box(sSize,sSize,sSize);
        fop.translate(0,
                      -sSize-2);
        fop.box(sSize,sSize,sSize);
        fop.pop();
        // Render to main canvas as image.
        image(fop,0,0);
    }
}

