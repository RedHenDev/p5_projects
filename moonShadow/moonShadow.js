// Can we create a mini 3D solar system, 
// with a Sun, Earth, and Moon, 
// in order to cast shadows onto the Moon?

var z = 0;
var theta = 0;

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
    // Space is pink. It's true.
    background(200,0,200);
    
    //pointLight(0, 255, 0, mouseX-width/2, -mouseY+height/2, 300);
    
    push();
    translate(0,0, z);
    ambientMaterial(255,255,255);
    sphere(100);
    pop();
    
    
    push();
    translate(0,0, z);
    rotateY(theta);
    translate(0,0, 150);
    ambientMaterial(101,101,101);
    pointLight(255, 255, 0, 0, 100, 0);
    sphere(10);
    pop();
    
    theta += 0.1;
    
}

function mousePressed(){
if (mouseX < width/2) z-=100; else z+=100;
}