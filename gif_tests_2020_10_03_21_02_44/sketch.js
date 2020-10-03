/*

Fantastic resource -- see bottom of
page for .gif info: https://p5js.org/reference/#/p5.Image

Bulbasaur sourced from pixabay.com:
[Pixabay license]
https://pixabay.com/illustrations/pixel-bulbasaur-pokemon-8-bit-game-3316924

Oct 3rd 2020
Red Hen

*/

// Our test images (gif).
let blub;
let miniBlub;
let bigBlub;
let oldSkool;
let bulb;

function preload(){
  // If we want to be able to change
  // speeds of .gifs independently,
  // even if same image, then we must
  // load multiple times.
  // A workaround might be to use
  // setCurrentFrame() to manually create
  // sense of animation. Hopefully
  // frame indexing works differently
  // to the delay() function so as to
  // permit this workaround.
  
  blub = loadImage("https://res.cloudinary.com/djox8xzey/image/upload/v1601751392/blub_tvjxt7.gif");
  
  miniBlub = loadImage("https://res.cloudinary.com/djox8xzey/image/upload/v1601751392/blub_tvjxt7.gif");
  
  oldSkool = loadImage("https://res.cloudinary.com/djox8xzey/image/upload/v1601757000/old-school-4525344__340_xnajde.png");
  
  bulb = loadImage("https://res.cloudinary.com/djox8xzey/image/upload/v1601757000/pixel-3316924__340_ir0uuo.png");
	
	bigBlub = loadImage("https://res.cloudinary.com/djox8xzey/image/upload/v1601758903/blub_r_vc52km.gif");
}

function setup() {
  createCanvas(640, 480);
  
  //noCursor();
  
  posX = mouseX;
	bPos = 0;
}

function mousePressed(){
  // Pause .gif.
  miniBlub.pause();
}

function mouseReleased(){
  // Play .gif - i.e. after pause.
  miniBlub.play();
}

// Positions of crawling blubs.
let posX;
let bPos;

function draw() {
  background(252);
  
  //image(oldSkool,0,height/2-64);
  image(bulb,300,142);
  
  // Protect from crashing if user
  // takes mouse beyond canvas area.
  if (mouseX>width) mouseX = width;
  if (mouseY>height) mouseY = height;
  
  // Map delay between frames from mouseX.
  let d = map(mouseX,0,width,
              1000,100);
  
  miniBlub.delay(444+d);
  image(miniBlub,posX,mouseY,32,32);
  fill(0,0,200,32);
  circle(posX+18,mouseY+16,32);
  
  // Match movement to frame.
  // I.e. the frame in which a
  // locomotive force is applied.
  if(miniBlub.getCurrentFrame()===0){
    posX-=1;
    if (posX<0-32)
      posX = width;
  }
	if (bigBlub.getCurrentFrame()==0){
		bPos+=0.5;
		if (bPos>width+1)
			bPos = -85;
	}
	image(bigBlub,bPos,84,84,84);
  
  // Set delay (ms) between all
  // frames.
  // Use second param to set delay
  // for a particular indexed frame.
  blub.delay(d);
  
  image(blub,10,10);
  textSize(18);
  fill(142,0,142);
  text("x2 frames guide - 1000ms slowest delay("+Math.round(d)+"), 100ms for fastest.", 72,50);
  
  textSize(24);
  fill(0); text("MouseX changes speed; click to pause animation.",34, height-12);
}