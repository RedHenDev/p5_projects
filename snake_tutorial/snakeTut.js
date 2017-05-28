
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
    
    let nX = pos[0].x + pos.length * sSize * -sMovement.x;
    let nY = pos[0].y + pos.length * sSize * -sMovement.y;
    
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

