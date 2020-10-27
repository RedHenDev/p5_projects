// Tues 27th Oct 2020

// DOM Editor controls.

// May have to make these global
// at some point. Like now.
// This is so that we can set value
// of butInput to currently selected
// platform.
let butSave;
let butLoad;
let butInput;
let butPlay;
function setupButtons(){
  
  // Maybe I should organise this
  // either with an array of positions
  // or something, or as a class?
  
  // Padding positions for buttons.
  let pad = 2;
  // Button width and height.
  let bw = 64;
  let bh = bw * 0.618;
  
  butInput = createInput('0','number');
  butInput.changed(valChange);
  butInput.position(pad,
                    height+bh*1+pad);
  butInput.size(bw,bh);
  
  function valChange(){
    // Delimits to positive numbers.
    if (this.value() < 0) this.value(0);
    
    // Let's see if we can change width
    // of selected platform.
    // Should do this in a static method.
    let v = this.value();
    Platform.changeWidth(prevSel, 
                         v);
    
    //console.log(this.value());
  }
  
  butSave = createButton("Save");
  butSave.mousePressed(savePlats);
  butSave.position(pad,height+pad);
  butSave.size(bw,bh);
  
  butPlay = createButton("Play toggle");
  butPlay.mousePressed(h=>
          {
						// Toggle playmode.
            playmode=!playmode;
						// If we're in playmode,
						// work out who our main
						// subject/player is -- so
						// that camera follow works.
						if (playmode){
            	findSubject(); 
						}
						// Since we've just started either
						// mode -- deselect all objects.
						// Previously/Currently selected
						// set to -1, which is 'none'.
						if (plats[prevSel])
							plats[prevSel].selected
							=false;
            prevSel = -1;
          });
  butPlay.position(width-pad-bw,height+pad);
  butPlay.size(bw,bh);
  
  //butLoad = createButton("Load");
  //butLoad.mousePressed(loadPlats);
  butLoad = createFileInput(loadPlats);
  butLoad.position(pad,height + bh*3);
  butLoad.size(bw,bh);
  butLoad.text = 'load';
}