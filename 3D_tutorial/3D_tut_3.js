

let epX = 0;
let epY = 0;
let epZ = 0;

let epR = 0;

//let rhTex;


function setup(){
    
    createCanvas(windowWidth,
                windowHeight, WEBGL);
    
    background(201,32,12);
    
//    rhTex = loadImage("RedHenIconAlpha512512.png");
    
}



function draw(){
    
    background(201,32,12);
    
    checkInput();
    
    // Zoom.
    epZ = map(mouseY, 0, height, 0, -1000);
    
    pointLight( 255,255,255,
                mouseX - width/2,
                mouseY - height/2,
                400);
    
    solarSystem();

}

function checkInput(){
    
    if (keyIsDown(LEFT_ARROW) ||
       keyIsDown(65))
        epX += 10;

    if (keyIsDown(RIGHT_ARROW) ||
       keyIsDown(68))
        epX -= 10;
    
    if (keyIsDown(UP_ARROW) ||
       keyIsDown(87))
        epY += 10;

    if (keyIsDown(DOWN_ARROW) ||
       keyIsDown(83))
        epY -= 10;
    
}


function solarSystem(){
    // Orbit rotation.
    epR += 2;
    
    translate(epX, epY, epZ);
    
   
    // Moon!
    renderEggPlanet(300,0,0,
                    42, 2,
                    1,
                   false);
    
    // Satellite! Twin!
    renderEggPlanet(-432,0,0,
                    42, 3,
                    -1.3,
                   true);
    
    // Central egg planet!
    renderEggPlanet(0,0,0,
                   200, 1,
                   0,
                   false);
}

function renderEggPlanet
    (x,y,z,r,c,oS,
     sub){
     
    push();    
        
    //texture(rhTex);
    
    //stroke(255);
    //noStroke();
    
    rotateZ(radians(epR)*oS);
        
    translate(x, y, z);
    
        // If sub-moon...
        if (sub===true)
        renderEggPlanet(-70,0,0,
                    12, 2,
                    4);
        
        // Set material type.
         if (c === 1)
    specularMaterial(0,0,255,132);
    else if (c === 2)
    ambientMaterial(0,255,0);
    else if (c === 3)
    normalMaterial();
        
        // Draw our geometry.
    sphere(r, 24, 16);
    
    pop();
        
}











