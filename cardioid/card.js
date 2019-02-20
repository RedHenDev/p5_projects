let points = [];

let step = 0;
let multiple = 2;
let currentPoint = 1;

// Number of points.
let tp = 200;

function setup(){
    createCanvas(400,400);
    background(101);
    
    setupPoints();
}


function draw(){
    //background(122);
    
    strokeWeight(3);
    stroke(0);
    
    for (let i = 0; i < tp; i++){
        point(points[i].x, points[i].y);
    }
    
    if (frameCount % 2 === 0)
        cardioidCycle();
    
}

function mouseMoved(){
    
    cardioidCycle();
}

function cardioidCycle(){
    if (currentPoint >= tp) {
        currentPoint = 0;
        multiple++;
    }
    
    strokeWeight(1);
    stroke(255,101);
    
    //for (let i = 0; i < 10; i++){
    
    line(points[currentPoint].x, points[currentPoint].y,
        points[multiple * currentPoint % tp].x,
        points[multiple * currentPoint % tp].y);
   // }
    
    currentPoint++;
}


function setupPoints(){
    
    let orig = createVector(width/2,height/2);
    let rad = 100;
    
    for (let i = 0; i < tp; i++){
        let p = createVector();
        p.x = orig.x + rad * 
            Math.cos(TWO_PI/tp * i);
        p.y = orig.y + rad * 
            Math.sin(TWO_PI/tp * i);
        points.push(p);
    }
}