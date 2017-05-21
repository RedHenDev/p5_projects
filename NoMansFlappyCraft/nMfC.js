

var canvas;

var Eve = 221188;

var flappyTex;

var flappy;

function preload(){
    flappyTex = loadImage("RedHenIconAlpha512512.png");
}

function setup(){
    
    canvas = createCanvas(windowWidth, windowHeight);
    
    background(0,101,222);
 
    RedHen_2DPhysics.setupMatter();
    
    createTerrain();
    
    spawnFlappy();
    
}

function draw(){
    background(0,101,222);
    
    textSize(32);
    text("FPS: " + Math.round(frameRate()), 32,32);
    
    stroke(0,100,0);
    strokeWeight(4);
    fill(51,51,0);
    rect(width/2, height-100, width,200);
    
    RedHen_2DPhysics.updateObjs();
    
    checkNavigation();
    
}

function checkNavigation(){
    if (flappy.bod.position.x > width-32){
       //newTerrain!
        // Reposition flappy!
    }
}

function touchEnded(){
    let flappyDir = createVector(0,0);
    
    if (mouseX > flappy.bod.position.x){
        flappyDir.x = 0.01;
    }
    else {
        flappyDir.x = -0.01; 
    }
    
    flappyDir.y = -0.06;
    flappy.addForce(flappyDir); 
}

function spawnFlappy(){
    RedHen_2DPhysics.newObj("circle", width/2, height/10, width/30);
    bods[bods.length-1].texture = flappyTex;
    flappy = bods[bods.length-1];
    flappy.OSR = false;
}

function createTerrain(){
    // How many blocks can we instantiate
    // that both looks good and runs smoothly?
    
    let nOr = 3;
    let nOc = 32;
    let bWid = width/nOc;
    let steepness = bWid*4;
    
    Eve++;
    noiseSeed(Eve);
    
    for (let row = 0; row < nOr; row++){
        for (let col = 0; col < nOc; col++){
            RedHen_2DPhysics.newObj 
            ("box",(col*bWid)+bWid/2,
            height-(row*bWid)-100,
            bWid);
            if (row < nOr-2){
                bods[bods.length-1].makeStatic();
            }
            if (row >= 0){
                bods[bods.length-1].makePosition (bods[bods.length-1].bod.position.x, bods[bods.length-1].bod.position.y - (noise(col)*steepness));
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


