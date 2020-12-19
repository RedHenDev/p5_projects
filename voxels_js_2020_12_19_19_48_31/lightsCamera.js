// Goes between -1 and 1.
// The sun sails on cosine. 
let dayNight = 0;

function sceneLighting(){
  if (mc){
  let cycleSpeed = 0.01;
  dayNight = Math.cos(frameCount *
                      cycleSpeed);
  
  background(0,map(dayNight,1,-1,0,64),
             map(dayNight,1,-1,0,255));
  
  pointLight(255, 255, 111, 
             0, dayNight*1000,700); 
  }
  else background(111);

}

function sceneCamera(){
  // For syncing co-ordinates to grid of
  // voxels in terrain.
  magicNumber = 
      Math.floor(adjust+(cols*0.5));
  
  // Main camera position.
  if (mc){
    
    // See at bottom of script for
    // alternative POV options.
    
    translate(0,              
              0,
              -rows*bs*0.1);
    rotateX(map(mouseY,0,height,-22,-90));
    // Rotation from mouseX.
    let rotSpeed = 0.8;
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
}


// Other POV options.
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
