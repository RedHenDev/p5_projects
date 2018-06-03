// Celestial layers.

// First, we want to be able to create the 'stars' by creating a procedural texture.
// Next, 'volcanic debris' --> a fragmented remnant of the Singularity. Or something.

// Graphics buffers (used in layers).
let foh;
let foh2;
let sop;
let fop;

function renderShipLayer(_state){
    if (_state === 0){
        sop = createGraphics(width,height, WEBGL);
    }
    
    if (_state === 1){
        
        // Clear background (clear alpha).
        sop.background(255,0);
        
        // Lighting.
        sop.pointLight(255,255,255,
                      0, 0,87);
    }
}

// Space Traffic...

function setupTraffic(){
    
    let amount = 9;
    
    // Place ships at random positions.
    // Ships held in the cybers array.
    for (let i = 0; i < amount; i++){
        let c = new Cyber(Math.random()
                *(width/2)-(width/4),
                Math.random()
                *(height/2)-(height/4),
                Math.random()*1400-700);
        cybers.push(c);
    }
}

function spaceTraffic(){
//cybers[0].sca = 14/cybers[0].shipSpeed + 14;
    //cybers[0].build();
    for (let i = 0; i < cybers.length; i++){
        cybers[i].forward(1);
        if (i !== 0){
            cybers[i].steer(Math.random()*2-1, 5);
            cybers[i].wrap(false);
        } else cybers[i].wrap(true);
        cybers[i].render(sop);
        
    }
}

function twinkles(){
    if (frameCount % 64 === 0){
    stroke(212);
    strokeWeight(10);
    point(  Math.random()*width,
            Math.random()*height);
    stroke(0,0,212);
    strokeWeight(5);
    point(  Math.random()*width,
            Math.random()*height);
    }
}


function lettherebeStars(_state){
    // Initialize.
    // Black spots, semi-transparent.
    if (_state === 0){
        
    
        foh = createGraphics(width,height);
        
        let fohX = 0;
        let fohY = 0;
        for (let i = 0; i < 7; i++){
            foh.strokeWeight(Math.random()*32);
            
            fohX = Math.random()*width;
            fohY = Math.random()*height;
            
            // Yellow spots.
            foh.stroke(255,255,0,240);
            foh.point(  fohX,
                        fohY);
            
            // Black holes.
            foh.stroke(0,142);
            foh.point(  fohX+9,
                        fohY);
        }
        
        return;
    }
    
    // Initialize second.
    if (_state === 2){
        foh2 = createGraphics(width,height);
        //foh.background(200,0,100);
        
        for (let i = 0; i < 212; i++){
            foh2.strokeWeight(Math.random()*3);
            //foh2.stroke(99,0,255);
            foh2.stroke(0,255,0);
            foh2.point(  Math.random()*width,
                         Math.random()*height);
        }
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
    
    if (_state === 1 && 
        sector.x === 4 &&
        sector.y === 5){
        // Size of ship.
        //let sSize = map(mouseY, 0,height,14,100);
        let pSize = 32;
        
        // Legacy parallax action.
        let sSize = 9;
          sSize = lerp(sSize,
            map(cybers[0].shipSpeed,
            0,
            cybers[0].maxSpeed,
            0,-140,true),0.1);
        
        // Light source from top-left.
        fop.pointLight(255,255,255,
                      -100, -100,142);
        
        // Clear background (no alpha).
        fop.background(0,0);
        
        fop.push();
        
        fop.translate(0,0,sSize*9);
        
        // Orbital pool.
        fop.push();
            fop.translate(122,-88);
            fop.rotateY(radians(-32));
            fop.rotateZ(frameCount/512);
            //fop.stroke(242);
            //fop.strokeWeight(7);
            fop.fill(80,80,255,172);
            fop.noStroke();
            fop.ellipse(0,0,172);
        fop.pop();
        
        fop.fill(0);
        fop.noStroke();
        fop.ambientMaterial(200);
        fop.translate(122,
                     -88);
        
        //fop.rotateZ(-frameCount/200);
        fop.rotateX(-frameCount/200);
        fop.sphere(pSize);
        
        // Moon.
        fop.translate(0,
                     -120);
        fop.ambientMaterial(112,112,0);
        fop.sphere(pSize/2);
        
        // Baby moon.
        fop.rotateX(frameCount/100);
        fop.translate(0,
                     224);
        fop.ambientMaterial(122,122,0);
        fop.sphere(pSize/4);
        
        fop.pop();
        // Render to main canvas as image.
        image(fop,0,0);
    }
}


