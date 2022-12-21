// Mobile Net model.
let mn;
// For timing events.
let chronos;
// Test video.
let pg;
let label='';

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  //pg=createGraphics(width,height);
  pg=createCapture(VIDEO);
  pg.hide();
  background(220,0,200);
  
  // Display version of ml5 to check working.
  let fontSize=width*0.33;
  textSize(fontSize);
  //textAlign(CENTER,CENTER);
  fill(255);
  //text(ml5.version,width/2,height/2);
  
  setupImageClassifier();
}

function modelReady(){
  //textSize(22);
  //fill(64);
  console.log('go!');
  //text('model ready! (' + 
       // ((millis()-chronos)*0.001) + 
       // ' seconds)',width/2,42);
}

function setupImageClassifier(){
  chronos=millis();
  // NB we pass our video 'pg' right in here.
  // Predictions will default to this object.
  mn = ml5.imageClassifier('MobileNet', pg, modelReady);
  mn.predict(gotResults);
}

function gotResults(error,results){
  if (error){
    console.error(error);
  }
  else{
    //console.log(results[0]);
    textSize(64);
    label=results[0].label;
    mn.predict(gotResults); // Recursive call :)
  }
    
}


function mousePressed(){
  mn.predict(gotResults);
  //img.hide();
}

function draw(){
  background(200,0,200);
  image(pg,0,0,width,height-128);
  text(label,42,height-64);
}


