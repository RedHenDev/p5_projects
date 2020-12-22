// Call locomotion due to tap holding?
let dashing = false;

function mousePressed(){
  
  // On mousePress() or touch,
  // permit sounds.
  if (!getAudioContext()){
    getAudioContext();
  }
  
  
  
  // Toggle between display modes.
  // User must tap top right of screen.
  if (mouseY < height*0.15 &&
      mouseX > width - (width * 0.33)){
    s_menu.play();
    if (gameMode==='main')
      gameMode='map';
    else if (gameMode==='map')
      gameMode='main';
  }
  
  // Toggle into message mode.
  // User must tap top left of screen.
  else if (mouseY < height*0.15 &&
      mouseX < width * 0.33){
    s_menu.play();
    if (gameMode==='message'){
      gameMode='main';
      // We have seen message now,
      // so we can reset messages.
      newMessage=false;
    }
    else {
      gotMail();
         }
  }
    
  else if (gameMode==='main') {
    // User has tapped bottom two-thirds
    // of screen.
    // Ask locomotion() for forwards
    // movement -- just as if pressing
    // up arrow etc.
    //Toggle movement with tap.
    dashing = !dashing;
    
  }
  
  //genTerrain();
  
}

let mouseSteer = false;
function mouseMoved(){
  if (mouseSteer==false) return;
  
//   // Determine direction by how
//   // much the mouse has moved in
//   // either X or Y, but not both.
//   if (Math.abs(mouseX-prevX)>
//       Math.abs(mouseY-prevY)){
//     vDir.z = 0;
//     if (mouseX>prevX)
//       vDir.x = -1;
//     else vDir.x = 1;
//   } else {
//     vDir.x = 0;
//     if (mouseY>prevY)
//       vDir.z = -1;
//     else vDir.z = 1;
//          }
  
//   // Steering.
//   //if (mc && frameCount % 2 == 0){
//     if (gameMode==='main'){
//     pos.x += vDir.x * bs;
//     pos.z += vDir.z * bs;
//             }
}

// Make sure we only move when supposed to.
let moveReady = true;
function keyReleased(){
  if (key=='w' ||
      keyCode==UP_ARROW ||
      key=='s' ||
      key=='a' ||
      key=='d' ||
      keyCode==DOWN_ARROW ||
      keyCode==LEFT_ARROW ||
      keyCode==RIGHT_ARROW)
  moveReady = false;
}
function keyPressed(){
  if (key=='w' ||
      keyCode==UP_ARROW ||
      key=='s' ||
      key=='a' ||
      key=='d' ||
      keyCode==DOWN_ARROW ||
      keyCode==LEFT_ARROW ||
      keyCode==RIGHT_ARROW)
  moveReady = true;
}

function locomotion(_dashing){
  if (moveReady==false &&
     _dashing!=true) {
    
    return;}
  
  // Set to true once a movement key
  // is released.
  //moveReady = false;
  
  // First, what direction does the user
  // want, based on key pressed?
  vDir.x = 0;
  vDir.z = 0;
  let theta = myRot;
  if (_dashing || key=='w' ||
      keyCode==UP_ARROW){
    vDir.z = 1;
    // Lerp subject's model's rotation
  // to mouse rotation.
  stagRot=lerp(stagRot,myRot,0.42);
  }
  if (key=='s' ||
      keyCode==DOWN_ARROW){
    vDir.z = -1;
    // Lerp subject's model's rotation
  // to mouse rotation.
  stagRot=lerp(stagRot,myRot,0.42);
  }
  if (key=='a' ||
      keyCode==LEFT_ARROW){
    myRot-=4.2;
    
    // Legacy - strafing.
    // Which worked like a charm,
    // by the way.
    //vDir.z = -1;
    //theta += 90;
  }
  if (key=='d' ||
      keyCode==RIGHT_ARROW){
    myRot+=4.2;
    
    // Legacy - strafing.
    //vDir.z = 1;
    //theta += 90;
  }
  
  
  
  // Now work out movement across grid,
  // according to polar-coordinates.
      let toMoveX = 
          Math.sin(radians(-theta));
  
      let toMoveZ =
          Math.cos(radians(-theta));
        
        // Round value so that we move
        // according to grid size -- else
        // strange fluctuations in Perlin.
        // Eureka!!
        pos.x += bs *
          Math.round(toMoveX)*
          vDir.z;
        pos.z += bs *
          Math.round(toMoveZ)*
          vDir.z;
        // if (vDir.z){
        //   pos.x += vDir.z * 
        //     bs * Math.round(toMoveX);
        //   pos.z += vDir.z *
        //     bs * Math.round(toMoveZ);
        // }
        // if (vDir.x){
        //   pos.z += vDir.x * 
        //     bs * Math.round(toMoveX);
        //   pos.x += vDir.x *
        //     bs * Math.round(toMoveZ);
        // }
    
}

function checkKeys(){
  //noCursor();
  
  let moved = false;
  
  /*
  if (keyCode == UP_ARROW){
    upY = Math.floor(upY);
    //console.log(upY-posY);
    if (upY - posY > 1) return;
    vDir.x = 0;
    vDir.z = 1;
    
    moved = true;
  }
  else if (keyCode == DOWN_ARROW){
    downY = Math.floor(downY);
    //console.log(downY-posY);
    if (downY - posY > 1) return;
    vDir.x = 0;
    vDir.z = -1;
    
    moved = true;
  } 
  else if (keyCode == LEFT_ARROW){
    leftY = Math.floor(leftY);
    //console.log(leftY-posY);
    if (leftY - posY > 1) return;
    vDir.x = 1;
    vDir.z = 0;
    
    moved = true;
  } 
  else if (keyCode == RIGHT_ARROW){
    rightY = Math.floor(rightY);
    //console.log(rightY-posY);
    if (rightY - posY > 1) return;
    vDir.x = -1;
    vDir.z = 0;
    
    moved = true;
  } 
  */
  if (key == 'w' || keyCode == UP_ARROW){
    //rightY = Math.floor(rightY);
    //if (rightY - posY > 1) return;
    vDir.x=0;
    vDir.z=0;
    
    if (myRot<65){
      vDir.z=1;
    }
    else if (myRot<150){
      vDir.x=-1;
    }
    else if (myRot<235){
      vDir.z=-1;
    }else if (myRot<320){
      vDir.x=1;
    } else vDir.z=1;
    
    moved = true;
  } 
  else if (key == 's' || 
           keyCode == DOWN_ARROW){
    //rightY = Math.floor(rightY);
    //if (rightY - posY > 1) return;
    vDir.x=0;
    vDir.z=0;
    
    if (myRot<65){
      vDir.z=-1;
    }
    else if (myRot<150){
      vDir.x=1;
    }
    else if (myRot<235){
      vDir.z=1;
    }else if (myRot<320){
      vDir.x=-1;
    } else vDir.z=-1;
    
    moved = true;
  } 
  else if (key == 'd' || 
           keyCode == RIGHT_ARROW){
    //rightY = Math.floor(rightY);
    //if (rightY - posY > 1) return;
    vDir.x=0;
    vDir.z=0;
    
    if (myRot<65){
      vDir.x=-1;
    }
    else if (myRot<150){
      vDir.z=-1;
    }
    else if (myRot<235){
      vDir.x=1;
    }else if (myRot<320){
      vDir.z=1;
    } else vDir.x=-1;
    
    moved = true;
  } else if (key == 'a' || 
           keyCode == LEFT_ARROW){
    //rightY = Math.floor(rightY);
    //if (rightY - posY > 1) return;
    vDir.x=0;
    vDir.z=0;
    
    if (myRot<65){
      vDir.x=1;
    }
    else if (myRot<150){
      vDir.z=1;
    }
    else if (myRot<235){
      vDir.x=-1;
    }else if (myRot<320){
      vDir.z=-1;
    } else vDir.x=1;
    
    moved = true;
  } 
  
  
  
  else{
    moved = false;
    // Have commented these out so as
    // to allow...?
    vDir.x = 0;
    vDir.z = 0;
    return;
  }
  
  // if (moved){
  //   // Position of subject.
  // // NB cols*5 etc. because this is 
  // // the centre position used by subject.
  // myX = Math.floor((adjust+cols*
  //           0.5-(pos.x/20))-19996);
  // myZ = Math.floor((adjust+rows*
  //           0.5-(pos.z/20))-19996);
  // }
  
  
  
  // Steering.
  if (gameMode==='main'){
    pos.x += vDir.x * bs;
    pos.z += vDir.z * bs;
          }
  
  vDir.x=0;
  vDir.z=0;

}
