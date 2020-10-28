// Saving and loading.

// Tues 27th October 2020.

function loadPlats(_file){
  // First, just load a JSON from
  // uploaded file.
  // Later, really need 
  // fileChoose etc.
  
  // How can I make sure this loads
  // before moving on? Let's try 
  // a callback.
  
  // Nope, now done with promise,
  // fetch, and arrow functions.
  
  
  // let promise = fetch('plats.json')
  //   .then(response => response.json())
  //   .then(json => loadIt(json))
  //   .catch(error => console.log(error));
  
  // Should probably do this with
  // await and async.
  loadIt(_file.data);
}

function loadIt(_json){
  console.log('Got the json!');
  // First, empty out plats array.
  plats = [];
  let jPlats = _json;
  // Now, build new plat objects
  // with reference to platform
  // arrays stored on json.
  let jojo; // Our new object.
  for (let i = 0; 
       i < jPlats.len; i++){
    
    // What type of object is this?
    if (jPlats.name[i] == 'platform'){
      jojo = new 
      Platform(jPlats.x[i],
               jPlats.y[i]);
      //console.log('platform added');
    }
    else if (jPlats.name[i] == 'subject'){
      jojo = new 
      Subject( jPlats.x[i],
               jPlats.y[i]);
      //console.log('subject added');
    }
		
		// Boiler plate stuff common to
		// objects.
		plats.push(jojo);
    // Use static function, which
    // correctly recalculates width info --
    // has to be after it's pushed to array,
		// since the status function accesses
		// 'jojo' here via the plats array itself.
		jojo.h = jPlats.h[i];
    Platform.changeWidth(i,jPlats.w[i]);
    
  }
  
  // Reset relative translation.
  x = 0;
  y = 0;
  // Begin in edit mode.
  playmode = false;
  // Begin with default plat type.
  whichPlatType = 0;
  // Done!
  console.log('level loaded!');
}

function savePlats(){
  console.log("saving plats...");
  
  // So, I basically would love to just bang
  // the plats[] array onto a json and 
	// go from there?
	// ...Nope. Well, let's try it disaggregated.
	
	// Here's the main json object.
  let jPlats = {};
  // Platform properties in arrays.
  jPlats.x = [];
  jPlats.y = [];
  jPlats.w = [];
  jPlats.h = [];
  jPlats.name = [];
	jPlats.img = [];
	jPlats.useImg = [];
  // Number of platforms (plats.length) --
  // required for loading with for loop.
  jPlats.len = plats.length;
  for (let i = 0; i < plats.length; i++){
		// If plat type is 'Platform'.
    jPlats.x[i] = plats[i].p.x;
    jPlats.y[i] = plats[i].p.y;
    jPlats.w[i] = plats[i].w;
    jPlats.h[i] = plats[i].h;
    jPlats.name[i] = plats[i].name;
		jPlats.img[i] = plats[i].img;
		jPlats.useImg[i] = plats[i].useImg;
		// If plat type is 'Subject'.
  }
  
	// Aaaaand save this unholy mess to JSON.
  saveJSON(jPlats, 'plats.json');
}
