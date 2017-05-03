p5.disableFriendlyErrors = true;    // To help performance.
/*

Use one of the following in HTML in order to improve performance.
The former seems to work best...

<meta name="viewport" content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width">
    
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
*/


var goButton;
var restartButton;
var drawMagsButton;
var mouseRepulseB;

var particles = [];
var gravMags = [];
var drawMags = true;

var alphaSlider;
var repulsion = false;
var biPolar = false;

var showParticles = false;

const myWIDTH = 480;
const myHEIGHT = 480;

const BGCOLOUR = 248;

/*
function preload(){
    for (var i = 0; i < 444; i++){ 
       particles[i] = new particle(random(0,WIDTH), random(0,HEIGHT),1,1,random(0,255));
        var newV = createVector(random(-3,3),random(-3,3));
        //particles[i].velocity = newV;
        //particles[i].acceleration = newV;
        particles[i].maxV = 3.2;
   }
 
    //for (var j = 0; j < 3; j++){ 
    //gravMags.push(new attractor(random(0,windowWidth), random(0,windowHeight), random(1,3)));
    //}
}
*/

function preload(){
   
    alphaSlider = createSlider(4,255,22);
    //setupNew();
}

function setup() {

    canvas = createCanvas(600,600);   
    //background(0,111,222);
    //background(0);
    background(BGCOLOUR);
    
    showParticlesB = createButton('View mode');
    repulsionB = createButton('Toggle repulsion');
    biPolarB = createButton('BiPolaroid');
    restartButton = createButton('Remove forces');
    drawMagsButton = createButton('Attractors visible?');
    //alphaSlider = createSlider(1,255,22);
    repulsionB.style("background-color", color(0,255,0,100));
    drawMagsButton.style("background-color", color(0,255,0,100));
    biPolarB.style("background-color", color(255,0,0,100));
    //mouseRepulseB = createButton('') // Co-ordinate with touches?
    
    strokeWeight(1);
    
    //canvas.touchMoved(thenThereWasGravity);
    canvas.touchStarted(thenThereWasGravity);
    repulsionB.mouseClicked(toggle_repulsion);
    showParticlesB.mouseClicked(toggle_showParticles);
    restartButton.mouseClicked(removeAttractors);
    drawMagsButton.mouseClicked(toggle_drawMags);
    biPolarB.mouseClicked(set_biPolar);
    
    //alphaSlider.position(2, 64);
    //repulsionB.position(2, 2);
    //showParticlesB.position(2, 32);
    var bS = 123;
    repulsionB.size(bS, bS);
    showParticlesB.size(bS, bS);
    restartButton.size(bS, bS);
    drawMagsButton.size(bS, bS);
    biPolarB.size(bS,bS);
    
//    goButton = createButton('GO! (for best results use in Chrome)');
//    goButton.size(200,200);
//    goButton.position((width/2)-100,(height/2)-100);
//    goButton.mouseClicked(fullscreenON);
    // Note this will trigger resizeCanvas() in displaySetup.js.
     setupNew();
    
}

function set_biPolar(){
    biPolar = !biPolar;
    
    if (biPolar)biPolarB.style("background-color", color(0,255,0,100));              
    else biPolarB.style("background-color", color(255,0,0,100));
}


function toggle_drawMags(){
    drawMags = !drawMags;
    
    if (drawMags){
         drawMagsButton.style("background-color", color(0,255,0,100));
    } else  drawMagsButton.style("background-color", color(255,0,0,100));
    
    if (!drawMags && !showParticles)
    {
        // Since we want the attractors to vanish,
        // but without spoiling the image...
        for (var k = 0; k < gravMags.length; k++){ 
        // The attractors' render() will draw them
        // as grey.
            gravMags[k].render();
    }
    }
}

function toggle_repulsion(){
    repulsion = !repulsion;
    
    if (repulsion)repulsionB.style("background-color", color(255,0,0,100));
                   
    else repulsionB.style("background-color", color(0,255,0,100));
}

function toggle_showParticles(){
    showParticles = !showParticles;
    if (showParticles) {alphaSlider.value(255); strokeWeight(7); noFill();
                      }
    if (!showParticles) {alphaSlider.value(2); strokeWeight(1); fill(0); background(BGCOLOUR);
               }
}



function setupNew(){
   background(BGCOLOUR);
    toggle_showParticles();
   for (var i = 0; i < 888; i++){ 
       particles.push(new particle(random(0,600), random(0,600),1,1,0));
        var newV = createVector(random(-3,3),random(-3,3));
        particles[i].velocity = newV;
        //particles[i].acceleration = newV;
        particles[i].maxV = 3.2;
   }
    
    
}

function thenThereWasGravity(){
    
    if (repulsion)
    gravMags.push(new attractor(mouseX, mouseY, -1));
    else gravMags.push(new attractor(mouseX, mouseY, 3));
    
    if (biPolar) gravMags[gravMags.length-1].type = "biPolar";
    if (drawMags) gravMags[gravMags.length-1].render();
}

function removeAttractors(){
    for (var i = gravMags.length; i >= 0 ; i--){
        gravMags.pop();
    }
}

function draw() {
    //background(0,111,222);
    if (showParticles)
    background(0);
    
    if (drawMags){
    for (var k = 0; k < gravMags.length; k++){ 
        gravMags[k].render();
    }}
    
    for (var i = 0; i < particles.length; i++){ 
        
        for (var j = 0; j < gravMags.length; j++) {
            gravMags[j].attract(particles[i]);
            //console.log("adding attraction force.");
        }
        
        
        particles[i].update();
        var alphaV = alphaSlider.value();
        particles[i].render(alphaV);
   }
    
    
}

//function fullscreenON(){
//    // Note this will trigger resizeCanvas() in windowResized (displaySetup.js).
//   // fullscreen(canvas);
//    //goButton.remove();  
//    
//   // setupNew();
//}

