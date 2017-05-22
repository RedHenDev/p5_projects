

var canvas;

// Terrain seed.
var Eve = 221188;

// So that we can find blocks in bods array.
var firstBlockID;

// Flappy's texture.
var flappyTex;
var flappy;

function preload(){
    flappyTex = loadImage("RedHenIconAlpha512512.png");
}

function setup(){
    
    canvas = createCanvas(windowWidth, windowHeight);
    
    background(0,101,222);
 
    RedHen_2DPhysics.setupMatter();
    
    createTerrain(0);
    
    spawnFlappy();
    
}

function draw(){
    background(0,101,222);
    
    textSize(32);
    text("FPS: " + Math.round(frameRate()), 32,32);
    
//    stroke(0,100,0);
//    strokeWeight(4);
//    fill(51,51,0);
//    rect(width/2, height-110, width,240);
    
    RedHen_2DPhysics.updateObjs();
    
    checkNavigation();
    
}

function checkNavigation(){
    if (flappy.bod.position.x > width-32){
        //newTerrain!
        createTerrain(1);
        // Reposition flappy!
        flappy.makePosition(36, 64);
    }
    if (flappy.bod.position.x < 32){
        //newTerrain!
        createTerrain(-1);
        // Reposition flappy!
        flappy.makePosition(width-36, 64);
    }
}

function touchEnded(){
    let flappyDir = createVector(0,0);
    
    if (mouseX > width/2 || mouseX > flappy.bod.position.x){
        flappyDir.x = 0.01;
    }
    else {
        flappyDir.x = -0.01; 
    }
    
    flappyDir.y = -0.08;
    flappy.addForce(flappyDir); 
    
    
}

function spawnFlappy(){
    RedHen_2DPhysics.newObj("circle", width/2, height/10, width/32);
    bods[bods.length-1].texture = flappyTex;
    flappy = bods[bods.length-1];
    flappy.OSR = false;
}

function createTerrain(_EveInc){
    // How many blocks can we instantiate
    // that both looks good and runs smoothly?
    
    
    let nOr = 4;
    let nOc = 64;
    let bWid = width/nOc;
    let steepness = bWid*10;
    
    // Check whether we need to splice old blocks...
    if (_EveInc != 0){
            for (let i = 0; i < nOr*nOc; i++){
                RedHen_2DPhysics.removeObj(firstBlockID);
            }
    }
    
    Eve += _EveInc*nOc;
    noiseSeed(Eve);
    
    for (let row = 0; row < nOr; row++){
        for (let col = 0; col < nOc; col++){
            
            if (row == 0)
            RedHen_2DPhysics.newObj 
            ("rectangle",(col*bWid)+bWid/2,
            height-(row*bWid)+((noise(col/10)*steepness)/2),
            bWid,180+(noise(col/10)*steepness));    
                
            else{
            RedHen_2DPhysics.newObj 
            ("box",(col*bWid)+bWid/2,
            height-(row*bWid)-80,
            bWid);
            }
            
            // Switch off OSC for blocks, since we need
            // to reuse them later.
            bods[bods.length-1].OSR = false;
            // Mass increase so that flappy doesn't knock them around easily.
            bods[bods.length-1].bod.density = 1;
            bods[bods.length-1].bod.restitution = 0;
            
            // Store index of *first* block, so that
            // we can reference them later :)
            if (row == 0 && col == 0){
            firstBlockID = bods.length-1;}
            
            if (row < nOr-2){
                bods[bods.length-1].makeStatic();
            }
            if (row >= 0){
                bods[bods.length-1].makePosition (bods[bods.length-1].bod.position.x, bods[bods.length-1].bod.position.y - (noise(col/10)*steepness));
            }
            let myC = map(row,0,nOr,100, 200);
            bods[bods.length-1].fill = color(myC*2,myC,0);
            bods[bods.length-1].stroke = color(myC*2,myC-60,0);
            bods[bods.length-1].strokeWeight = 2;
            if (row==nOr-1) {bods[bods.length-1].fill = color(0,myC,0);
            bods[bods.length-1].stroke = color(0,myC-60,0);
                            }
        }
    }
    
}




