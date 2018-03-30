p5.disableFriendlyErrors = true;

// Our first QuadTree.
let qt;

let pointCount = 0;

function setup(){
    createCanvas(windowWidth,windowHeight);
    background(100,100,100);
    
    // Setup the root quadtree (over whole area).
    let ra = new Quad(width/2, height/2,
                     width/2, height/2);
    
    qt = new QTree(ra);
    
    rectMode(CENTER);
    
    stroke(255);
}

let thePoints = [];

function mousePressed(){
    let amount = 400;
    for (let i = 0; i < amount; i++){
        let x = randomGaussian(mouseX, width/12);
        let y = randomGaussian(mouseY, height/12);
        let np = new Point(x,y);
        np.colour = color(Math.random()*255,
                          Math.random()*255,
                          Math.random()*255);
        np.r = 3;
        thePoints.push(np);
        qt.insert(thePoints[i]);
    }
        pointCount+=amount;
}

//function mouseMoved(){
//    let np = new Point(mouseX, mouseY);
//    qt.insert(np);
//}

function draw(){

    background(100,100,100);
    
    
    checkCollisions();
    //oldStyleCheck();
    
    //qt.render();
    dangerZone();
    
    qt.reset();
}

function oldStyleCheck(){
     for (let i = 0; i < thePoints.length; i++){
      
         thePoints[i].render();
         
        for (let j = 0; j < thePoints.length; j++){
           if (i !== j && thePoints[i].
           checkBump(thePoints[j])){
                let temp_p = createVector(thePoints[i].v.x, thePoints[i].v.y);
                thePoints[i].v.x = thePoints[j].v.x;
                thePoints[i].v.y = thePoints[j].v.y;
                thePoints[j].v.x = temp_p.x;
                thePoints[j].v.y = temp_p.y;
            
           } 
        }
        
        thePoints[i].update();
        qt.insert(thePoints[i]);
    }
}

function checkCollisions(){
    for (let ps of thePoints){
        
        ps.render();
        
        
        // For each point, I want to
        // call checkBump only for
        // the points that are in
        // a certain range of it.
        let cps = [];
        let range = new Quad(ps.x, ps.y,
                            ps.r+ps.r,ps.r+ps.r);
        qt.query(range, cps);
        for (let cp of cps){
            if (ps !== cp && ps.checkBump(cp)){
                let temp_p = createVector(cp.v.x, cp.v.y);
                cp.v.x = ps.v.x;
                cp.v.y = ps.v.y;
                ps.v.x = temp_p.x;
                ps.v.y = temp_p.y;
                if (cp.r < 8)
                cp.r *= 1.01;
            }
        }
        
            
        ps.update();
        qt.insert(ps);
    }
}

let dzX = 100;
let dzY = dzX * 0.618;

function dangerZone(){
    noFill();
    stroke(0,255,0);
    strokeWeight(3);
    rect(mouseX, mouseY, dzX, dzY);
    
    stroke(0,200,0);
    strokeWeight(2);
    let ps = [];
    qt.query(new Quad(mouseX, mouseY, 
                      dzX/2, dzY/2), ps);
    for (let p of ps){
        ellipse(p.x,p.y,p.r);
        line(mouseX, mouseY, p.x, p.y);
    }
    
    fill(0,0,0);
    textSize(18);
    stroke(255);
    text("FPS = " + Math.floor(frameRate()),mouseX-42, mouseY-dzY/1.75);
    text("Objects = " + pointCount, mouseX-42, mouseY+dzY);
}