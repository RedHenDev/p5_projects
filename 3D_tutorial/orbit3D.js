

let epX = 0;
let epY = 0;
let epZ = 0;

let epR = 0;

let theta = 0;
let phi = 0;
let radius = 0;

// Vector to moon.
let v;

let rhTex;

function setup(){
    
    createCanvas(windowWidth,
                windowHeight, WEBGL);
    
    background(201,32,12);
    
    rhTex = loadImage("RedHenIconAlpha512512.png");
    
    // Random vectors for position of
    // moon and moon-moon.
    v = p5.Vector.random3D();
    v.mult(300);
    v = createVector(300,0,0);

    radius = 300;
    theta  = Math.acos(v.z / radius);
    phi    = Math.atan2(v.y, v.x);
    
}



function draw(){
    
    background(201,32,12);
    
    pointLight( 255,255,255,
                mouseX - width/2,
                mouseY - height/2,
                400);
    
    epR += 2;
    epZ = map(mouseY, 0, height, 0, -1000);
    
    renderEggPlanet();
    renderMooon();
}

function renderMooon(){
    
    push();
    
    ambientMaterial(255);
    
    rotateZ(PI/2);
    rotateZ(PI/9);
    
    theta += 0.01;
    //phi += 0.01;
    v.x = epX + radius * Math.sin(theta) * Math.cos(phi);
    v.y = epY + radius * Math.sin(theta) * Math.sin(phi);
    v.z = epZ + radius * Math.cos(theta);
    
    translate(v.x, v.y, v.z);
    
    sphere(42,80,40);
    
    pop(); 
    
}

function renderEggPlanet(){
    
    push();
    
    texture(rhTex);
    //specularMaterial(0,255,0);
    //ambientMaterial(0,255,0);
    
    translate(epX, epY, epZ);
    rotateY(-radians(epR));
    sphere(200,240,160);
    
    pop();  
}
