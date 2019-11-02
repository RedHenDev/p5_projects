// Array of particles.
let dots = [];

function setup(){
    
    createCanvas(400,400);
    
}

function draw(){
    background(0,200,222);
    
    dots.forEach(function(dot){
        
        // Basic Euler and rendering.
        dot.update();
        dot.screenWrap();
        dot.render(renderDot);
    });
    
}

function renderDot(_x, _y, _r){
    noStroke();
    fill(0,250,0);
    circle(_x, _y, _r);
    
    // Remember to witch stroke back on.
    stroke(0);
}

function mouseMoved(){
    dots.push(new Particle(mouseX,mouseY, random(0.4,7)));
}

