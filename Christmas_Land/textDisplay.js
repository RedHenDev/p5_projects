// For messages. If true, then will
// not display message.
let foundSanta = false;
// Message to be passed to
// displayMessage().
let whatMessage = '';
let newMessage = false;

let foundBlueCrystals = false;
let foundMountain = false;
let foundSouth = false;
let foundEast = false;
let foundWest = false;

function gotMail(){
  // User has clicked to check mail.
  // It's OK now for mail sound to chime.
  mailSoundDone = false;
  if (!newMessage)
    displayMessage('No new messages for Rudolf.\n\nIf you\'re lucky you may see snow, and\nmysterious crystals.\n\nTo fly Rudolf forwards, tap or click;\n tap again to stop flying.\n\nSwipe left and right, or move mouse, to turn.\n\n(You can use keys if using keyboard.)\n\nCan you help Rudolf find Father Christmas?');
  else displayMessage(whatMessage);
}

// Checked before mail pop-up sound plays.
// Turned back to false in 'gotMail()' --
// i.e. after message has been checked by
// user.
let mailSoundDone = false;
function checkMail(){
  let bouncy = 0;
  if (newMessage===true){
    if (mailSoundDone===false){
      if (!s_popUp.isPlaying())
        s_popUp.play();
    }
    bouncy = 1;
    mailSoundDone = true;
  }
    // Mail icon.
    // The infamous white cube.
    snowCube(bouncy);
    // Green one for map.
    mintCube();
  
}

function mintCube(){
  push();
  
  // Depth test will go buggy if
  // we try this in message mode.
  // Message mode already plays with
  // the depth testing.
  if (gameMode==='main'){
  gl = this._renderer.GL;
  gl.disable(gl.DEPTH_TEST);
  }
      //resetMatrix();
      emissiveMaterial(0,200,0);
      noStroke();
      translate(width*0.42,
                -height*0.42,
                0);
      rotateY(frameCount);
      rotateZ(frameCount*2);
      rotateX(frameCount*3);
      box(42,42,42);
  
  if (gameMode==='main'){
  gl.enable(gl.DEPTH_TEST);
  }
  
    pop();
}

function snowCube(_bounce){
  push();
  
  // Depth test will go buggy if
  // we try this in message mode.
  // Message mode already plays with
  // the depth testing.
  if (gameMode==='main'){
  gl = this._renderer.GL;
  gl.disable(gl.DEPTH_TEST);
  }
      //resetMatrix();
      emissiveMaterial(242);
      noStroke();
      translate(-width*0.42,
                -height*0.42 +
                (Math.sin(frameCount*12*
                         _bounce)*20),
                0);
      rotateY(frameCount);
      rotateZ(frameCount*2);
      rotateX(frameCount*3);
      box(42,42,42);
  
  if (gameMode==='main'){
  gl.enable(gl.DEPTH_TEST);
  }
  
    pop();
}

function displayMessage(mess){
  // This mode will prevent subject locomotion,
  // weather, terrain generation etc., all
  // of which require either 'main' or 'map'
  // mode.
  push();
  gameMode = 'message';
  
  // Shed translations from main and
  // map modes -- else text will not
  // display, esp. coming from main
  // mode.
  resetMatrix();
  
  // Back-panel, text settings, print text.
  // Then, think about interaction.
  
  // First, prevent artifact bug.
  // This was when 3D objects from
  // main mode linger and obstruct
  // text.
  // Make sure depth test back on at
  // end!
  gl = this._renderer.GL;
  gl.disable(gl.DEPTH_TEST);
  
  background(0);
  drawStars();
  
  // Let's try createGraphics.
  let gmess = 
      createGraphics( width * 0.75,
                      height * 0.75);
  //gmess.rectMode(CENTER);
  gmess.background(0,255,0,100);
  gmess.textSize(height/32);
  gmess.fill(255,0,0);
  gmess.stroke(0);
  gmess.strokeWeight(3);
  gmess.text(mess,42,64);
  translate(0,0,-700);
  noStroke();
  texture(gmess);
  plane(gmess.width,
        gmess.height);
  
  emissiveMaterial(255);
  translate(-width*0.4,
            -height*0.4,
            0);
  rotateY(90);
  rotateZ(0);
  rotateX(0);
  putStag();
  //box(100,100,100);
  
  /*
  // Shed translations from main and
  // map modes -- else text will not
  // display, esp. coming from main
  // mode.
  
  resetMatrix();
  
  rectMode(CENTER);
  
  // Bring area into focus.
  translate(0,0,-512);
  
  fill(0,111,0,100);
  strokeWeight(1);
  stroke(0);
  rect(0,0,512,512);
  //console.log(width);
  //console.log(height);
  // Very top left of back-panel.
  // For text.
  translate(-256,
            -256,
            0);
  
  fill(200);
  strokeWeight(1);
  stroke(0);
  textAlign(LEFT,TOP);
  textSize(24);
  text(mess,0,0);
  */
  
  // Turn depth test back on now that
  // we have printed text to screen.
  gl.enable(gl.DEPTH_TEST);
  
  pop();
  
  
}