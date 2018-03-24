let qt;

function setup(){
    createCanvas(400,400);
    background(100,100,100);
    
    // Setup the root quadtree (over whole area).
    let ra = new Quad(width/2, height/2,
                     width/2, height/2);
    
    qt = new QTree(ra);
    
    rectMode(CENTER);
    noFill();
    stroke(255);
}

function mouseDragged(){
    let np = new Point(mouseX, mouseY);
    qt.insert(np);
    qt.render();
}

function draw(){
    //background(100,100,100);
    
    //qt.render();
}