// For dealing with all editor input.

// Tues 27th Oct 2020.

// keyboard functions at top.
// Mouse at bottom.

function keyPressed(){
  
  // Toggle playmode with space.
  // if(keyCode===32){
  //   playmode=!playmode;
  // }
  
  // Edit mode.
  if (!playmode){
  // Test for changing object type.
  // I think I want this done via
  // the DOM -- and by all means 
  // incorportate a shortcut key.
  if (key=="s"){
    whichPlatType++;
    if (whichPlatType>1) whichPlatType = 0;
  }
  
  // Don't want unfortunate deletions etc.
  // So -- ignore keys if mouse off canvas.
  if (mouseY > height) return;
  
  // No platforms?
  if (plats.length < 1) return;
  
  // Backspace pressed?
  if (keyCode===BACKSPACE){
    // Does this presently selected
    // exist, and is it selected?
    if (plats[prevSel] &&
        plats[prevSel].selected)
        plats.splice(prevSel,1);
    return;
  }
  } // End of edit mode keys.
  
  
}

// Movement by arrowkeys/wsad.
// Everything is translated relative.
// NB reset when level loaded.
let x = 0;
let y = 0;
function checkNavInput(){
  
  // Space-bar pressed?
  if (keyCode===32){
    // Maybe duplicate?
    // We'll use this to bring user
    // back to 'home start' of level.
    x = 0;
    y = 0;
    return;
  }
  
  // Don't want unfortunate deletions etc.
  // So -- ignore keys if mouse off canvas.
  if (mouseY > height) return;
  
  // This now placed in draw().
  // Perform translation.
  //translate(x,y);
  
  // Shouldn't need this now since
  // we're called this function from
  // keyPressed().
  if (keyIsPressed===false) return;
  
  let speed = 12;
  
  if (key=="w" || keyCode==
     UP_ARROW){
    //spaceVoice.speak("going up");
    y+=speed;
  }
  if (keyCode==DOWN_ARROW){
    //spaceVoice.speak("going down");
    y-=speed;
  }
  if (key=="a" || keyCode==
     LEFT_ARROW){
    x+=speed;
  }
  if (key=="d" || keyCode==
     RIGHT_ARROW){
    x-=speed;
  }
}

function mouseMoved(){
  if (!amDragging)
  canPlace = true;
}

function mouseDragged(){
  
  if (mouseY > height) return;
  
  // Manage selection.
  if (!amDragging)
  mouseSelect(false);
  
  // Check that mouse is over a 
  // platform before trying anything.
  if (plats[prevSel] &&
      plats[prevSel].mouseOver){}
  else return;
  
  // Move item according to mouse pos.
  // x and y are position offset for
  // navigation while editing level.
  // dmX and dmY are mouse offset.
  if (plats[prevSel]){    
    amDragging = true;
    plats[prevSel].p.x = mouseX-x-dmX;
    plats[prevSel].p.y = mouseY-y-dmY;
  }
}

function mouseSelect(toggle){
  // Select highlighted platform.
  for (let i = 0; i < plats.length; i++){
    if (plats[i].mouseOver){
      
      // ********************************
      // We're over an object, so do not
      // permit creation of new objects.
      canPlace = false;
      
      // Judge where mouse is in relation
      // to selected obj. For dragging
      // without having obj jump to being
      // centred around mouse.
      // OK - I think this needs to happen
      // in mouseSelect. Hmmmm.
      // NB x and y are edit nav offsets.
      dmX = mouseX - plats[i].p.x - x;
      dmY = mouseY - plats[i].p.y - y;
      
      // ********************************
      
      // Toggle or select object.
      if (toggle){
        plats[i].selected =
        !plats[i].selected;
      }
      else { 
        plats[i].selected = true;}
  
      // ? Needs comment.
      if (plats[prevSel] && prevSel !== i){
          plats[prevSel].selected = false;
          }
      
      // Populate input value with width
      // of selected platform.
      // But if nothing now selected,
      // set prevSel to -1.
      if (plats[i].selected){
        prevSel = i;
        butInput.value(plats[i].w);
      } else prevSel = -1;
      
      // Job done -- exit loop & function!
      return;
    }
  }
}

function mousePressed(){
  
  if (mouseY > height) return;
  
  // True argument means selection can
  // toggle obj as selected/not-selected.
  // False selects it no matter what.
  mouseSelect(true);
}

function mouseReleased(){
  
  amDragging = false;
  
  if (mouseY > height) return;
  placePlat(mouseX,mouseY);
  
}
