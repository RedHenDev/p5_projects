// Global canvas element necessary!
// This is to allow mouse/touch interaction to work.
var canvas;

var canSpawn = true;// Not moving obj, so can spawn obj.

var cloner;

var tRods = [];

function setup(){
    // Remember to assign value of canvas like this :)
    canvas = createCanvas(800,600);
    background(72);
    
    RedHen_2DPhysics.setupMatter();
    
    RedHen_2DPhysics.newObj("ghostrectangle", width/2,-50,width,100);
    bods[bods.length-1].makeStatic();
    
    // Create 7 blinkies ('antBots') of random scale.
    let giveMeAi = false;
    //let antScale = Math.floor(Math.random()*width/200)+1;
    let antScale = 2;
    for (let i = 0; i < 7; i++){
        if (i > 0) giveMeAi = true;
        RH_ants.push(new antBot(true, Math.random()*width, 64, antScale,giveMeAi));
    }
    controlAnt_index = 0;
    
    
    setupEnvironment();
    
    cloner = new CloningOrb(64, 64, 32);
    
    // Create white circles.
//    let mW = 24;
//    for (let i = 0; i < 12; i++){
//        RedHen_2DPhysics.newObj(
//        "circle",mW+(i*mW*3),64,mW);
//        bods[bods.length-1].fill = color(255);
//        bods[bods.length-1].stroke = color(0);
//        bods[bods.length-1].strokeWeight = 3;
//        bods[bods.length-1].roll = true;
//    }
}

// ***** UDPATE LOOP *****
function draw(){ 
    background(0,111,222);
   // printInstructions();
    RedHen_2DPhysics.checkInputgGlobalMovement();
    RedHen_2DPhysics.updateObjs();
    
    RedHen_antBot.controlAntInput();
    updateBlinkies();
    
    terrainWave();
}

// ***** INPUT and OTHER FUNCTIONS *****

function terrainWave(){
    
    let magicSine = 0;  //Math.sin(frameCount/100)*0.1;
    
    for (let i = 0; i < tRods.length; i++){
        magicSine =  Math.sin(frameCount/50+(i/10))*0.1;
        tRods[i].makePosition(
        tRods[i].bod.position.x,
        tRods[i].bod.position.y+
        magicSine);
    }
}


function setupEnvironment(){
    // We'll have perhaps 3 'ledges'
    // procedurally placed and formed.
    // Each ledge to be made up of
    // 2 layers of (static?) boxes.
    
    const numberOfLedges    = 3;
    const numberOfLayers    = 4;
    let ledgeAmp            = 80;
    
    noiseSeed(9);
    let screenScale = 1440/width;
    let noiseResolution = 0.1;
    
    let ledgeX = 0;
    let ledgeY = 0;
    let ledgeLength = 100;
    let maxLedgeLength = width/1.5;
    
    const boxDiameter = maxLedgeLength/64;
    
    
    for (let i = 1; i <= numberOfLedges; i++){
        // First, decide position of ledge.
        ledgeX = noise(i*width)*width;
        ledgeY = noise(i*height)*height/2;
        
        // Next, procedurally decide length of ledge.
        ledgeLength = noise(i*500)*maxLedgeLength;
        //ledgeAmp = ledgeLength/8;
        // How many boxes will one layer need, then?
        let numOfLedgeBoxes = ledgeLength/boxDiameter;
        
        // Now we have everything we need to build
        // each ledge out of n layers of boxes.
        // Each box to be +-ledgeLength/2 from central
        // position of length. And, +procY (procedural Height)
        // from Yposition of ledge.
        // We loop round for each layer, minusing boxDiameter :)
        for (let j = 1; j <= numberOfLayers; j++){
            for (let k = 1; k <= numOfLedgeBoxes; k++){
                
                // Only make block if...
                // (for 'degraded' effect)
                if ((j > 1 && j < numberOfLayers) || Math.random()>0.1){
                
                let procY = noise((i*100+k)*noiseResolution)*ledgeAmp;
                
                RedHen_2DPhysics.newObj("box", ledgeX-(ledgeLength/2)+(k*boxDiameter), (ledgeY+procY)-j*boxDiameter, boxDiameter);
//                RedHen_2DPhysics.lastObjectCreated ().makeStatic(); 
                RedHen_2DPhysics.lastObjectCreated ().makeSleep(true); 
                RedHen_2DPhysics.lastObjectCreated().fill = color(0,200+(j*8),0);
                RedHen_2DPhysics.lastObjectCreated().
                strokeWeight = 2;
                RedHen_2DPhysics.lastObjectCreated().
                stroke = color(0,255,0);
                }
                    
            }
        }
        
            
        
    }
    
    // 1st param = amplitude.
    // 2nd param = gradient.
    generateFloor(height/3, 0.04);
    
}


function generateFloor(_amplitude, _grad){
    
    const bruckWidth = 10;
    
    const bNum = width/bruckWidth;
    let floorAmp = _amplitude;
    
    const bLayers = 2;
    
    let KensNumber = 0;
    
    let bHei = bruckWidth;
    
    // Terrain colour.
    let terrC = color(0,222,0);
    
    //noiseSeed(Math.random()*100);
    
    for (let i = 0; i < bNum; i++){
        
        KensNumber = noise(i * _grad)*floorAmp;
        
        bHei = bruckWidth;
        
        for (let j = 0; j < bLayers; j++){
            
            if (j === bLayers-1){
                bHei = height-(height- KensNumber + (bruckWidth * j));
            }
            
        RedHen_2DPhysics.newObj("rectangle", i*bruckWidth+ bruckWidth/2, height- KensNumber + (bruckWidth * j)+(bHei/2), bruckWidth, bHei);
      
            // Static or loose?
           if (j === bLayers-1){  RedHen_2DPhysics.lastObjectCreated().makeStatic();
                                tRods.push(RedHen_2DPhysics.lastObjectCreated());
            }
           
            RedHen_2DPhysics.lastObjectCreated().OSR = false;
        
            // Colour & mass.
            if (j != bLayers-1){ 
                terrC = color(0,155+Math.random()*100,0,200);
              
                RedHen_2DPhysics.lastObjectCreated().bod.mass = 100;
                RedHen_2DPhysics.lastObjectCreated().stroke = color(0,72,0);
                RedHen_2DPhysics.lastObjectCreated().strokeWeight = 2;
            } else {
                terrC = color(0,255*i*0.008,0);
                RedHen_2DPhysics.lastObjectCreated().stroke = color(0,72,0);
                RedHen_2DPhysics.lastObjectCreated().strokeWeight = 2;
            }
            RedHen_2DPhysics.lastObjectCreated().fill = terrC;
            
        }
        
        
        
    }
    
}





function mouseDragged(){
    
    canSpawn = false;
}
function touchEnded(){
    if (canSpawn && mouseX < width/2){
    RedHen_2DPhysics.newObj("box", mouseX, mouseY, 28);
        RedHen_2DPhysics.lastObjectCreated().fill = color(0,(mouseY/height)*255,0);
    }
    if (canSpawn && mouseX > width/2){
        RedHen_2DPhysics.newObj("circle", mouseX, mouseY, 6);
        RedHen_2DPhysics.lastObjectCreated().fill = color(0,(mouseY/height)*255,0);
    }
    
    canSpawn = true;
}



function updateBlinkies(){
    
    cloner.render();
    
    //let hopTime = false;
    //if (frameCount % 100 === 0) hopTime = true;
    
    for(let i = RH_ants.length-1; i >= 0 ; i--){
        //if (hopTime && i > 0) //RH_ants[i].moveForward(RH_ants[i].hopForce);
        
        RH_ants[i].screenWrap();
        //RH_ants[i].screenTrap();
        RH_ants[i].think();
        RH_ants[i].render();
        
        cloner.checkEntry(RH_ants[i].myBod.bod.position.x,
                          RH_ants[i].myBod.bod.position.y,
                        RH_ants[i].radius, RH_ants[i]);
        
    }
}


function printInstructions(){
    textSize(20); stroke(0); fill(255);
    text("Tap left of screen for blocks, right for balls. Objects can also be moved around :)", 32,32);
    fill(0,200,0);
    text("Arrow keys to control Blinkie; use + or - to change size :D", 32,62);
    fill(0,0,200);
    text("WSAD to move environment; space-bar for zero-gravity; g for usual gravity :O", 32, 92);
}