// Mobile Net model.
let mn;
// For timing events.
let chronos;
// Test img
let pg;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  pg=createGraphics(width,height);
  background(220,0,200);
  
  // Display version of ml5 to check working.
  let fontSize=width*0.33;
  textSize(fontSize);
  textAlign(CENTER,CENTER);
  fill(255);
  //text(ml5.version,width/2,height/2);
  
  setupImageClassifier();
}

function modelReady(){
  textSize(22);
  fill(64);
  console.log('go!');
  //text('model ready! (' + 
       // ((millis()-chronos)*0.001) + 
       // ' seconds)',width/2,42);
}

function setupImageClassifier(){
  chronos=millis();
  mn = ml5.imageClassifier('MobileNet', modelReady);
}

function gotResults(error,results){
  if (error){
    console.error(error);
  }
  else{
    console.log(results[0]);
    textSize(64);
    let label=results[0].label;
    text(label,42,100);
  }
    
}


function mousePressed(){
  mn.predict(pg, gotResults);
  //img.hide();
}

function draw(){
  if (mouseY > 0){
    pg.fill(0);
    pg.circle(mouseX,mouseY,3);
  }
  image(pg,0,0);
}


