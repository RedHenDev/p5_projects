

let epX = 0;
let epY = 0;
let epZ = 0;

let epR = 0;

let rhTex;

function setup(){
    
    createCanvas(windowWidth,
                windowHeight, WEBGL);
    
    background(201,32,12);
    
    rhTex = loadImage("RedHenIconAlpha512512.png");
    
}



function draw(){
    
    background(201,32,12);
    
    epR += 0.1;
    epZ = map(mouseY, 0, height, 0, -100);
    
    pointLight( 255,255,255,
                mouseX - width/2,
                mouseY - height/2,
                400);
    
    renderEggPlanet();

}


function renderEggPlanet(){
    
    //texture(rhTex);
    
    //stroke(255);
    noStroke();
    
    //ambientMaterial(0,255,0);
    specularMaterial(0,255,0);
    
    translate(epX, epY, epZ);
    rotateY(radians(epR));
    sphere(200, 240, 120);
    
}











