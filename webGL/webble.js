p5.disableFriendlyErrors = true;    // To help performance.

//******************************
// Textures.
var texRH;
var texMR; 

var aY = 0;
var posZ = 0;
var posX = 0;
var moveSP = 1;
//var storePOS = width/2;
//******************************

var pA = [];    // Array of particles.
var numP = 1000; // Number of particles created in pool.

// Mouse positions at end of previous draw() loop.
var prevMY;
var prevMY;

// Light source.
var solis;

var yawRot = -3;
var pitchRot = 1;
var forMov = 0;
var speedMov = 4;
var deltaX = 0;
var deltaY = 0;


function preload(){
    
    texRH = loadImage("RedHenIcon Alpha 512 512.png");
    texMR = loadImage("matrixRain.png");
}



function setup(){
    
    createCanvas(600,600, WEBGL);
    //background(72);
    background(0,111,222);  // A nice sky blue.
   
    camera(0,0,700);
    
    texture(texMR);
    
    // NB we only have to place this in the scene here,
    // and don't have to 'redraw' so to speak, in the draw().
    //pointLight(255, 255, 255, 300, -20, 0);
    //solis = directionalLight(100,100,0, 12, 45,0);
    
    for (var i = 0; i < numP; i++){
        //var rPos = p5.Vector.random3D();
        var rPos = createVector(0,0,0);
        pA.push(new particle(rPos.x, rPos.y, rPos.z));
        pA[i].setActive(false);
        console.log("Particle " + i + " created :D");
    }
    
     for (var i = 0; i < 42; i++){
        var rPos = p5.Vector.random3D();
         rPos.setMag(Math.floor(random(1,100)));
         if (rPos.y > 40) rPos.y = 0;
        //pA.push(new particle(rPos.x, rPos.y, rPos.z+300));
        pA[i].setActive(true);
         pA[i].pos = createVector(rPos.x, rPos.y, rPos.z+300);
         console.log("Particle " + i + " randomly placed ;)");
    }
    
    
    prevMY = 0;
    prevMX = 0;
}

function touchMoved(){
    return false;
}

function mouseClicked(){
    for (var i = 0; i < pA.length; i++){
    if (pA[i].isActive() === false){
        pA[i].setActive(true);
        pA[i].pos.x = Math.floor(random(-110,90)) + 10;
        pA[i].pos.y = Math.floor(random(-110,0)) + 10;;
        pA[i].pos.z = Math.floor(random(-110,90)) + 310;;
        pA[i].size.x = random(0.1,10);
       // pA[i].acc.y = 42;  // A little down force.
        console.log("New box ordered!");
        break;}
    }
    return false;
}



function draw(){
    
    //background(72);
      background(0,111,222, 22);  // A nice sky blue.
    
    deltaX = (mouseX - prevMX)/100;
    //deltaY = mouseY - prevMY;
    
    //if (mouseIsPressed) forMov += speedMov;
  
    //  translate(0,0, 300 + forMov);
   // rotateY(radians(yawRot += deltaX));
    
    //rotateX(radians(pitchRot += deltaY));
 
  //rotateX(deltaY+=0.01);
    
        //fill(0,255,0,200);
        //box(100,100,100);
    
    for (var i = 0; i < pA.length; i++){
        
        if (pA[i].frozen === false){
        pA[i].update();}
        
        if (pA[i].visible === true){
        pA[i].render();}
    }
    
    prevMX = mouseX;
    prevMY = mouseY;
    
    /*
    if (mouseX < width){
        translate(mouseY-80-height/2,0,mouseX-80-width/2);
        storePOS = mouseX-80-width/2;
    }else translate(mouseY-80-height/2,0,storePOS);
    */
    
    //******
    //******
    
    //specularMaterial(255,255,255, 127);
    //texture(texRH);
    
    //rotateY(aY);
    //aY+=0.01;
    //sphere(42);
    
    //******
    //******
}