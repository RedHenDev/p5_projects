// Global canvas element necessary!
// This is to allow mouse/touch interaction to work.
let canvas;

let canSpawn = true;// Not moving obj, so can spawn obj.

function setup(){
    // Remember to assign value of canvas like this :)
    canvas = createCanvas(windowWidth,windowHeight);
    background(72);
    
    // Set parameter to 'true' to create window bounds automatically.
    RedHen_2DPhysics.setupMatter();
    
        
    makeGround();
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
        spawnBlock(mouseX, mouseY, 28);
    }
    if (canSpawn && mouseX > width/2){
        spawnBall(mouseX, mouseY, 14);
    }
    
    canSpawn = true;
}

function spawnBlock(_x,_y,_sz){
    RedHen_2DPhysics.newObj("box", _x, _y, _sz);
    
    RedHen_2DPhysics.lastObjectCreated().fill = 
        color(0,(_y/(height/2))*255,0);
    RedHen_2DPhysics.lastObjectCreated().stroke = 
        color(0);
    RedHen_2DPhysics.lastObjectCreated().strokeWeight(4);
}

function spawnBall(_x,_y,_sz){
    RedHen_2DPhysics.newObj("circle", _x, _y, _sz);
    
    RedHen_2DPhysics.lastObjectCreated().fill = 
        color(0,(_y/(height/2))*255,0);
    RedHen_2DPhysics.lastObjectCreated().stroke = 
        color(255);
    RedHen_2DPhysics.lastObjectCreated().strokeWeight(4);
}

function makeGround(){
        // Ground.
        let mySize = height/4;
        RedHen_2DPhysics.newObj
        ("rectangle",width/2,height-mySize,width,mySize);
        bods[bods.length-1].makeStatic();
        bods[bods.length-1].fill = color(0,255,0);
        bods[bods.length-1].stroke = color(0,200,0);
        bods[bods.length-1].strokeWeight = 4;
        bods[bods.length-1].OSR = false;
        // Invisible edges.
        RedHen_2DPhysics.newObj ("GhostRectangle",0-10,height/2,20,height);
        bods[bods.length-1].makeStatic();
        bods[bods.length-1].OSR = false;
        RedHen_2DPhysics.newObj ("GhostRectangle",width+
        10,height/2,20,height);
        bods[bods.length-1].makeStatic();
        bods[bods.length-1].OSR = false;
    
    for (let i = 0; i < 202; i++){
        let boxSize = Math.random()*24 + 4;
        
        RedHen_2DPhysics.newObj ('box', Math.random()*width, Math.random()*height-mySize*2, boxSize);
       
        RedHen_2DPhysics.lastObjectCreated().
        fill = color(0,Math.random()*255,0, 202);
        RedHen_2DPhysics.lastObjectCreated().
        strokeWeight = 8;
        RedHen_2DPhysics.lastObjectCreated().
        makeSleep(true);
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