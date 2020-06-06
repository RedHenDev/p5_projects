
// Buttons & inputs.
let inputs;
let inputMessage;

let button; // New input.
let generateButton;

let percentages;

function setupInput(){
  inputs = [];
  percentages = [];
  
  inputMessage = "enter %";
  
  fNewInput();
  
  button = createButton("New");
  button.mousePressed(fNewInput);
  button = createButton("generate");
  button.mousePressed(generatePi);
  
}

function fNewInput(){
    inputs[inputs.length] =
      createInput(inputMessage);
    inputs[inputs.length-1].
    input(false);
    inputs[inputs.length-1].value(0);
    
    generatePi();
}

// Maybe do this automatically in future -
// that is, with a callback on inputEvent.
function generatePi(){
  // First, iterate over inputs to grab 
  // their values.
  for (let i = 0; i < inputs.length; i++){
    percentages[i] = inputs[i].value();
  }
}

let who;
let whos; // Array of pi-charts.
let prevX;
let prevY;
let canPlace = true; // If dragging, false.

function setup(){
  createCanvas(400,400);
  
  setupInput();
  
  prevX = mouseX;
  prevY = mouseY;
  
  // Test pi-chart.
  who = new Cir(width/2,
                height/2,
                width/3.33,
               100);
  // Array of pi-charts.
  whos = [];
  
}

// Generate a new chart.
function mousePressed(){
  
  // Off canvas?
  if (mouseY > height) return;
  
  canPlace = true;
  for (let i = 0; i < whos.length; i++){
    if ((mouseX > whos[i].x - whos[i].r/2)
      &
    (mouseX < whos[i].x + whos[i].r/2)
      &
    (mouseY > whos[i].y - whos[i].r/2)
     &
     (mouseY < whos[i].y + whos[i].r/2))
     canPlace = false;
    
  }
  if (!canPlace) return;
  
  let jerry = true;
  if (mouseX < who.x - who.r/2) jerry = false;
  if (mouseX > who.x + who.r/2) jerry = false;
  if (mouseY < who.y - who.r/2) jerry = false;
  if (mouseY > who.y + who.r/2) jerry = false;
  if (jerry == false ){
  Cir.newPi(mouseX, mouseY, whos);
  }
}

function mouseDragged(){
  
  let jerry = true;
  
  if (mouseX < who.x - who.r/2) jerry = false;
  if (mouseX > who.x + who.r/2) jerry = false;
  if (mouseY < who.y - who.r/2) jerry = false;
  if (mouseY > who.y + who.r/2) jerry = false;
  if (jerry == true ){
  
  // Let's see by how much
  // the mouse has moved.
  let deltaX = mouseX - prevX;
  let deltaY = mouseY - prevY;
  
  // Now sum the delta with circle's position.
  who.translate(deltaX, deltaY);
  mouseMoved();
  
  prevX = mouseX;
  prevY = mouseY;
  
  return;
  }
  
  for (let i = 0; i < whos.length; i++){
    if (mouseX < whos[i].x - whos[i].r/2)
      continue;
    if (mouseX > whos[i].x + whos[i].r/2)
      continue;
    if (mouseY < whos[i].y - whos[i].r/2)
      continue;
    if (mouseY > whos[i].y + whos[i].r/2)
      continue;
    
    // Let's see by how much
  // the mouse has moved.
  let deltaX = mouseX - prevX;
  let deltaY = mouseY - prevY;
  
  // Now sum the delta with circle's position.
  whos[i].translate(deltaX, deltaY);
  mouseMoved();
  
  prevX = mouseX;
  prevY = mouseY;

  return;
  }
  
}

// Map mouse height to percentage.
function mouseMoved(){
  
  if (mouseY > height) return;
  if (mouseY < 0) return;
  
  let p = map(mouseY, 0, height, 
              0, 100-who.sum());
    
  percentages[inputs.length] = p;
  
}

function draw(){
  backRender();
  
  prevX = mouseX;
  prevY = mouseY;
  
  who.render();
  who.textDisplay();
  
  for (let i = 0; i < whos.length; i++){
    whos[i].render();
  }
  
}



function backRender(){
  background(200,0,200);
}


class Cir{
  constructor(_x, _y, _r, _p){
    this.x = _x;
    this.y = _y;
    this.r = _r;
    
    // Percentage filled.
    this.p = _p;
    // For drawing segment.
    this.theta;
    this.calcP();
  }
  
  static newPi(_x, _y, _array){
    let baby = new Cir(_x, _y, random(4,width/6.66), 0);
    _array.push(baby);
  }
  
  render(){
    fill(255,200);
    stroke(0);
    strokeWeight(2);
    circle(this.x,
          this.y,
          this.r+3);
    
    strokeWeight(1);
    
    let startTheta = 0;
    
    for (let ip = 0; ip < percentages.length; ip++){
      
      this.p = percentages[ip];
      this.calcP();
      
      // Draw individual lines
      // from starting theta to ending theta.
    for (let i = startTheta; i <= 
         startTheta + this.calcP(); i++){
    let rX = this.x + this.r/2 *
        Math.cos(radians(i-90));
    let rY = this.y + this.r/2 *
        Math.sin(radians(i-90));   
      
        let pinkShade =
            map(i,startTheta, 
                startTheta + this.calcP(),200,100) 
        if (ip === percentages.length-1){
          stroke(pinkShade);
        }
      else stroke(pinkShade,0,pinkShade);
      
      line(this.x, this.y,
        rX, rY);
    }
      
    startTheta += this.calcP();
    
      
    } // End of looping over inputs.
      
  }
  
  translate(_dX, _dY){
    this.x += _dX;
    this.y += _dY;
  }
  
  calcP(){
    // What theta from percent?
    // 360 = 100
    // so 1% = 3.6 degrees.
    
    // Delimit range.
    if (this.p < 0) this.p = 0;
    if (this.p > 100) this.p = 100;
    
    // Measure of degrees from percentage.
    return 3.6 * this.p;
  }
  
  // Sum percentages.
  sum(){
    let sumP = 0;
    for (let i = 0; 
         i < percentages.length-1; i++){
      sumP += int(percentages[i]);
    }
    return sumP;
  }
  
  textDisplay(){
    stroke(0);
    strokeWeight(3);
    fill(255);
    textSize(32);
    
    // Could sum percentages.
    // Also, state individual percentage
    // corresponding to mouse position
    // on piChart.
    
    text(Math.floor(this.sum())+ "%", 
         this.x - 16, this.y + this.r/1.33);
    
    // This will just print last
    // percentage that happened to be
    // calculated.
    /*
    text(Math.floor(this.p)+ "%", 
         this.x - 16, this.y + this.r/1.33);
         */
  }
}