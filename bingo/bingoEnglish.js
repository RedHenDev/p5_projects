
let message = "Copy terms into your BINGO grid\nChoose random places";

let tSize;

// Array of random choices so far.
// So that we do not repeat
// definitions.
// Also, so that we can display
// answers in order for bingo
// check.
let rndChoices = [];
let choiceCount = 0;
let terms = [];
let maxChoices;

// Technical terms could first
// be copied to students' grid card.
// Always 4*4? 16 is an OK number?

function setupTerms(){
  let def = "";
  let name = "";
  let TT;
  
  // 1
  def = "Complimenting the audience";
  name = "Flattery";
  TT = new TechnicalTerm(def,name);
  terms.push(TT);
  
  // 2
  def = "An objective truth";
  name = "Fact";
  TT = new TechnicalTerm(def,name);
  terms.push(TT);
  
  // 3
  def = "Using reasons and facts";
  name = "Logical argument";
  TT = new TechnicalTerm(def,name);
  terms.push(TT);
  
  // 4
  def = "Making an emotional impact";
  name = "Emotive language";
  TT = new TechnicalTerm(def,name);
  terms.push(TT);
  
  // 5
  def = "Descriptive language";
  name = "Imagery";
  TT = new TechnicalTerm(def,name);
  terms.push(TT);
  
  // 6
  def = "Words beginning with the same sounds";
  name = "Alliteration";
  TT = new TechnicalTerm(def,name);
  terms.push(TT);
  
  // 7
  def = "A pattern of three words, phrases, or ideas";
  name = "Triple";
  TT = new TechnicalTerm(def,name);
  terms.push(TT);
  
  // 8
  def = "A question designed to grab attention or invite\nagreement";
  name = "Rhetorical question";
  TT = new TechnicalTerm(def,name);
  terms.push(TT);
  
  // 9
  def = "An adjective in the most extreme form";
  name = "Superlative";
  TT = new TechnicalTerm(def,name);
  terms.push(TT);
  
  // 10
  def = "An exaggeration using metaphor or imagery";
  name = "Hyperbole";
  TT = new TechnicalTerm(def,name);
  terms.push(TT);
  
  // 11
  def = "Personal reference words like 'we' or 'you'";
  name = "Pronouns";
  TT = new TechnicalTerm(def,name);
  terms.push(TT);
  
  // 12
  def = "A figurative, non-literal description";
  name = "Metaphor";
  TT = new TechnicalTerm(def,name);
  terms.push(TT);
  
  // 13
  def = "A short personal story";
  name = "Anecdote";
  TT = new TechnicalTerm(def,name);
  terms.push(TT);
  
  // 14
  def = "Informal, ordinary style";
  name = "Colloquial language";
  TT = new TechnicalTerm(def,name);
  terms.push(TT);
  
  // 15
  def = "An amusing word or idea";
  name = "Humour";
  TT = new TechnicalTerm(def,name);
  terms.push(TT);
  
  // 16
  def = "Reference to a respected source";
  name = "Authority";
  TT = new TechnicalTerm(def,name);
  terms.push(TT);
}

function setup(){
  createCanvas(windowWidth,
               windowHeight);
  drawBackground();
  
  tSize = height/20;
  setupTerms();
  maxChoices = terms.length;
}

// Clear rndChoices array, ready
// for new game.
function reset(){
  rndChoices = [];
}

function grabRandomTerm(){
      let n = 
      Math.floor(Math.random() *             Math.floor(maxChoices));
     
      return n;
}

function touchEnded(){
  let n = 0;

  do {
    
    n = grabRandomTerm();
  } while (choiceCount < maxChoices && terms[n].chosen);
  
    if (choiceCount < maxChoices){
      terms[n].chosen = true;
      rndChoices.push(terms[n]);
      message = terms[n].def;
      choiceCount++;
    }
  
}

function draw(){
  drawBackground();
  drawPanel();
  
  renderTB(createVector(width/6,42,0), message);
  
  if (choiceCount === 0)
    displayAll();
  
  if (choiceCount >= maxChoices ||
     mouseX > width-width/6)
  displayAnswers();
}

function displayAll(){
  
  fill(0);
  
  for (let i = 0; i < terms.length;
      i++){
    
    if (i < 8){
    terms[i].
    display(width/6,
            height/3 + tSize*i -
            tSize);
    } else {
      terms[i].
      display(width/2 + width/20,
            height/3 + tSize*(i-8) -
            tSize);
    }
  }
}

function displayAnswers(){
  for (let i = 0; i < rndChoices.length;
      i++){
    
    if (i < rndChoices.length-1){
      fill(0);
    } else fill(255);
    
    if (i < 8){
    rndChoices[i].
    display(width/6,
            height/3 + tSize*i -
            tSize);
    } else {
      rndChoices[i].
      display(width/2 + width/20,
            height/3 + tSize*(i-8) -
            tSize);
    }
  }
}

function drawPanel(){
  fill(0,200,200,100);
  strokeWeight(4);
  stroke(255,0,0);
  rect(width+8-width/6,0,
       width/2,height);
}

function drawBackground(){
  background(200,0,200);
}

// Textbox code.
// Uses vector3 for x,y, and rotation.
function renderTB(_posR, _message){
  push();
  translate(_posR.x, _posR.y);
  rotate(_posR.z)
  
  let tbWidth = width-width/3;
  let tbHeight = height/6;
  
  
  fill(255,0,255,128);
  strokeWeight(2);
  stroke(255);
  //noStroke();
    rect(0,0,tbWidth,
      tbHeight);
  
    // Before printing text to screen,
    // we need to 'wrap' it inside the
    // available area.
    // So, this will involve organising
    // the _message into appropriately
    // sized lines of text.
    
  fill(255);
  stroke(0);
  strokeWeight(2);
  textSize(tSize);
  text(_message, tSize/2, tSize+8);
  pop();
}


// TechnicalTerm object.
// Each will have a definition
// and a name.
class TechnicalTerm{
  constructor(_def, _name){
    this.def = _def;
    this.name = _name;
    this.chosen = false;
  }
  
  // Pass in position.
  display(_x, _y){
    
    stroke(255);
    strokeWeight(3);
    textSize(tSize);
    text(this.name, _x, _y);
  }
  
}