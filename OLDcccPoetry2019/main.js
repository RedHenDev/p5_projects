
// Sound effect.
let plip;

// Banner image.
let banner;

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
    
    // https://nationalpoetryday.co.uk/
    // Should hyperlink to that site!
    banner = loadImage('https://cccpoetry.github.io/cccPoetry2019/NPD_banner_2019.png');
}

let testBu;


function setup(){
    createCanvas(   windowWidth,
                    windowHeight);
  
    
    plip.setVolume(0.2);
    plip.play();
    
    // For buttonClass.
    rectMode(CENTER);
    
    // Scalar. Universal.
    tSize = height/10;
    
    let y8Bu;
    
    for (let i = 0; i < 5; i++){
    y8Bu = new Button(44 + tSize * 1.7 + i * 100,height/2+42,88,42);
    y8Bu.text = "Y" + (i+7) + " winner";
    y8Bu.hLink = true;
    y8Bu.link = "y" + (i+7) + "_win.html";
    y8Bu.fill.x = 0;
    y8Bu.fill.y = 0;
    y8Bu.fill.z = 90 + i * 22;
    y8Bu.stroke.x = 255;
    y8Bu.stroke.y = 255;
    y8Bu.stroke.z = 255;
    y8Bu.sRate = 120 + i * 10;
        bus.push(y8Bu);
    }
    
    // Invisible banner button.
    imageMode(CENTER);
    y8Bu = new Button(tSize*1.7+(width/1.7)/2,height-height/6-12,
                     width/1.7,height/3);
    
    y8Bu.hLink = true;
    y8Bu.visible = false;
    y8Bu.text = "";
    y8Bu.alpha = 169;
    y8Bu.fill.x = 0;
    y8Bu.fill.y = 255;
    y8Bu.fill.z = 255;
    bus.push(y8Bu);
    
}

function draw(){
    background(0,0,222);
  
    // Poetry Day banner.
    image(banner, tSize*1.7+(width/1.7)/2,height-height/6-12,width/1.7,height/3);
    
    // Poetry Day title.
    renderTitle();
    
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
        sparkles.push(new Sparkle(width - 
                                  Math.random()*width/4,
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
    text("National Poetry Day\ncompetition 2019", tSize*1.7,tSize);
    
    
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
    text("'The poetry of TRUTH...'", tSize*1.7,tSize*3);
    textSize(tSize/3);
    //text("(Emily Dickinson)", tSize*1.7,tSize*3+tSize);
    textStyle(NORMAL);
}

