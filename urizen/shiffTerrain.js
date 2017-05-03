// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/IKB1hWWedMk

// Edited by SacrificeProductions

var cols, rows;
var scl = 40;
var w = 1400;
var h = 1000;

var flying = 0;

var terrain = [];

var img;

function preload(){
    img = loadImage("/8bitGrass.png");
}

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h/ scl;

     texture(img);
    
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
    
    //img = loadImage("/8bitGrass.png");
    
    stroke(255);
    //fill(200,200,200, 50);
   
}

function draw() {

  flying -= 0.01;
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }


  background(0);
  translate(0, 500);
  rotateX(-PI/3);
  
  translate(-w/2, -h/2);
  for (var y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }
}