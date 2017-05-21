// Global canvas element necessary!
// This is to allow mouse/touch interaction to work.
var canvas;

var canSpawn = true;// Not moving obj, so can spawn obj.

var noB;        // Number of blocks in 'sine bridge'.
var theta = 0;  // Angle of 'sine bridge'.

var img_RedHen;
function preload(){
    img_RedHen = loadImage("RedHenIconAlpha512512.png");
}

function setup(){
    // Remember to assign value of canvas like this :)
    canvas = createCanvas(windowWidth,windowHeight);
    background(72);
    
    RedHen_2DPhysics.setupMatter();
    
    setupBridge();
    
    // Create 7 blinkies ('antBots') of random scale.
    for (let i = 0; i < 2; i++){
        RH_ants.push(new antBot(true, Math.random()*width, 64, Math.floor(Math.random()*width/200)+1));
    }
    controlAnt_index = 0;
    
    // Create white circles.
    // Note how to load texture (img).
    let mW = 24;
    for (let i = 0; i < 12; i++){
        RedHen_2DPhysics.newObj(
        "circle",mW+(i*mW*3),64,mW);
        bods[bods.length-1].fill = color(255);
        bods[bods.length-1].stroke = color(0);
        bods[bods.length-1].strokeWeight = 3;
        bods[bods.length-1].texture = img_RedHen;
        bods[bods.length-1].roll = true;
    }
}

// ***** UDPATE LOOP *****
function draw(){ 
    background(72);
    printInstructions();
    
    RedHen_2DPhysics. checkInputgGlobalMovement();
    RedHen_2DPhysics.updateObjs();
    
    waveBridge();
    
    RedHen_antBot.controlAntInput();
    updateBlinkies();
}

// ***** INPUT and OTHER FUNCTIONS *****
function mouseDragged(){
    canSpawn = false;
}
function touchEnded(){
    if (canSpawn && mouseX < width/2)
    RedHen_2DPhysics.newObj("box", mouseX, mouseY, 28);
    if (canSpawn && mouseX > width/2)
    RedHen_2DPhysics.newObj("circle", mouseX, mouseY, 6);
    
    canSpawn = true;
}
function updateBlinkies(){
    let hopTime = false;
    if (frameCount % 100 === 0) hopTime = true;
    for(let i = 0; i < RH_ants.length; i++){
        if (hopTime && i > 0) RH_ants[i].moveForward(RH_ants[i].hopForce);
        //ants[i].screenWrap();
        RH_ants[i].screenTrap();
        RH_ants[i].render();
    }
}
function setupBridge(){
    noiseSeed(9);
    noB = 22;
    let bw = width/2/noB;
    let amplitude = 300;
    for (let i = 0; i < noB; i++){
        RedHen_2DPhysics.newObj( "box",bw+i*bw+width/4,noise(i/(bw*10))*amplitude+height/2,bw);
        bods[bods.length-1].makeStatic();
        bods[bods.length-1].OSR = false;
    }
}
function waveBridge(){
    theta+=2;
    // It's noB + 3 since RedHen_2D will
    // have already instantiated 3 edge bods.
    for (let i = 3; i < noB+3; i++){
        let newY = (height/2) + 64 * Math.sin(radians(theta+i*noB));
        bods[i].makePosition( bods[i].bod.position.x, newY);
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