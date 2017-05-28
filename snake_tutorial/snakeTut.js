
// An array!

var pos = [];

var sSize;

var sMovement;

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    background(100, 204, 45);
    
    rectMode(CENTER);
    
    setupSnake();
    
}

function draw() {
    
    background(100, 204, 45);
    
    checkInput();
    
    drawSnake();
    
    if (frameCount % 10 === 0){
        moveSnake();
    }
}

function mousePressed(){
    newSegment();
}

function newSegment(){
    
    // There is a change here from 
    // the tutorial video :)
    // Instead of calculating the position
    // of the new segment relative to
    // the 'head segment', I should have
    // referred to the *last* segment.
    // In other terms, no pos[0] but
    // pos[pos.length-1].
    
    let nX = pos[pos.length-1];
    let nY = pos[pos.length-1];
    
    let nV = createVector(nX, nY);
    
    pos.push(nV);
    
}

function drawSnake(){
    
    for (let i = 0; i < pos.length; i++){
        rect(pos[i].x, pos[i].y, sSize, sSize);
    }
}

function checkInput(){
    
    if (keyIsDown(UP_ARROW) &&
       sMovement.y !== 1){
        changeMovement(0, -1);
    }
    
    if (keyIsDown(DOWN_ARROW) &&
       sMovement.y !== -1){
       changeMovement(0, 1);
    }
    
     if (keyIsDown(RIGHT_ARROW) &&
       sMovement.x !== -1){
        changeMovement(1, 0);
    }
    
    if (keyIsDown(LEFT_ARROW)&&
       sMovement.x !== 1){
       changeMovement(-1, 0);
    }
    
    
}


function moveSnake(){
    for (let i = pos.length-1; i > 0; i--){
        pos[i].x = pos[i-1].x;
        pos[i].y = pos[i-1].y;
    }
 
    pos[0].x += sMovement.x * sSize;
    pos[0].y += sMovement.y * sSize;
    
    if (pos[0].x < 0) pos[0].x = width;
    if (pos[0].x > width) pos[0].x = 0;
    if (pos[0].y < 0) pos[0].y = height;
    if (pos[0].y > height) pos[0].y = 0;
}

function changeMovement(_x, _y){
    sMovement.x = _x;
    sMovement.y = _y;
}

function keyPressed(){
    return false;
}


function setupSnake(){
   
    // ES6 Standard/2015 Standard for js.
    
    // Snake's position.
    let posV = createVector(width/2, height/2);
    
    pos.push(posV);
    
    sSize = 20;
    
    // Snake's direction.
    sMovement = createVector(1, 0);
    
}

