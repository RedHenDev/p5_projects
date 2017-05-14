// Using objects in JavaScript, according to ES6 standard.

// Useful for *inheritance* -- how to use the *extends* keyword.

// p5.js library :) :) :)

function setup(){
    
    createCanvas(640,480);
    background(0,101,202);  
    
    var orb = new BasicOb(400,200);
    
    var ball = new Ball(200, 200, 9);
    
    orb.drawMe();
    ball.drawMe();
} 

function draw(){
    
}







