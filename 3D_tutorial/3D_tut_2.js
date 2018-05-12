

let epX = 0;
let epY = 0;
let epZ = 0;

let epR = 0;

let theta = 0;
let phi = 0;

// Vector to moon.
let v;
// Vector to moon moon.
let vM;

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
    vM = p5.Vector.random3D();
    vM.mult(62);
}



function draw(){
    
    background(201,32,12);
    
    pointLight( 255,255,255,
                mouseX - width/2,
                mouseY - height/2,
                300);
    
//    pointLight( 255,255,255,
//                0,
//                0,
//                0);
    
    epR += 2;
    epZ = map(mouseY, 0, height, 0, -100);
    
    renderEggPlanet();
}

function renderMooon(){
    
    push();
    
    ambientMaterial(255);
    
//    let v2 = createVector(1,0,1);
//    let p = v.cross(v2);
//    rotate(radians(frameCount*2), p);
    
    let r = 300;
    
    theta = Math.atan2(v.y,v.x);
    //Restricts -180,180
    phi = 
    Math.acos(v.z/Math.sqrt(
        v.x*v.x+v.y*v.y+v.z*v.z));
    //Restricts 0,180
    
    rotateZ(theta);
    rotateY(phi);
    
    translate(v.x, v.y, v.z);
    
    sphere(42,80,40);
    
        //renderMooon2();
    
    pop(); 
    
}

function renderMooon2(){
    
    push();
    
    specularMaterial(255,0,0);
    
    let v3 = createVector(1,0,1);
    let pp = vM.cross(v3);
    rotate(-radians(frameCount*5), pp);
    
    translate(vM.x, vM.y, vM.z);
    
    sphere(12,80,40);
    
    pop();
}

function renderEggPlanet(){
    
    push();
    
    //texture(rhTex);
    specularMaterial(0,255,0);
    //ambientMaterial(0,255,0);
    
    translate(epX, epY, epZ);
    //rotateY(radians(epR/2));
    sphere(200,240,160);
        
        renderMooon();
    
    pop();  
}
