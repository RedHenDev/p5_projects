// Graphics held in memory.
let iBuff;  
// Image to be loaded etc.
//britishIsles
let sourceImage = 'britishIsles.jpg';
let img;    

// Resolution of rendered image.
let res = 8;
// Brightness threshold (pixel must
// have r+g+b > this value to count).
let thresh = 64;

// Array of vectors.
let vPos = [];

// Make sure our image loads first.
function preload(){
  img = loadImage(sourceImage);
}

function mousePressed(){
  // NB remember to ROUND to integer!
  res = Math.
  round(map(mouseX, 0, width, 32,1));
  thresh = Math.
  round(map(mouseY, 0, height, 0, 260));
  
  processGraphics();
  render();
  console.log("Resolution = " + res);
  console.log("Threshold = " + thresh);
}

function setup() {
  createCanvas(400, 400);
  
  iBuff = createGraphics(width,height);
  
  // Where am I getting 200,100 from?!
  // NB -- in Chrome/on work laptop, values
  // iBuff.width set to 200, and 
  // iBuff.height set to 100.
  iBuff.image(img, 0,0,
              iBuff.width,
              iBuff.height);
  
  iBuff.loadPixels();
  
  processGraphics();
  
  render();
  
}

function processGraphics(){
  
  // First, empty out our array.
  vPos = [];
  
  for (let x = 0; x < iBuff.width; x+=res){
    for (let y = 0; y < iBuff.height; y+=res){
      // 4 because each index has rgba elements.
      let id = (x + y * iBuff.width) * 4;
      let r = iBuff.pixels[id];
      let g = iBuff.pixels[id+1];
      let b = iBuff.pixels[id+2];
      let val = r + g + b;
      if (val < thresh){ 
        jojo = createVector(x, y, val);
        vPos.push(jojo);
        }
    }
  }
}

function render(){
  background(200,0,200);
  
  for (let n = 0; n < vPos.length; n++){
    
    // Use colour value as stroke.
    //fill(vPos[n].z);
    fill(255);
    stroke(0);
    circle(vPos[n].x,vPos[n].y,res);
  }
}