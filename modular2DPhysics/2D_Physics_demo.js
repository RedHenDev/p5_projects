// Global canvas element necessary!
// This is to allow mouse/touch interaction to work.
var canvas;

var canSpawn = true;

var ants = [];
// Number of bits in 'sine bridge'.
var noB;
var theta = 0;

function setup(){
    // Remember to assign value of canvas like this :) -- so mouse/touch interaction can work.
    canvas = createCanvas(windowWidth,windowHeight);
    background(72);
    
    RedHen_2DPhysics.setupMatter();
    
    setupLedge();
    
    // Create 7 blinkies of random scale.
    for (let i = 0; i < 3; i++){
        ants.push(new antBot(true, Math.random()*width, 64, Math.floor(Math.random()*width/100)+1));
    }
    
    let mW = 12;
    for (let i = 0; i < 32; i++){
        RedHen_2DPhysics.newObj(
        "circle",width/5+(i*mW*3),64,mW);
        bods[bods.length-1].fill = color(255);
        bods[bods.length-1].stroke = color(0);
        bods[bods.length-1].strokeWeight = 3;
    }
    
    
}

function setupLedge(){
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

function waveLedge(){
    theta+=2;
    // It's noB + 1 since RedHen_2D will
    // have already instantiated a bod.
    for (let i = 1; i < noB+1; i++){
        let newY = (height/2) + 64 * Math.sin(radians(theta+i*noB));
        bods[i].makePosition( bods[i].bod.position.x, newY);
    }
}

function draw(){ 
    background(72);
    
    waveLedge();
    
    //if (frameCount % 2 === 0)
    //ants[0].mutate();
    
    for(let i = 0; i < ants.length; i++){
        ants[i].screenWrap();
        ants[i].render();
    }
    RedHen_2DPhysics.updateObjs();  
    
}