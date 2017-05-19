//**************************
//**************************

//   BILLIARDS / SNOOKER
//**************************
//**************************

// p5.js library :) :) :)

var topEdge;

var balls = [];

var pockets = [];

var cueActive = false;  // Drag mouse/finger to activate cue-tip.
var cue;
var cueBsunk = false;   // Is the cueBall sunk?
                        // If so, allow collision between cue and *all* balls.

function setup(){
    
    createCanvas(windowWidth,windowHeight);
    
    background(0,101,202);  
    
    // Edges.
    topEdge = new Edge(width/2, 64, width*0.75, 32);
    botEdge = new Edge(width/2, height-64, width*0.75, 32);
    leftEdge = new Edge(width/2 - (width*0.75)/2, height/2, 32, botEdge.pos.y - topEdge.pos.y);
    rightEdge = new Edge(width/2 + (width*0.75)/2, height/2, 32, botEdge.pos.y - topEdge.pos.y);
    
    
    setupBalls();
    
    setupPockets();
    
    cue = new Cue();
} 



function draw(){
    
    background(0,101,202);
    
    //stroke(255);
    noStroke();
    fill(255);
    text("Hold button to activate cue tip.", 32,32);
    
    // Draw green baize.
    fill(0,147,0);
    //noStroke();
    rect(width/2,height/2,topEdge.wid, leftEdge.hid);
    
    topEdge.render();
    botEdge.render();
    leftEdge.render();
    rightEdge.render();
    
    for (let i = balls.length-1; i >= 0; i--){
        
        // Balls colliding with cue?
        if ((cueActive && balls[i] instanceof CueBall) || cueBsunk)
        cue.checkStrike(balls[i]);
        
        // Balls colliding with each other.
        for (let j = 0; j < balls.length; j++){
            if (i !== j){
            balls[i].checkCol(balls[j]);
            }
        }
        
        // Balls colliding with edges.
        if (topEdge.checkHit(balls[i]) ||
            botEdge.checkHit(balls[i]) === true){
            balls[i].vel.y = -balls[i].vel.y;
        }
        if (leftEdge.checkHit(balls[i]) ||
            rightEdge.checkHit(balls[i]) === true){
            balls[i].vel.x = -balls[i].vel.x;
        }
        
        // Draw balls, and their physics.
        balls[i].render();
        balls[i].move();
        
        // Pocket collisions.
        var sunk = false;
        for (let k = 0; k < pockets.length; k++){
            //pockets[k].render();
            if (pockets[k].checkSink(balls[i])){
                if (balls[i] instanceof CueBall) cueBallSunk();
                balls.splice(i, 1);      
                sunk = true;
            }
            if (sunk === true) break;
        }
        
    }
    
    // Draw pockets after, else will disappear if no balls left on array (pockets were previously drawn in ball array).
    for (let k = 0; k < pockets.length; k++){
            pockets[k].render();
    }
    
    cue.update(cueBsunk);
    cue.render();
   
}

function mouseDragged(){
    cueActive = true;   
}

function touchStarted(){
    cueActive = true;
}

function touchEnded(){
    cueActive = false;
}

function cueBallSunk(){
    cueBsunk = true;
}

function setupBalls(){
    // Place balls on table.
    
    // Random positions.
//    for (let i = 0; i < 9; i++){
//        balls.push(new Ball(width/2 + random(-200,200), height/2 + random(-120,120), 16));
//    }
    
    
    balls.push(new CueBall(22));
    
    // Triangle.
    let bD = 24;    // Diameter of balls.
    let ori = createVector(width/2, height/2);
    for (let i = 1; i <= 7; i++){
        let posX = ori.x + i * (bD+2);
        for (let j = 1; j <= i; j++){
            let posY = (ori.y + -((bD+2)*j));
            posY += (i/2 * (bD+2)) + (bD/2);
            if (Math.random() > 0.5)
            balls.push(new Ball(posX, posY, bD));
            else balls.push(new yellowBall(posX, posY, bD)); 
        }
    }
    
    
    
}

function setupPockets(){
   
    for (let i = 0; i < 6; i++){
       pockets.push(new Pocket(0,0));
    }
    pockets[0].pos.x = topEdge.pos.x - topEdge.wid/2 * 0.95;
    pockets[0].pos.y = topEdge.pos.y + topEdge.hid * 0.5;
    pockets[1].pos.x = topEdge.pos.x + topEdge.wid/2 * 0.95;
    pockets[1].pos.y = topEdge.pos.y + topEdge.hid * 0.5;
    pockets[2].pos.x = botEdge.pos.x - botEdge.wid/2 * 0.95;
    pockets[2].pos.y = botEdge.pos.y - botEdge.hid * 0.5;
    pockets[3].pos.x = botEdge.pos.x + botEdge.wid/2 * 0.95;
    pockets[3].pos.y = botEdge.pos.y - botEdge.hid * 0.5;
    pockets[4].pos.x = width/2;
    pockets[4].pos.y = botEdge.pos.y - botEdge.hid * 0.25;
    pockets[5].pos.x = width/2;
    pockets[5].pos.y = topEdge.pos.y + topEdge.hid * 0.25; 
}