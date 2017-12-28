// For performance.
p5.disableFriendlyErrors = true;

let rotY = 0;
let rotX = 0;
let stars = [];
let starNum = 400;

let tf;

let fighters = [];

let drive = false;

function setup(){
  createCanvas(windowWidth,windowHeight, WEBGL);

  ambientLight(100);
  
  for (let i = 0; i < starNum; i++){
    
    let rX = random(-width/2, width/2);
    let rY = random(-width/2, width/2);
    let rZ = random(-width/2, width/2);
    
    stars[i] = new Star(rX, rY, rZ, 1);
    
    if (i< 12)
    fighters[i] = new TieFighter(rX, rY, rZ, 10);
  }
  
  tf = new TieFighter(0,0,0,44);
  
}

function touchStarted(){
    //drive = true; 
}

function touchEnded(){
    drive = !drive;
}

function mousePressed(){
    fighters[0].forward(1);
    
}

function draw(){
  background(0);
  
  //starWars();
  
  //pointLight(width/3, height, 100);
  //ambientMaterial(255);
  
    if (!drive){   
        rotX += Math.sin(frameCount/200);
        rotY += Math.cos(frameCount/200);
        
    }
    
    
    if (!drive){
        rotateX(radians(-rotX));
        rotateY(radians(rotY));
    }
  
    //tf.rZ += 1;
    if (drive){
        // Mouse controls for rotation of scene.
    rotX = map(mouseY, 0, height, 360, 0);
    rotY = map(mouseX, 0, width, 360,0);
    tf.rY = rotY;
    tf.rX = rotX;
    }
      
    // Draw the stars.
  starWars();
  
  tf.render();
  
    if (drive) tf.forward(3);
    
  for(let i = 0; i < fighters.length; i++){
    fighters[i].render();
  }
  
}

function starWars(){
 
    for (let i = 0; i < stars.length; i++){
      stars[i].render();
    }
  
}



class TieFighter{
  constructor(_x, _y, _z, _scale){
    
    this.pos = 
      createVector(_x, _y, _z);
    this.scale = _scale;
    
    // Rotations.
    this.rX = 0;
    this.rY = 0;
    this.rZ = 0;
    
  }
  
    
    forward(_f){
        // Work out an amount for each x, y, & z.
        // This will be based on rotation
        // and using 3D vector maths.
        
        this.pos.z += _f * Math.cos(radians(this.rY));
        this.pos.x += _f * Math.sin(radians(this.rY));
        
        this.pos.y += _f * Math.sin(radians(this.rX));
        
        //this.pos.x += _f * Math.cos(radians(this.rX));
        //this.pos.y += _f * Math.sin(radians(this.rX));
        
        
//        this.pos.x += _f * Math.sin(radians(this.rY)) *
//            Math.cos(radians(this.rX));
//        
//        this.pos.y += _f * Math.sin(radians(this.rY))* 
//            Math.sin(radians(this.rX));
//        
//        this.pos.z += _f * Math.cos(radians(this.rY));
        
    }
    
  render(){

    push();
  translate(this.pos);
    
      rotateY(radians(this.rY));
      rotateX(radians(this.rX));
      rotateZ(radians(this.rZ));
      //this.rY += Math.random();
  
    fill(0,200,0);
    noStroke();
    //specularMaterial(200);
    //ambientMaterial(100,0,0);
    
    sphere(8);
    
    fill(0,200,0,10);
    sphere(16,5);
  pop();
  
  push();
    
    translate(this.pos);
    
    rotateY(radians(this.rY));
    rotateX(radians(this.rX));
    rotateZ(radians(this.rZ));
    //this.rY += Math.random();
    
    stroke(100,200,0);
    strokeWeight(3);
    ambientMaterial(100,0,0);
    translate(21,0,0);
    box(10,64,64);
  pop();
  
  push();
    translate(this.pos);
    
      rotateY(radians(this.rY));
      rotateX(radians(this.rX));
      rotateZ(radians(this.rZ));
      //this.rY += Math.random();
    
    stroke(100,200,0);
    strokeWeight(3);
  ambientMaterial(100,0,0);
  translate(-21,0,0);
  box(10,64,64);
  pop();
  
  }
  
}

class Star{
  constructor(_x, _y, _z, _scale){
    
    this.pos = 
      createVector(_x, _y, _z);
    this.scale = _scale;
    
    // Rotations.
    this.rX = 0;
    this.rY = 0;
    this.rZ = 0;
    
  }
  
  render(){
    push();
      translate(this.pos);
    
      rotateY(radians(this.rY));
      rotateX(radians(this.rX));
      rotateZ(radians(this.rZ));
      
      noStroke();
      fill(255);
      //specularMaterial(255);
    
      box(this.scale);
    
    pop();
  }
  
}