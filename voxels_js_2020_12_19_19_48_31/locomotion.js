let mouseSteer = false;
function mouseMoved(){
  if (mouseSteer==false) return;
  //if (!mc) return;
  //cursor();
  
  // Determine direction by how
  // much the mouse has moved in
  // either X or Y, but not both.
  if (Math.abs(mouseX-prevX)>
      Math.abs(mouseY-prevY)){
    vDir.z = 0;
    if (mouseX>prevX)
      vDir.x = -1;
    else vDir.x = 1;
  } else {
    vDir.x = 0;
    if (mouseY>prevY)
      vDir.z = -1;
    else vDir.z = 1;
         }
  
  // Steering.
  //if (mc && frameCount % 2 == 0){
    if (mc){
    pos.x += vDir.x * bs;
    pos.z += vDir.z * bs;
            }
  
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

function locomotion(){
  if (moveReady==false) {
    
    return;}
  
  // Set to true once a movement key
  // is released.
  //moveReady = false;
  
  // First, what direction does the user
  // want, based on key pressed?
  vDir.x = 0;
  vDir.z = 0;
  let theta = myRot;
  if (key=='w' ||
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
    vDir.z = -1;
    theta += 90;
  }
  if (key=='d' ||
      keyCode==RIGHT_ARROW){
    vDir.z = 1;
    theta += 90;
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
        pos.x += bs * Math.round(toMoveX)*
          vDir.z;
        pos.z += bs * Math.round(toMoveZ)*
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
  if (mc){
    pos.x += vDir.x * bs;
    pos.z += vDir.z * bs;
          }
  
  vDir.x=0;
  vDir.z=0;

}
