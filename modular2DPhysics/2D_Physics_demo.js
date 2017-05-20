// Global canvas element necessary!
// This is to allow mouse/touch interaction to work.
var canvas;

var canSpawn = true;

var ants = [];

function setup(){
    // Remember to assign value of canvas like this :) -- so mouse/touch interaction can work.
    canvas = createCanvas(windowWidth,windowHeight);
    background(72);
    
    RedHen_2DPhysics.setupMatter();
    
    
    for (let i = 0; i< 33; i++){
        ants.push(new antBot(true, Math.random()*width, Math.random()*height, Math.floor(Math.random()*4)));
    }
    
}

function mouseDragged(){
    canSpawn = false;
}

function touchEnded(){
    if (canSpawn && mouseX < width/2)
    RedHen_2DPhysics.newObj("box", mouseX, mouseY, 14);
    
    if (canSpawn && mouseX > width/2)
    RedHen_2DPhysics.newObj("circle", mouseX, mouseY, 3);
    
    canSpawn = true;
}

function draw(){ 
    background(72);
    
    RedHen_2DPhysics.updateObjs();  
    for(let i = 0; i < ants.length; i++){
        ants[i].render();
    }
}