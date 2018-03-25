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

let thePoints = [];

function mousePressed(){
    let amount = 32;
    for (let i = 0; i < amount; i++){
        let x = randomGaussian(mouseX, width/16);
        let y = randomGaussian(mouseY, height/16);
        let np = new Point(x,y);
        np.colour = color(Math.random()*255,
                           Math.random()*255,
                           Math.random()*255);
        thePoints.push(np);
        qt.insert(thePoints[i]);
    }
        pointCount+=amount;
}

function mouseMoved(){
    //let np = new Point(mouseX, mouseY);
    //qt.insert(np);
}

function draw(){

    background(100,100,100);
    
    for (let ps of thePoints){
        
        // For each point, I want to
        // call checkBump only for
        // the points that are in
        // a certain range of it.
        let cps = [];
        let range = new Quad(ps.x, ps.y,
                            12,12);
        qt.query(range, cps);
        for (let cp of cps){
            if (ps != cp && ps.checkBump(cp)){
                let temp_p = createVector(cp.v.x, cp.v.y);
                cp.v.x = ps.v.x;
                cp.v.y = ps.v.y;
                ps.v.x = temp_p.x;
                ps.v.y = temp_p.y;
                
            }
        }
        ps.update();
        qt.insert(ps);
    }
    
    qt.render();
    dangerZone();
    
    qt.reset();
}

let dzX = 100;
let dzY = dzX * 0.618;

function dangerZone(){
    stroke(0,255,0);
    strokeWeight(3);
    rect(mouseX, mouseY, dzX, dzY);
    
    stroke(0);
    strokeWeight(3);
    let ps = [];
    qt.query(new Quad(mouseX, mouseY, 
                      dzX/2, dzY/2), ps);
    for (let p of ps){
        ellipse(p.x,p.y,p.r);
        //point(p.x, p.y);
    }
}