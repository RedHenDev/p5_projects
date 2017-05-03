// Here we aim to make a 3D terrain using a grid of voxels.
p5.disableFriendlyErrors = true;    // To help performance.

var BACKGROUND_COLOUR;

var theta;
var oX ;
var oY;
var oZ;

var xP = [];
var zP = [];
//var pZ = [];      // Array of Perlin heights.
var pZ;
const pSeed = 13;   // Seed for Perlin noise.
const pRange = 1433;

var moveF = 1;

var thisFrame;
var lastFrame;

var img;

var theNurtle; // Our first nurtle object!

function preload(){
    img = loadImage("/8bitGrass.png");
}

function setup(){
    createCanvas(windowWidth, windowHeight, WEBGL);
    
    BACKGROUND_COLOUR = color(0,122,222);
    
    background(BACKGROUND_COLOUR);
    
    theta = 0;
    
    oX = 0;
    oY = 0;
    oZ = 0;
    
    loadGrid(8,8,300);
    
    // Now we know our grid size, we can set the position of the nurtle.
    theNurtle = new NurtleObj();
    theNurtle.pos.x = 4;
    theNurtle.pos.z = 4;
    for (let m = 0; m < theNurtle.tailSegments.length; m++){
        theNurtle.tailSegments[m].x = theNurtle.pos.x;
        theNurtle.tailSegments[m].y = theNurtle.pos.z+(m+1);
    }
    // NB pos.y is determined by height of voxel nurtle happens to be on.
    
    specularMaterial(0,255,0);
    
    noiseSeed(pSeed);

    //texture(img);
  
    lastFrame = 0;
    thisFrame = millis();
    
    mouseX = width/2;
    mouseY = height/2;
   
}

//function mouseDragged(){
//    moveF+=1;
//}

function loadGrid(_rows, _cols, _scl){
    
    for (let i = 1; i <= _rows; i++){
        xP[i] = [];
        zP[i] = [];
        for (let j = 1; j <= _cols; j++){
            
            xP[i][j] = oX+(_scl*j);
            zP[i][j] = oZ+(_scl*i);
         
        }
       
    }
   
    
}


function createGrid(_rows, _cols, _scl){
    
    for (let i = 1; i <= _rows; i++){
          
        for (let j = 1; j <= _cols; j++){
            push();
       
            if (frameCount < 2);
            pZ = (noise(i/_rows+moveF,j/_cols)*pRange);
           
            translate(xP[i][j], oY-(pZ/2)+400, zP[i][j]);
            
            specularMaterial(0,255,0);
            texture(img);
            
            box(_scl,pZ,_scl);
            
            
            if (theNurtle.pos.x === j && theNurtle.pos.z === i)
            {
                theNurtle.render(0, -pZ, 0, 0);
            } 
            
            for (var k = theNurtle.tailSegments.length-1; k >= 0; k--){
            if (    theNurtle.tailSegments[k].x === j &&
                    theNurtle.tailSegments[k].y === i)
                
                theNurtle.render(0, -pZ, 0, k+1);
                //break;
                
            }
            
            pop();
        }
       
    }
   
    
}

function keyPressed(){
    if (keyCode === UP_ARROW)
    {if (theNurtle.dir !== "down") theNurtle.dir = "up";}
    else if (keyCode === DOWN_ARROW)
    {if (theNurtle.dir !== "up") theNurtle.dir = "down";} 
    else if (keyCode === LEFT_ARROW)
    {if (theNurtle.dir !== "right") theNurtle.dir = "left"; }
    else if (keyCode === RIGHT_ARROW)
       { if (theNurtle.dir !== "left") theNurtle.dir = "right"; }
    
    return false;   // Prevents unwanted window scrolling.
    
}


function draw(){
    thisFrame = millis()/1000.0;
    
    background(BACKGROUND_COLOUR);
    
    pointLight(101, 255, 101, mouseX-width/2, 1000, -100+mouseY);
    
    camera(oX+width+300, oY+1300, oZ+2800, oX, oY, oZ, oX, 1, oZ);
    
    rotateX(PI/3.5);
    
    
     // Move the nurtle!
    if (frameCount % 4 === 0){ // Every second move...
        // Determine movement direction randomly...
        
        // Cycle through tail segments and adjust placings.
        for (var l = theNurtle.tailSegments.length-1; l > 0; l--){
            theNurtle.tailSegments[l].x = theNurtle.tailSegments[l-1].x;  
            theNurtle.tailSegments[l].y = theNurtle.tailSegments[l-1].y; 
        }
        // Lastly, first tail segment must be changed to follow head.
        theNurtle.tailSegments[0].x = theNurtle.pos.x;
        theNurtle.tailSegments[0].y = theNurtle.pos.z;
        
        //let whichWay = noise(moveF,moveF);
//        let whichWay = Math.random();
//        
//        // Make sure that snurtle cannot back into its own body.
//        if (whichWay <= 0.2 && theNurtle.dir !== "left") theNurtle.dir = "right";
//            else if (whichWay >= 0.8 && theNurtle.dir !== "right") theNurtle.dir = "left";
//            else if (whichWay <= 0.5 && theNurtle.dir !== "up") theNurtle.dir = "down";
//            else if (whichWay > 0.5 && theNurtle.dir !== "down") theNurtle.dir = "up";
        
            if (theNurtle.dir === "right") theNurtle.pos.x++;
            else if (theNurtle.dir === "left") theNurtle.pos.x--;
            else if (theNurtle.dir === "down") theNurtle.pos.z++;
            else if (theNurtle.dir === "up") theNurtle.pos.z--;
        
        // Keep the snurtle on grid (8x8) at all times (wrap-around).
        if (theNurtle.pos.x > 8) theNurtle.pos.x = 1;
        if (theNurtle.pos.x < 1) theNurtle.pos.x = 8;
        if (theNurtle.pos.z > 8) theNurtle.pos.z = 1;
        if (theNurtle.pos.z < 1) theNurtle.pos.z = 8;
        
    }
    
    // 8x8 grid, scale of each voxel is 300.
    createGrid(8, 8, 300);
    
    // Move Perlin noise accordin to framerate.
    moveF += -0.2 * (thisFrame-lastFrame);
    
    var fps = frameRate();
    
    if (frameCount > 10){
        console.log(fps.toFixed(0));
    }
    
    lastFrame = thisFrame;
    
  
}