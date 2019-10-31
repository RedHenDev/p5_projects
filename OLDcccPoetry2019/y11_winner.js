
// Sound effect.
let plip;

let poem;

// Array of buttons.
let bus = [];

// Array of sparkles.
let sparkles = [];

// Ratio scalar for window size.
let tSize;

// For checking whether mouse has moved.
let prevX = 0;
let prevY = 0;

function preload(){
    //plip = loadSound('plip.wav');
    plip =   loadSound('https://cccpoetry.github.io/Poetry2018/plip.wav');
    // Plip.wav orig. 'Flipping Through Book.wav' by spookymodem.
    // See https://opengameart.org/content/book-pages
    
    poem = loadImage('y11_p.jpg');
    
}


function setup(){
    createCanvas(   windowWidth,
                    windowHeight);
  
    
    plip.setVolume(0.2);
    plip.play();
    
    // For buttonClass.
    rectMode(CENTER);
    
    // Scalar. Universal.
    tSize = height/10;
    
    // For making buttons.
    let y8Bu = new Button(tSize * 9 + 4,tSize*1.7,88,42);
    y8Bu.text = "home";
    y8Bu.hLink = true;
    y8Bu.link = "index.html";
    y8Bu.fill.x = 0;
    y8Bu.fill.y = 0;
    y8Bu.fill.z = 90 + 1 * 22;
    y8Bu.stroke.x = 255;
    y8Bu.stroke.y = 255;
    y8Bu.stroke.z = 255;
    y8Bu.sRate = 120 + 1 * 10;
        bus.push(y8Bu);
    
}

function draw(){
    background(0,142,172);
    
    // Poetry Day title.
    renderTitle();
    
    // Render Poem.
    image(poem, tSize*1.7, tSize *2.5, width-width/1.5,height-tSize*3);
    
    doSparkles();
    
    for (let i = 0; i < bus.length; i++){
    bus[i].hoverCheck(mouseX,mouseY);
    if (bus[i].visible){
        bus[i].animate();
        bus[i].render();
    }
        else if (bus[i].hover){
            bus[i].render();
        }
    }
    
    
    
    // Has mouse moved?
    prevX = mouseX;
    prevY = mouseY;
    
}

function doSparkles(){
    
    // Mouse sparkles.
    if (mouseX !== prevX && 
        mouseY !== prevY &&
        mouseX < width 
       ){
        sparkles.push(new Sparkle(mouseX,mouseY));
        sparkles[sparkles.length-1].rad = 
            Math.random()*8;
    }
    for (let i = sparkles.length-1; i >= 0; i--){
        sparkles[i].update();
        sparkles[i].render();
        if (sparkles[i].rip)
            sparkles.splice(i,1);
    }
    
    // Blue splodge splodgefall.
    if (frameCount % 44){
        sparkles.push(new Sparkle(Math.random()*tSize*1.4,
                                 -55));
        sparkles[sparkles.length-1].rad = 
            Math.random()*55;
    }
}

function mousePressed(){
    
    for (let i = 0; i < bus.length; i++){
    if (bus[i].checkClick(mouseX,mouseY)){
        bus[i].activate();
    }
    }
    
}

function renderTitle(){
    fill(255);
    stroke(0);
    textSize(tSize);
    //textStyle(NORMAL);
    strokeWeight(8);
    text("Year 11 Winner!", tSize*1.7,tSize);
    
    
    // Quotation.
    fill(   0,
            0,
            Math.sin(frameCount/30)*255);
    noStroke();
//    stroke(255-Math.sin(frameCount/40)*255,
//            255-Math.sin(frameCount/40)*255,
//            255-Math.sin(frameCount/40)*255);
    textSize(tSize/2);
    strokeWeight(1);
    textStyle(ITALIC);
    text("Thomas Neil", tSize*1.7,tSize*2);
    textSize(tSize/3);
    //text("(Emily Dickinson)", tSize*1.7,tSize*3+tSize);
    textStyle(NORMAL);
}

