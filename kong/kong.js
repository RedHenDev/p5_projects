
var kongImg;
var kPos;
var kSize;

var mousePrev;

var mLeft = false;
var mRight = false;
var mJump = false;
var mDown = false;

var kSpeed;
var kAcc;
var kTopSpeed;

function preload(){
    
    kongImg = loadImage('king_kong.jpg');
    
}

function setup(){
    
    createCanvas(window.innerWidth, window.innerHeight);
    
    kPos = createVector(width/2, height/2);
    kSize = createVector(140,100);
    
    mousePrev = createVector(mouseX, mouseY);
    
    kSpeed = 4;
    kAcc = 1;
    kTopSpeed = 42;
}


function draw(){
    
    if (mRight) kPos.x += kSpeed;
    if (mLeft) kPos.x -= kSpeed;
    if (mDown) kPos.y += kSpeed;
    if (mJump) kPos.y -= kSpeed;
    
    kPos.x = constrain(kPos.x, 0, width-kSize.x);
    kPos.y = constrain(kPos.y, 0, height-kSize.y);
    
    background(0,101,222);
    
    image(kongImg, kPos.x, kPos.y, kSize.x, kSize.y);
    
    mousePrev.x = mouseX;
    mousePrev.y = mouseY;
    
    //if (kSpeed > 0) kSpeed *= 0.9;
    
}

function mouseMoved(){
    
    //if (kSpeed < kTopSpeed) kSpeed += kAcc;
    
    mRight = false;
    mLeft = false;
    mDown = false;
    mJump = false;
    
    if (Math.abs(mouseX-mousePrev.x) > Math.abs(mouseY-mousePrev.y))
    {
    if (mouseX > mousePrev.x) { mRight = true;  }
    if (mouseX < mousePrev.x) { mLeft = true;  }
    }
    else
    
    {
    if (mouseY < mousePrev.y) { mJump = true;   }
    if (mouseY > mousePrev.y) { mDown = true;    }
    }
    
}