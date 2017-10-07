


function setup(){
    createCanvas(windowWidth, windowHeight);
    
    background(0);

    TENprint();
}


function TENprint(){
    let pos = createVector(0,0);
    let size = createVector(5,5);
    
    stroke(0,0,255);
    for (let i = 0; i < 1000000; i += size.x){
        if (pos.y > height) break;
        
        if (Math.random()<0.5)
        line(   pos.x-size.x, pos.y-size.y,
                pos.x+size.x, pos.y+size.x);
        else
        line(   pos.x+size.x, pos.y-size.y,
                pos.x-size.x, pos.y+size.x);
        
        pos.x += size.x;
        if (pos.x > width){
            pos.x = 0;
            pos.y += size.y;
        }
    }
}


function touchEnded(){
    
    let starSize = Math.random()*3;
    
    noStroke();
    fill(Math.random()*100 + 155);
    ellipse(mouseX, mouseY, starSize,
           starSize);
}