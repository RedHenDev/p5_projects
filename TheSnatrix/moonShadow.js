// Can we create a mini 3D solar system, 
// with a Sun, Earth, and Moon, 
// in order to cast shadows onto the Moon?

var z = 0;

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
    // Space is pink. It's true.
    background(200,0,200);
    
    pointLight(0, 255, 0, mouseX-width/2, -mouseY+height/2, 100);
    
    push();
    translate(0,0, z);
    sphere(100);
    pop();
}

function mousePressed(){
if (mouseX < width/2) z-=100; else z+=100;
}