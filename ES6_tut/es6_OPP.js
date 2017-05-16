//**************************
//**************************

//   BILLIARDS / SNOOKER
//**************************
//**************************

// p5.js library :) :) :)

var topEdge;

var balls = [];

var pockets = [];

function setup(){
    
    createCanvas(640,480);
    
    background(0,101,202);  
    
    
    topEdge = new Edge(width/2, 64, width*0.75, 32);
    botEdge = new Edge(width/2, height-64, width*0.75, 32);
    leftEdge = new Edge(width/2 - (width*0.75)/2, height/2, 32, botEdge.pos.y - topEdge.pos.y);
    rightEdge = new Edge(width/2 + (width*0.75)/2, height/2, 32, botEdge.pos.y - topEdge.pos.y);
    
    for (let i = 0; i < 9; i++){
        balls.push(new Ball(width/2 + random(-200,200), height/2 + random(-120,120), 16));
    }
    
    for (let i = 0; i < 4; i++){
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
    
} 



function draw(){
    
    background(0,101,202);
    
    // Draw green baize.
    fill(0,147,0);
    noStroke();
    rect(width/2,height/2,topEdge.wid, leftEdge.hid);
    
    topEdge.render();
    botEdge.render();
    leftEdge.render();
    rightEdge.render();
    
    for (let i = balls.length-1; i >= 0; i--){
        
        
        
        for (let j = 0; j < balls.length; j++){
            if (i !== j)
            balls[i].checkCol(balls[j]);
        }
        
        if (topEdge.checkHit(balls[i]) ||
            botEdge.checkHit(balls[i]) === true){
            balls[i].vel.y = -balls[i].vel.y;
        }
        
        if (leftEdge.checkHit(balls[i]) ||
            rightEdge.checkHit(balls[i]) === true){
            balls[i].vel.x = -balls[i].vel.x;
        }
        
        balls[i].render();
        balls[i].move();
        
        var sunk = false;
        for (let k = 0; k < pockets.length; k++){
            pockets[k].render();
            if (pockets[k].checkSink(balls[i])){
                balls.splice(i, 1);      
                sunk = true;
            }
            if (sunk === true) break;
        }
        
    }
    
    for (let k = 0; k < pockets.length; k++){
            pockets[k].render();
    }
   
}







