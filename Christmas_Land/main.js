/*
B New (aka 'red hen' dev)
Dec 2020
Dedicated to my niece, A.

***

Asset attributions (all free & CC):

*Music & sound*

Kevin McLeod - Tchaikovsky’s ‘Dance of the Sugar Plum Fairy’
https://creativecommons.org/licenses/by/3.0/
Source: https://freemusicarchive.org/

‘Forest Ambience’ - lextrack
https://freesound.org/s/272417/
Creative Commons 0

'Hit_01'
'Collect_Point_01'
8-bit sound library
https://freesound.org/people/LittleRobotSoundFactory/packs/16681/

*3D models*

‘Santa’ - by bariacg
https://www.turbosquid.com/Search/Artists/bariacg
Standard license: https://blog.turbosquid.com/turbosquid-3d-model-license/

‘Stone Pack1’ by Veleran
https://www.turbosquid.com/Search/Artists/Veleran
Standard license: https://blog.turbosquid.com/turbosquid-3d-model-license/

‘Origami Deer’ by LeighIria
https://3dexport.com/free-3dmodel-origami-deer-313821.htm
https://help.3dexport.com/item/end-user-license-agreement-eula/

*Textures*

grass_12 - made myself :)
soil_12 - made myself :)

Merry Christmas!
*/

let bs = 20;
let bh = 8*bs;
//let freq = bs*32;
//let amp = 42;
let freq = bs*64;
let amp = bs*3;
let grass;
let soil;
let gameMode = 'main';

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
let myRot = 45;

let font;

function preload(){
  // Sounds.
  s_sugar = loadSound('sugarPlum.mp3');
  s_forest = loadSound('forest.mp3');
  s_popUp = loadSound('Collect_Point_01.mp3');
  s_menu = loadSound('Hit_01.mp3');
  // Textures.
  soil = loadImage('soil_12.png');
  grass = loadImage('grass_12.png');
  // 3D models.
  stag = loadModel('stag.obj',true);
  m_rock = loadModel('rock.obj',true);
  m_santa = loadModel('santa.obj',true);
  // Font.
  font = 
    loadFont("OpenSans-Regular.ttf");
}

function setup() {
   createCanvas
              (windowWidth, 
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
  setupStars();
  
  //ambientLight(255);
  ambientLight(222,222,222);
  
  // In 3D, we have to load and set up our
  // font for text() like this. See
  // preload() for loading the font.
  textSize(22);
  textAlign(CENTER, CENTER);
  textFont(font);
  
  // Sounds & music setup.
  // Volume etc.
  // Best to have things too quiet
  // than abrasive.
  s_forest.setVolume(0.1);
  s_popUp.setVolume(0.25);
  s_menu.setVolume(0.25);
  s_sugar.setVolume(0.25);
  
  // Generate and display our terrain!
  //genTerrain();
  displayMessage('Merry Christmas and welcome to\nAmelie\'s Magical Christmas Land!\n\nIf you\'re lucky you may see snow, and\nmysterious crystals.\n\nTap top left to begin.\n\nTo fly Rudolf forwards, tap or click;\n tap again to stop flying.\n\nSwipe left and right, or move mouse, to turn.\n\n(You can use keys if using keyboard.)\n\nCan you help Rudolf find Father Christmas?');
}


function draw(){
  // At the start of draw, assume no
  // new messages.
  // Only changes in position can
  // trigger new messages, in
  // genTerrain(). Nice.
  //newMessage=false;
  
  push();
  
  if (gameMode==='main' && 
      keyIsPressed){
      locomotion(false);
  }
  if (gameMode==='main' &&
      dashing){
      locomotion(true);
  }
    
 
  if (gameMode ==='main' ||
      gameMode ==='map'){
    genTerrain();
  
  if (dayNight < 0.1)
    drawStars();
  }
  
  prevX = mouseX;
  prevY = mouseY;
  
  // Display subject position.
  // *0.05 is /bs (bs = 20).
    let areaCalc = 
        Math.floor(myZ*0.05);
    let NorthSouth = "Nowhere ";
    if (areaCalc<0)NorthSouth = "South ";
    else if (areaCalc>0)NorthSouth = "North ";
  
  // This must relate to cols/rows somehow,
  // i.e. to get subject at (0,0) at start.
  // magicNumber = 
  //     adjust+(Math.floor(cols*0.5));
  
  myX = Math.floor((adjust+cols*
            0.5-(pos.x*0.05))-magicNumber);
  myZ = Math.floor((adjust+rows*
            0.5-(pos.z*0.05))-magicNumber);
    
  // text("X: " +
  //      myX,-width/2+64,
  //      -height/2+12);
  // text("Z: " +
  //      myZ,-width/2+64,
  //      -height/2+24+12);
    if (gameMode==='map'){
    textSize(22);
    textAlign(CENTER, CENTER);
    strokeWeight(1);
    stroke(0);
    fill(255);
    text("Area: " +
         (Math.abs(areaCalc)) + 
         " " + NorthSouth,
         -width/2+128,
         -height/2+24+12);
    
  //text("Rot: " + myRot, width/2-100,
      // -height/2+12);
      text(  "Elevation: " + posY, 
             width/2-100,
            -height/2+24+12);
    
    }
  
   // Only show precipitation in main mode.
  if (gameMode==='main'){
    checkWeather(areaCalc,NorthSouth);
  }
  
  // This is where we ought to have a
  // bouncing white cube as mail icon...
  if (gameMode==='main'){
    checkMail();
  }
  
  // Manage music and ambient sound.
  checkSound();
  
  pop();
 
}

function genTerrain(){
   push();
  // This also deals with background colour.
  sceneLighting();
  
  sceneCamera();
  
  // Offset for larger map terrain grid-
  // must be centred on gameplay grid.
  let os = 0;
  if (gameMode==='map') os = 4;
  
  for (let z = 0-os/2; z < rows+os/2; z++){
    for (let x = 0-os/2; x < cols+os/2; x++){
    push();
      
    // Apply our Perlin noise.
    let p_freq = bs*333;
    let p_amp = 99;  
    let y = noise((adjust+x*bs-
                   pos.x)/p_freq,
                  (adjust+z*bs-
                   pos.z)/p_freq)*p_amp;  
      p_freq = bs*34;
    p_amp = 33;
    y += noise((adjust+x*bs-
                pos.x)/p_freq,
                  (adjust+z*bs-
                   pos.z)/p_freq)*p_amp;
    p_freq = bs*2;
    p_amp = 2;
    y += noise((adjust+x*bs-
                pos.x)/p_freq,
                  (adjust+z*bs-
                   pos.z)/p_freq)*p_amp;
    
    // let y = noise((adjust+x*bs-pos.x)/freq,
    //               (adjust+z*bs-
    //                pos.z)/freq)*amp;
      
    if (gameMode==='map')
      y = Math.floor(y);
      
    // Lines on terrain.
    if (gameMode==='main') {
      stroke(0);
      //strokeWeight(2);
    } else if (gameMode==='map'){
      // Green terrain lines.
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
                  
    // Place Santa - and message.
      if (thisPosZ==Math.floor(111.5*bs) &&
        thisPosX==Math.floor(-bs*0.25)){
        push();
        santa();
        pop();
      if (!foundSanta){
        newMessage = true;
        whatMessage = 
          "You found Father Christmas!\n\nHo! Ho! Ho!";
        foundSanta = true;
      }
    }
    
      
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
      let howEast = 
        myX*0.05;
   
    
  // Let's see what values we're getting.
  //if (frameCount % 100==0)
  //console.log(terraFeat);
      
    if (terraFeat > 70){
    // Pass in position * 36 and * 33 to
    // give random, but fixed rotation
    // for this tree.
      tree(thisPosX*36+thisPosZ*33);
    }
      if (dayNight < 0 && 
          howNorth > 11 &&
          terraFeat < 32 &&
              terraFeat > 31.6){
      blueCrystal
      (thisPosX*36+thisPosZ*33);
    }
      if (dayNight < 0 &&
          howNorth > 99 &&
          terraFeat < 65 &&
              terraFeat > 64.9){
      redCrystal
      (thisPosX*36+thisPosZ*33);
    }if (terraFeat > 43 &&
              terraFeat < 43.2){
      rock(thisPosX*36+thisPosZ*33);
    }
      if (dayNight < 0 &&
          howNorth < -42 &&
          terraFeat < 42.7 &&
          terraFeat > 42){
      pinkCrystal
      (thisPosX*36+thisPosZ*33);
      }
      
    // Decide appearance of terrain here.
    // Default 32.
    if (y >= 70){
      // Snow height!
      
      stroke(170);
      specularMaterial(255);
      shininess(4);
      box(bs,bh,bs);
               }
      else {
        
        
        
      if (howNorth>64){
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
        box(bs,bh-bs,bs);
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
        /*
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
        */
        
        posY = y;
        
        // Place subject object in scene.
        push();
      
        translate(0,-bh*0.7,0);
      
        putStag();
        
        pop();
        
        // We're still inside subject
        // - to just check this once.
        // Here are the 'found' messages.
        // Don't overwrite messages if
        // user hasn't read last one.
        if (howNorth>3 && !newMessage){
      if (!foundBlueCrystals){
        newMessage = true;
        whatMessage = 
          "Legend says that Father Christmas\nchose this land--Amelie's magical land--\nbecause of the crystals to be found here.\n\nThe blue crystals are a good light source,\nbut not potent enough for real magic.\n\nAnyway, an elf once told me that\nthere are rare red crystals somewhere here.\nI'm not sure it's true.";
        foundBlueCrystals = true;
      }
    }
        if (howEast>5 && !newMessage){
      if (!foundEast){
        newMessage = true;
        whatMessage = 
          "You like exploring, yes?\n\nMe too. The best thing about exploring\nis the mystery.\n\nThis land is grown from\nmagic, myth, and mathematics.\n\nMaybe the more you wander, the more\nthis place grows.";
        foundEast = true;
      }
    }
        
        if (howEast<-11 && !newMessage){
      if (!foundWest){
        newMessage = true;
        whatMessage = 
          "It is said by the eldest\nreindeer that Father Christmas once\nlived in an ancient palace of ice.\n\nSome say it isn't a palace, but a castle.\n\nEither way, only the ruins of\nthat place exist now. But I don't\nthink it's like an ordinary\nplace made of stone and substance at all.";
        foundWest = true;
      }
    }
        
        if (posY>75){
      if (!foundMountain && !newMessage){
        newMessage = true;
        whatMessage = 
          "Careful going up this high!\nAlthough, since Rudolf can fly,\nI suppose there isn't any real danger.\n\nAll the hills and mountains\nin Amelie's magical Christmas\nland have names.\n\nMy favourite mountain is Falknis.\n\nOf course, you can re-name the\nmountains you find here.";
        foundMountain = true;
      }
    }
        if (howNorth<-6 && !newMessage){
      if (!foundSouth){
        newMessage = true;
        whatMessage = 
          "I'm not sure you know this,\nbut it sure does rain a lot.\nEspecially in the South.\n\nFather Christmas says he doesn't mind\nthe rain, but I know he loves\nthe snow and ice.";
        foundSouth = true;
      }
    }
        
      } // End of subject.
      
    pop();
    }
  } 
  pop();
  
}