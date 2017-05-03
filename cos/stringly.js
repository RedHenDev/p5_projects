p5.disableFriendlyErrors = true;    // To help performance.



var font;
//var points = [];
var ob = [];
var at = [];

var ET = false;

var quantum = false;

function preload(){
    font = loadFont("DK Cool Crayon.ttf");
    //font = loadFont('OdinRounded-Light.otf');
};

function setup(){
    
    canvas = createCanvas(800, 400);
    background(72);
    
    
    
    textFont(font);
    
    //textSize(44);
    //noStroke();
    fill(0,255,0);
    //text("Hello, you", 20, 140);
    
    // NB only seems to work with one word at a time, so not 
    // accepting spaces. Also, I don't think it works with
    // .ttf format fonts. Scratch that. Totally does work.
    var cats = font.textToPoints("Hello!", 50, 200, 200);
    var cl = color(0,255,0);
    
     for (var i = 0; i < cats.length; i++){
        ob.push(new particle(cats[i].x, cats[i].y, 1, 1, cl));
        //at.push(new attractor(cats[i].x, cats[i].y, 1));
       // ob[ob.length-1].velocity = p5.random2d();
         ob[ob.length-1].render();
         ob[ob.length-1].origPos.x = cats[i].x;
         ob[ob.length-1].origPos.y = cats[i].y;
    }
   
    
    
};

function mouseMoved(){
    for (var i = 0; i < ob.length; i++){
        var mp = createVector(mouseX, mouseY);
        var dir = p5.Vector.sub(ob[i].pos,mp);
        if (dir.mag() < 10) ob[i].acceleration.add(dir.setMag(0.01*dir.mag()));
    }
};

function mouseClicked(){
    ET = !ET;
    
    if (!ET) return;
    
    for (var i = 0; i < ob.length; i++){
        ob[i].velocity.mult(0); // Cancel out velocity.
        ob[i].acceleration.mult(0); // Cancel out acceleration.
        var dir = p5.Vector.sub(ob[i].origPos, ob[i].pos); // Direction towards orig pos.
        ob[i].acceleration.add(dir.setMag(dir.mag()*0.1));
    }   
};

function draw(){
    background(72);
    
    for (var i = 0; i < ob.length; i++){
        //at[i].attract(ob[i]);
        ob[i].update();
        ob[i].render("earthquaking",255);
        ob[i].acceleration.mult(0);
        
        var mes = createVector();
        mes = p5.Vector.sub(ob[i].origPos, ob[i].pos);
        
        if (ET && mes.mag() > 0.1 && mes.mag() < 2) { ob[i].velocity.mult(0); 
                                                console.log("Found home!");
                                                ob[i].acceleration.mult(0);}
        
    }
};