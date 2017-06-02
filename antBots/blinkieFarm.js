// Global canvas element necessary!
// This is to allow mouse/touch interaction to work.
var canvas;

var canSpawn = true;// Not moving obj, so can spawn obj.



function setup(){
    // Remember to assign value of canvas like this :)
    canvas = createCanvas(windowWidth,windowHeight);
    background(72);
    
    RedHen_2DPhysics.setupMatter();
    
    RedHen_2DPhysics.newObj("ghostrectangle", width/2,-50,width,100);
    bods[bods.length-1].makeStatic();
    
    // Create 7 blinkies ('antBots') of random scale.
    for (let i = 0; i < 7; i++){
        RH_ants.push(new antBot(true, Math.random()*width, 64, Math.floor(Math.random()*width/200)+1));
        // Give them a brain!
        // But not 0. Not you!
        if (i !== 0)
        antBrains.push(new antBrain(RedHen_antBot.returnLastAntCreated()));
    }
    controlAnt_index = 0;
    
    
    setupEnvironment();
    
    
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
    
        blinkiesChase();
    
    RedHen_2DPhysics.checkInputgGlobalMovement();
    RedHen_2DPhysics.updateObjs();
    
    RedHen_antBot.controlAntInput();
    updateBlinkies();
}

// ***** INPUT and OTHER FUNCTIONS *****

function setupEnvironment(){
    // We'll have perhaps 3 'ledges'
    // procedurally placed and formed.
    // Each ledge to be made up of
    // 2 layers of (static?) boxes.
    
    // And, as a little exercise, let's
    // attempt to do this in a functional way?
    
    const numberOfLedges    = 3;
    const numberOfLayers    = 2;
    let ledgeAmp            = 100;
    
    noiseSeed(9);
    let screenScale = 1440/width;
    let noiseResolution = 0.1;
    
    let ledgeX = 0;
    let ledgeY = 0;
    let ledgeLength = 100;
    let maxLedgeLength = width;
    
    const boxDiameter = maxLedgeLength/100;
    
    
    for (let i = 1; i <= numberOfLedges; i++){
        // First, decide position of ledge.
        ledgeX = noise(i*width)*width;
        ledgeY = noise(i*height)*height;
        
        // Next, procedurally decide length of ledge.
        ledgeLength = noise(i*1000)*maxLedgeLength;
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
                
                let procY = noise((i*100+k)*noiseResolution)*ledgeAmp;
                
                RedHen_2DPhysics.newObj("box", ledgeX-(ledgeLength/2)+(k*boxDiameter), (ledgeY+procY)-j*boxDiameter, boxDiameter);
//                RedHen_2DPhysics.lastObjectCreated ().makeStatic(); 
                RedHen_2DPhysics.lastObjectCreated ().makeSleep(true); 
                RedHen_2DPhysics.lastObjectCreated().fill = color(0,200,0);
                RedHen_2DPhysics.lastObjectCreated().
                strokeWeight = 2;
                RedHen_2DPhysics.lastObjectCreated().
                stroke = color(0,255,0);
                
            }
        }
        
            
        
    }
}


function mouseMoved(){
    updateBlinkieWayPoints();
  
}

function mouseDragged(){
    
    canSpawn = false;
}
function touchEnded(){
    if (canSpawn && mouseX < width/2)
    RedHen_2DPhysics.newObj("box", mouseX, mouseY, 28);
    if (canSpawn && mouseX > width/2)
    RedHen_2DPhysics.newObj("circle", mouseX, mouseY, 6);
    RedHen_2DPhysics.lastObjectCreated().fill = color(0,(mouseY/height)*255,0);
    
    
    
    
    canSpawn = true;
}

function updateBlinkieWayPoints(){
    for(let i = 0; i < antBrains.length; i++){
        antBrains[i].setWayPoint(mouseX, mouseY);   
    }
}

function blinkiesChase(){
    for (let i = 0; i < antBrains.length; i++){
        antBrains[i].chaseWayPoint(false);
    }
}

function updateBlinkies(){
    let hopTime = false;
    if (frameCount % 100 === 0) hopTime = true;
    for(let i = 0; i < RH_ants.length; i++){
        if (hopTime && i > 0) //RH_ants[i].moveForward(RH_ants[i].hopForce);
        RH_ants[i].screenWrap();
       // RH_ants[i].screenTrap();
        RH_ants[i].render();
        

        
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