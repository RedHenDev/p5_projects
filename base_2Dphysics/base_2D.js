// Global canvas element necessary!
// This is to allow mouse/touch interaction to work.
let canvas;

let canSpawn = true;// Not moving obj, so can spawn obj.

function setup(){
    // Remember to assign value of canvas like this :)
    canvas = createCanvas(windowWidth,windowHeight);
    background(72);
    
    // Set parameter to 'true' to create window bounds automatically.
    RedHen_2DPhysics.setupMatter(true);
    
        
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
    

    
   
}

// ***** INPUT and OTHER FUNCTIONS *****

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


function printInstructions(){
    textSize(20); stroke(0); fill(255);
    text("Tap left of screen for blocks, right for balls. Objects can also be moved around :)", 32,32);
    fill(0,200,0);
    text("Arrow keys to control Blinkie; use + or - to change size :D", 32,62);
    fill(0,0,200);
    text("WSAD to move environment; space-bar for zero-gravity; g for usual gravity :O", 32, 92);
}