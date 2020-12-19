let bs = 20;
let bh = 8*bs;
//let freq = bs*32;
//let amp = 42;
let freq = bs*64;
let amp = bs*3;
let grass;
let soil;
let mc = true;

let snowDrops = [];
let weather = ['snow','rain','sunny'];
let whatWeather = 2;

let vDir; // Direction vector.
let pos; // Position vector in Perlin terrain.

let prevX = 0;
let prevY = 0;

let rows = 24;
let cols = 24;

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
let m_rock;
let m_castle;

function preload(){
  soil = loadImage('soil.jpg');
  grass = loadImage('grass.png');
  //imp = loadModel('imp_storm.obj',true);
  //buddy = loadModel('buddy.obj',true);
  stag = loadModel('stag.obj',true);
  m_rock = loadModel('rock.obj',true);
  m_castle = loadModel('castle.obj',true);
  font = loadFont("OpenSans-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, 
               windowHeight, 
               WEBGL);
  
  angleMode(DEGREES);
  
  //strokeWeight(2);
  noiseSeed(99);
  
  // Offset to Perlin, to avoid symmetry of
  // terrain as we go into negative numbers.
  adjust = Math.floor(bs*999);
  
  // Centralise these at start to avoid jolt.
  mouseX = width*0.5;
  mouseY = height*0.4;
  
  // Position vector and direction
  // of subject.
  pos = createVector(0,0,0);
  vDir = createVector(0,0,0);
  
  //noCursor();
  
  // Build snow/rain arrays.
  setupPrecipitation();
  
  //ambientLight(255);
  ambientLight(222);
  
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
  
  // Display subject position.
  
    let areaCalc = 
        Math.floor(myZ/bs);
    let NorthSouth = "Equator ";
    if (areaCalc<0)NorthSouth = "South ";
    else if (areaCalc>0)NorthSouth = "North ";
  
  // This must relate to cols/rows somehow,
  // i.e. to get subject at (0,0) at start.
  // magicNumber = 
  //     adjust+(Math.floor(cols*0.5));
  
  myX = Math.floor((adjust+cols*
            0.5-(pos.x/bs))-magicNumber);
  myZ = Math.floor((adjust+rows*
            0.5-(pos.z/bs))-magicNumber);
    
  // text("X: " +
  //      myX,-width/2+64,
  //      -height/2+12);
  // text("Z: " +
  //      myZ,-width/2+64,
  //      -height/2+24+12);
    if (!mc){
    text("Area: " +
         NorthSouth + 
         Math.abs(areaCalc),
         -width/2+128,
         -height/2+24+12);
    
  //text("Rot: " + myRot, width/2-100,
      // -height/2+12);
    
    }
  
  if (mc){
    checkWeather(areaCalc,NorthSouth);
  }
  
}


function genTerrain(){
  
  sceneLighting();
  
  push();
  
  sceneCamera();
  
  // Offset for larger map terrain grid-
  // must be centred on gameplay grid.
  let os = 0;
  if (!mc) os = 10;
  
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
    // *0.05 means /bs (bs=20).
    let thisPosX = 
        Math.floor((adjust+x-
                    (pos.x*0.05))-magicNumber);
    let thisPosZ = 
        Math.floor((adjust+z-
                    (pos.z*0.05))-magicNumber);
                  
      
    if (thisPosZ==9 &&
        thisPosX==9)
        castle();
    
    // Noise with independent freq
    // and amp to that of terrain.
    let tFreq = 0.12;
    let tAmp = 100;
    let terraFeat =
        noise(adjust+thisPosX*
              tFreq,
              adjust*3+thisPosZ*
              tFreq)*
              tAmp;
      
      // Northerliness.
      // Cf. areaCalc.
      // The *0.05 is equivalent to /20.
      let howNorth = 
        myZ*0.05;
    
      // Let's see what values we're getting.
    //if (frameCount % 100==0)
      //console.log(terraFeat);
      
    if (terraFeat > 70){
    // Pass in position * 36 and * 33 to
    // give random, but fixed rotation
    // for this tree.
      tree(thisPosX*36+thisPosZ*33);
    }
      if (dayNight > 0 &&
          dayNight > 0 && 
          howNorth > 7 &&
          terraFeat < 32 &&
              terraFeat > 31.6){
      blueCrystal
      (thisPosX*36+thisPosZ*33);
    }
      if (dayNight > 0 &&
          howNorth > 11 &&
          terraFeat < 65 &&
              terraFeat > 64.9){
      redCrystal
      (thisPosX*36+thisPosZ*33);
    }if (terraFeat > 43 &&
              terraFeat < 43.2){
      rock(thisPosZ);
    }
      if (dayNight > 0 &&
          howNorth < -9 &&
          terraFeat < 42.7 &&
          terraFeat > 42){
      pinkCrystal
      (thisPosX*36+thisPosZ*33);
      }
      
    // Decide appearance of terrain here.
    if (y >= 32){
      // Snow height!
      
      stroke(170);
      specularMaterial(255);
      shininess(4);
      box(bs,bh,bs);
               }
      else {
        
        
        
      if (howNorth>3){
        // Northerly ice.
        //ambientLight(222);
        ambientMaterial(200);
        stroke(222);
        //shininess(4);
        //texture(grass);
      }
        else
          {
          // Ordinary grass terrain.
          specularMaterial(0,255,0);
          shininess(2);
          texture(grass);
          }
      
      
      // Place terrain voxel/block.
      if (terraFeat >= 23)
        box(bs,bh,bs);
        
        // Terrain style overrides.
      else if (terraFeat < 23 &&
               terraFeat > 9) {
        texture(soil);
        shininess(12);
        box(bs,bh,bs);
      } else if (terraFeat < 9) {
        // Black block, lowered.
        specularMaterial(0,0,0);
        shininess(100);
        box(bs,bh*2,bs);
      } else{
        box(bs,bh,bs);
      }
        
      }
      
      // Subject.
      if (x == Math.floor(cols*0.5) &&
          z == Math.floor(rows*0.5)){
        
        // Check surrounding terrain heights.
        // We could store these more
        // intelligently - when iterating
        // through grid, we can calc 
        // beforehand the subject's 
        // neighbouring voxels - rather than
        // recalculating noise here.
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
        
        // Place subject object in scene.
        push();
      
        translate(0,-bh*0.5,0);
      
        putStag();
        
        pop();
      }
      
    pop();
    }
  } 
  pop();
  
}