
var iCay;
var cayHead;
var cayScale;
var theta;

var inBox;

function preload(){
    
    iCay = loadImage('cayHead1.png');
    
}

function setup(){
    
    createCanvas(windowWidth, windowHeight);
    background(51);
    
    setupCay();
    
    setupIO();
    
}

function draw(){
    
    background(72,60);
    
    drawCay();
  
}

function setupIO(){
    
}

function setupCay(){
    
    // So that we can draw and handle
    // image from its centre.
    imageMode(CENTER);
    
    cayScale = width/2.8;
    
    cayPos = createVector(width/2, height/2);
    
//    cayPos.x -= cayScale/2;
//    cayPos.y -= cayScale*1.17/2;
    
    theta = 0;
    
}

function drawCay(){
    push();
    
    
    
    translate(cayPos.x , 
              cayPos.y + Math.sin(theta)*10);
    
    rotate(Math.sin(theta)/4*mouseY/height);
    
    cayHead = image(iCay, 0, 0, 1*cayScale,1.17*cayScale);
    
    theta+=0.03;
    
    pop();
}
