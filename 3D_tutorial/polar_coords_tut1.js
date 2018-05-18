
// p5.js library.

let x = 112;
let y = 0;
let z = 0;
let theta = 0;
let phi = 0
let r = 112;

let tilt;

let oX = 0;
let oY = 0;
let oZ = 0;

function setup(){
    
    createCanvas(512,512, WEBGL);
    
    background(200,13,44);
    
    pointLight( 255,255,255,
                0,0,300);
    
    theta   = Math.acos(0/r);
    phi     = Math.atan2(0,112);
    
    tilt = PI/9;
    
}

function findXY(){
    
    // Polar-co-ordinate formula!
    
    x = oX + r * 
        Math.cos(radians(theta));
    
    y = oY + r *
        Math.sin(radians(theta));
    
}

function findXYZ(){
    
    // Y-axis orbit, increase theta.
    // X-axis orbit, increase phi.
    // Z-axis?
    
    x = oX + r * Math.sin(radians(theta)) *
        Math.cos(radians(phi));
    
    y = oY + r * Math.sin(tilt+radians(theta)) *
        Math.sin(tilt+ radians(phi));
    
    z = oZ + r * Math.cos(radians(theta));
    
}


function draw(){
    
    //background(200,13,44);
    background(0);
    
//    oX = mouseX - width/2;
//    oY = mouseY - height/2;
    
    r = map(mouseY, 0, height,
           112, 224);
    
    theta++;
    //phi++;
    
    //findXY();
    findXYZ();
    strokeWeight(7);
    stroke(0,255,9);
    line(oX, oY, oZ,
        x, y, z);   
    
    push();
        noStroke();
        translate(oX, oY, oZ);
        specularMaterial(0,255,255);
        sphere(76, 240, 160);
    pop();
    
    push();
        stroke(255);
        strokeWeight(1);
        //rotateY(radians(90));
        translate(x,y,z)
        ambientMaterial(255);
        sphere(24);
    pop();
    
    
}

function mouseDragged(){
    
    //theta++;
    
    //r += Math.sin(theta/2);
}







