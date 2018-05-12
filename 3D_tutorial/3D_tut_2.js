

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
    
    //renderMooon();
    
    
}

function renderMooon(){
    
    push();
    
    ambientMaterial(255);
    
    rotateY(radians(epR));
    
    translate(epX+300, epY, epZ);
    
    sphere(42,80,40);
    
        renderMooon2();
    
    pop();
    
}

function renderMooon2(){
    
    push();
    
    specularMaterial(255,0,0);
    
    rotateY(radians(-epR*2));
    
    translate(62, epY, epZ);
    
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









