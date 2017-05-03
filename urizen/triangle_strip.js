function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL);
    
    BACKGROUND_COLOUR = color(0,122,222);
    
    background(BACKGROUND_COLOUR);
    stroke(0,255,0,42);
    strokeWeight(1);
    fill(0,255,0,101);
   
}

function draw(){
    background(BACKGROUND_COLOUR);

    beginShape(TRIANGLE_STRIP);   
    for (let i = 1; i < 20; i++)    {
        vertex(0+(i*20),100,-100);
        if (i < 19)
        vertex(0+(i*20),200,-100);
    }
    endShape();
}