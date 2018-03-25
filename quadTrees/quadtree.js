p5.disableFriendlyErrors = true;

// Our first QuadTree.
let qt;

let pointCount = 0;

function setup(){
    createCanvas(512,512);
    background(100,100,100);
    
    // Setup the root quadtree (over whole area).
    let ra = new Quad(width/2, height/2,
                     width/2, height/2);
    
    qt = new QTree(ra);
    
    rectMode(CENTER);
    noFill();
    stroke(255);
}

function mousePressed(){
    let amount = 512;
    for (let i = 0; i < amount; i++){
        let x = randomGaussian(width/2, width/6);
        let y = randomGaussian(height/2, height/6);
        let np = new Point(x,y);
        qt.insert(np);
    }
    pointCount+=amount;
}

function mouseMoved(){
    //let np = new Point(mouseX, mouseY);
    //qt.insert(np);
}

function draw(){

    background(100,100,100);
    
    qt.render();
    
    dangerZone();
}

let dzX = 100;
let dzY = dzX * 0.618;

function dangerZone(){
    stroke(0,255,0);
    strokeWeight(3);
    rect(mouseX, mouseY, dzX, dzY);
    
    stroke(255);
    strokeWeight(8);
    let ps = [];
    qt.query(new Quad(mouseX, mouseY, dzX/2, dzY/2), ps);
    for (let p of ps){
        point(p.x, p.y);
    }
}