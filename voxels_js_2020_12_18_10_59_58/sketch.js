let bs = 20;
let bh = 8*bs;
let freq = bs*32;
let amp = bs*3;
let grass;
let soil;
let mc = true;

let snowDrops = [];

let weather = ['snow','rain','sunny'];
let whatWeather = 0;

let vDir; // Direction vector.
let pos; // Position vector in Perlin terrain.

let prevX = 0;
let prevY = 0;

let rows = 26;
let cols = 26;

// For calculating position relative
// to cols and rows.
// magicNumber = (999 * bs)+(cols/2) 
// where adjust = 999*bs
let magicNumber = 19992;

// For checking player pos against
// surrounding terrain heights.
let rightY, leftY, upY, downY = 0;
let posY = 0;
let myX, myZ = 0;
let myRot = 0;

let font;

let imp;
let trooper;
let buddy;
let stag;

function preload(){
  // soil = loadImage('soil.jpg');
  grass = loadImage('grass.png');
  //imp = loadModel('imp_storm.obj',true);
  //buddy = loadModel('buddy.obj',true);
  stag = loadModel('stag.obj',true);
  font = loadFont("OpenSans-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, 
               windowHeight, WEBGL);
  
  angleMode(DEGREES);
  
  //strokeWeight(2);
  noiseSeed(99);
  
  // Offset to Perlin, to avoid symmetry of
  // terrain as we go into negative numbers.
  adjust = Math.floor(bs*999);
  
  // Centralise these at start to avoid jolt.
  mouseX = 0;
  mouseY = height*0.4;
  
  // Position vector and direction
  // of subject.
  pos = createVector(0,0,0);
  vDir = createVector(0,0,0);
  
  //noCursor();
  
  // Build snow/rain arrays.
  setupPrecipitation();
  
  ambientLight(255);
  
  // In 3D, we have to load and set up our
  // font for text() like this. See
  // preload() for loading the font.
  textSize(22);
  textAlign(CENTER, CENTER);
  textFont(font);
  
  // Generate and display our terrain!
  genTerrain();
}

function mousePressed(){
  
  // Toggle between display modes.
  mc = !mc;
  
  genTerrain();
  
  /*
  if (mc){
  // Weather toggle.
  whatWeather++;
  if (whatWeather>2) whatWeather = 0;
  }
  */
}


function draw(){
  if (mc && keyIsPressed){
    
    locomotion();
      
  }
    
  
    
    //checkKeys();
  
  genTerrain();
  //stormTrooper();
  
  prevX = mouseX;
  prevY = mouseY;
   
  // Only show precipitation in main mode.
  if (mc){
  if (weather[whatWeather] == 'snow')
    snow();
  else if (weather[whatWeather] == 'rain')
    rain();
  }
  
  // Display subject position.
  // This must relate to cols/rows somehow,
  // i.e. to get subject at (0,0) at start.
  // magicNumber = 
  //     adjust+(Math.floor(cols*0.5));
  myX = Math.floor((adjust+cols*
            0.5-(pos.x/bs))-magicNumber);
  myZ = Math.floor((adjust+rows*
            0.5-(pos.z/bs))-magicNumber);
  text("X: " +
       myX,-width/2+64,
       -height/2+12);
  text("Y: " +
       myZ,-width/2+64,
       -height/2+24+12);
  //stroke(255);
  //text("Rot: " + myRot, width/2-100,
      // -height/2+12);
}


function setupPrecipitation(){
  for (let i = 0; i < 400; i++){
    let sy = createVector();
    sy.y = random(600)-1000;
    sy.z = random(cols*bs)-cols*bs/2;
    snowDrops.push(sy);
  }
}

function rain(){
  push();
  stroke(0,0,100);
  rainLength = 10;
  
  for (let i = 0; i < snowDrops.length; i++){
    snowDrops[i].y+=30;
    if (snowDrops[i].y>200) 
      snowDrops[i].y=random(600)-1000;
    push();
    translate(0,0,snowDrops[i].z);
    let xP = ((cols*bs*i)/
              snowDrops.length)-           
             cols*bs/2;
    let yP = snowDrops[i].y;
    line(xP,yP,xP, yP+rainLength);
    
    pop();
  }
  pop();
}

function snow(){
  push();
  fill((Math.sin(frameCount)+1)*25+200);
  noStroke();
  
  for (let i = 0; i < snowDrops.length; i++){
    snowDrops[i].y+=10;
    if (snowDrops[i].y>200) 
      snowDrops[i].y=random(600)-1000;
    push();
    translate(0,0,snowDrops[i].z);
    circle(((cols*bs*i)/snowDrops.length)-           
           cols*bs/2,snowDrops[i].y,6);
    pop();
  }
  pop();
}



function tree(rot){
    push();
      translate(0,-bh,0);
      rotateY(rot);
      ambientMaterial(0,100,0);
      noStroke();
      //strokeWeight(1);
      //stroke(0,80,0,100);
      sphere(42,5);
      ambientMaterial(100,100,42);
      translate(0,bh*0.6,0);
      stroke(0);
      //strokeWeight(1);
      box(10,bh,10);
    pop();
}

function genTerrain(){
  
  let cycleSpeed = 0;
  let dayNight = Math.sin(frameCount*
                          cycleSpeed);
  
  background(0,map(dayNight,1,-1,0,64),
             map(dayNight,1,-1,0,255));
  
  push();
  
  pointLight(255, 255, 255, 
             0, dayNight*1000,700);
  
  // For syncing co-ordinates to grid of
  // voxels in terrain.
  magicNumber = 
      Math.floor(adjust+(cols*0.5));
  
  // Main camera position.
  if (mc){
    
    /*
    // First person nearly.
    translate(-cols*bs*0.5,
             (amp*2)+posY*bs+bh,
              -rows*bs*0.2);
    */
    /*
    // Another first person.
    translate(-cols*bs*0.5,              
              (amp*2)+(posY*bs),
              bs*rows*0.5);
    */
    /*
    // Like, perfect first person.
    translate(  0,              
                posY*bs+bh,
                bs*rows);
    
              //-rows*bs+(posY*bs*0));
    rotateY(map(mouseX,0,width,0,359));
    
    */
    
    /*
    Third-person orbital! Eureka!
    translate(0,              
              0,
              -rows*bs*0.1);
    rotateX(map(mouseY,0,height,-22,-90));
    rotateY(map(mouseX,0,width,0,360));
    translate(0,posY*bs,0);
    */
    
    translate(0,              
              0,
              -rows*bs*0.1);
    rotateX(map(mouseY,0,height,-22,-90));
    // Rotation from mouseX.
    let rotSpeed = 0.4;
    myRot += (mouseX-prevX) * rotSpeed;
    //myRot = map(mouseX,0,width,0,360);
    rotateY(myRot);
    translate(0,posY*bs,0);
    
  }
  else {

    translate(0,posY*bs+
              Math.sin(frameCount*0.1)*5,
              -800);
    rotateX(-30);
    // Wobble.
    //rotateX(-45+Math.sin(
      //frameCount*0.05)*-5);
    rotateY(5+Math.sin(
     frameCount*0.05)*5);
    
    // Legacy x offset in translate.
    //-cols*bs*0.5
    
  }
  
  // Offset for larger map terrain grid-
  // must be centred on gameplay grid.
  let os = 0;
  if (!mc) os = 20;
  
  for (let z = 0-os/2; z < rows+os/2; z++){
    for (let x = 0-os/2; x < cols+os/2; x++){
    push();
    let y = noise((adjust+x*bs-pos.x)/freq,
                  (adjust+z*bs-
                   pos.z)/freq)*amp;
      
    y = Math.floor(y);
      
    // Lines on terrain.
    if (mc) {
      stroke(0);
      //strokeWeight(2);
    } else {
      //stroke(0,255,0);
      //strokeWeight(2);
      stroke(0,255,0);
    }
      
    // Translate to this grid position.
    translate(Math.floor(x*bs),
              Math.floor(-y*bs),
              Math.floor(z*bs));
      
    // Offset for x & z, so that we can
    // rotate correctly around centre
    // of map on Y-axis.
    translate(Math.floor(-bs*cols*0.5),
              0,
              Math.floor(-bs*rows*0.5));
      
    // Terrain features.
    // What position are we?
      
    
    let thisPosX = 
        Math.floor((adjust+x-
                    (pos.x/bs))-magicNumber);
    let thisPosZ = 
        Math.floor((adjust+z-
                    (pos.z/bs))-magicNumber);
                    
    
    // Plant tree?
    if (noise(thisPosX*0.12,
              thisPosZ*0.12)*100 > 70){
      // Pass in position * 36 and * 33 to
      // generate a random, but fixed rotation
      // for this tree.
      tree(thisPosX*36+thisPosZ*33);
    } 
      
      
    //texture(soil);
    //specularMaterial(200,200,32);
    if (y >= 32){
      //emissiveMaterial(255);
      stroke(170);
      //ambientLight(100);
      specularMaterial(255);
      shininess(4);
               }
      else {
      specularMaterial(0,255,0);
      shininess(2);
      texture(grass);
      }

      box(bs,bh,bs);
      
      // Subject.
      if (x == Math.floor(cols*0.5) &&
          z == Math.floor(rows*0.5)){
        
    // Check surrounding terrain heights.
        leftY = noise((adjust+(x-1)*
                       bs-pos.x)/freq,
                  (adjust+z*bs-
                   pos.z)/freq)*amp;
        rightY = noise((adjust+(x+1)*
                       bs-pos.x)/freq,
                  (adjust+z*bs-
                   pos.z)/freq)*amp;
        upY = noise((adjust+x*
                       bs-pos.x)/freq,
                  (adjust+(z-1)*bs-
                   pos.z)/freq)*amp;
        downY = noise((adjust+x*
                       bs-pos.x)/freq,
                  (adjust+(z+1)*bs-
                   pos.z)/freq)*amp;
        posY = y;
        
        push();
      
        translate(0,-bh*0.5,0);
      
//         stroke(255);
//         emissiveMaterial(0,0,0);
        
//          box(bs*0.5,bs*4,bs*0.5);
        
        
        // Helmet.
        //stormTrooper();
        PutStag();
        
        
//         translate(0,-bs,0);
//         rotateY(frameCount*2*vDir.x);
//         rotateX(frameCount*2*vDir.z);
//           box(bs,bs,bs);
        pop();
      }
      
    pop();
    }
  } 
  pop();
  
}