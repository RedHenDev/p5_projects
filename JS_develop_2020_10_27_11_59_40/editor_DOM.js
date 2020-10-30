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
let butImgInput;

let butSuperSave;

// Called in mouseSelect -- for populating
// DOM fields with currently selected
// object's properties.
// NB prevSel refers us to the currently
// selected object.
// We'll also just make sure that such
// an object exists -- i.e. that indeed
// some object with that index exists.
// It is a convention so far to set
// prevSel to -1 when nothing selected.
function manageProperties(){
	if (plats[prevSel]){
		// Width text input.
		butInput.value(plats[prevSel].w);
		butImgInput.value(plats[prevSel].imgName);
	}
}

function setupButtons(){
  
  // Maybe I should organise this
  // either with an array of positions
  // or something, or as a class?
  
  // Padding positions for buttons.
  let pad = 2;
  // Button width and height.
  let bw = 64;
  let bh = bw * 0.618;
  
	// OK -- for the image property of our
	// platforms, we could use an input field.
	// This could simply be the name of the file
	// the user wants to use as an image, it
	// necessarily being in the root folder.
	// Perhaps later it would be easy to implement
	// and a good idea to have a 'images' folder?
	// What I still must consider, though, is
	// ease of use, esp. avoiding complication
	// when setting up files and folders.
	// Ideally I'd use something like another
	// createFileInput(); however, I don't know
	// how to organise the save and load from 
	// that point -- we can't seem to be able
	// to simply save the correct path.
	// Instead, then, we're having to upload image
	// files to the p5 Web Editor, else putting
	// files in the correct folder.
	// At least, if I'm going to use an 'images'
	// folder etc. later, I can set this up on
	// p5 editor for students to easily fork or
	// download.
	// But surely there is a way for me to code
	// a search of the root folder for any image
	// files types and then load these into a simple
	// drop down list for users to select from?
	
	butImgInput = createInput('no image');
	butImgInput.input(imgValChanged);
	function imgValChanged(){
		
			// Attempt to load the image.
			// NB plat objects have two image-related
			// properties: one for the image itself
			// called (.img) and one for the name of
			// the file (.imgName), so that we can
			// work with and display the name of the
			// image file in the DOM input field, and
			// not the image object itself!
			// Need to refactor this as a promise.
			if (plats[prevSel]){
				plats[prevSel].img =
					loadImage(this.value());
				plats[prevSel].imgName = this.value();
				plats[prevSel].useImg = true;
			}
		
	}
	butImgInput.position(width*0.5, height+pad);
	butImgInput.size(bw,bh);
	
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
    let v = Math.round(this.value());
    Platform.changeWidth(prevSel, 
                         v);
    
    //console.log(this.value());
  }
  
  butSave = createButton("Save");
  butSave.mousePressed(savePlats);
  butSave.position(pad,height+pad);
  butSave.size(bw,bh);
	
	butSuperSave = createButton("Super Save");
  butSuperSave.mousePressed(superSavePlats);
  butSuperSave.position(pad+bw+pad,height+pad);
  butSuperSave.size(bw,bh);
  
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
						// Also, manage subject start pos.
						resetLevel();
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
	
	// Experiment.
	
  //butLoad = createButton("Load");
  //butLoad.mousePressed(loadPlats);
  butLoad = createFileInput(loadPlats);
  butLoad.position(pad,height + bh*3);
  butLoad.size(bw*3,bh);
}