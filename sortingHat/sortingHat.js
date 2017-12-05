
let imHat;
let imCest;
let imLogo;

let imG;
let imH;
let imR;
let imS;

let sx;
let sy;

let inputBox;
let button;
let buttonR;

let rnd = 0;

function preload(){
    
    // Load images here.
    imHat = loadImage("media/hat.png");
    imCrest = loadImage("media/crest.jpg");
    imLogo = loadImage("media/HPlogo.png");
    imG = loadImage("media/gryffindor.jpg");
    imH = loadImage("media/hufflepuff.jpg");
    imR = loadImage("media/ravenclaw.jpg");
    imS = loadImage("media/slytherin.jpg");
}


function setup(){
    createCanvas(windowWidth, windowHeight);
    background(0);
    
    imageMode(CENTER);
    
    image(imCrest, 100, height/2);
    image(imLogo, width/2, 100);
    
    sx = width/4;
    sy = sx*1.2;
    
    setupDOM();
}

function setupDOM(){
    
    inputBox = createInput("Enter name");
    inputBox.position(42,height/2);
    inputBox.size(100,50);
    
    button = createButton("SORT");
    button.position(164, height/2);
    button.size(50*1.168,54);
    button.mousePressed(doSort);
    
//    buttonR = createButton("RESET");
//    buttonR.position(164, height/2 + 64);
//    buttonR.size(50*1.168,54);
//    buttonR.mousePressed(doReset);
    
    function doSort(){
        if (rnd != 0) { doReset(); return;}
        rnd = Math.random()*4;
        rnd = Math.floor(rnd) + 1;  
    }
    
    function doReset(){
        rnd = 0;
    }
    
}

function displayBadge(){
    push();
        translate(width/2, height/2);
        rotate(Math.sin(frameCount/32));
        if (rnd===1){
            image(imH, 0,0, sx, sy);
        }
        else if (rnd===2){
            image(imG, 0,0, sx, sy);
        }
        else if (rnd===3){
            image(imR, 0,0, sx, sy);
        }
        else if(rnd===4){
            image(imS, 0,0, sx,sy)
        }
    pop();
}

function displayChoice(){
    textSize(64);
        fill(255);
        text(inputBox.value() + " ",
             264,height/2+50);
    
    // Extra detail.
//    fill(0,0,242);
//    text("Slushy",
//             264,height/2+150);
}

function draw(){
    
    background(0);
    
    // Display crest.
    push();
        translate(width/2, height/2);
        image(imCrest, 0,0, width/3, width/3);
    pop();
    // Display hat.
    push();
        translate(width*0.75, height/2);
        image(imHat, 0,0, width/3, width/3);
    pop();
    
    if (rnd!==0){
        displayBadge();
        displayChoice();
    }
    
    // Dislay HP logo.
    push();
        translate(width/5, 140);
        rotate(Math.sin(frameCount/100)*0.2);
        image(imLogo, 0,0);
    pop();
  
}