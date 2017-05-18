
var blocks = [];

var canvas;

function setup(){
    
    canvas = createCanvas(windowWidth,windowHeight);
    background(0);
    
    RedHen_2DPhysics.setupMatter();
    
    blocks.push(new Box(200,200,20));
    
}

function mouseMoved(){
   // if (frameCount % 4 !== 0) return;
    blocks.push(new Box(mouseX, mouseY, 22));   
}

function draw(){
    
    background(0);
    
    for (let i = 0; i < blocks.length; i++){
        blocks[i].render();
    }
    
}