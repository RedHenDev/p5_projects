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

function locomotion(){
  if (key=='w' ||
       keyCode==UP_ARROW){
     
   
      pos.x +=
        Math.floor(Math.sin(radians(-myRot))*
                   bs);
    
      pos.z +=
        Math.floor(Math.cos(radians(myRot)) *
                   bs);
    
      //pos.x = Math.floor(pos.x);
      //pos.z = Math.floor(pos.z);
    
    }
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
