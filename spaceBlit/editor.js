// Editor!
let gridBoxes = [];
// Number of boxes x & y.
// 17^2 = 289.
let boxN = 17;

function drawGrid(){
    
    background(0,29,0,10);
    
    let wPad = height/10;
    
    let pad = (height-(wPad*2))/boxN;
    
    // Initialize grid array for
    // first time?
    if (gridBoxes.length===0){
        
    for (let i=0;i< boxN;i++){
        for (let j=0;j<boxN;j++){
        let x = wPad + i * pad;
        let y = wPad + j * pad;
        let gb = new GridBox(x,y,pad,
                             i+1,j+1);
        gridBoxes.push(gb);
        }
    }
    }
    
    renderGridBoxes();
    
    stroke(0);
    //noStroke();
    strokeWeight(2);
    textSize(28);
    fill(0,255,255);
    text("Ship Editor",
         wPad+boxN*pad+32,
         wPad+15);
    
    stroke(0);
    //noStroke();
    strokeWeight(2);
    textSize(28);
    fill(255,255,0);
    text("Design your ship\n\nPress 'space' or\nTap here to launch!",
         wPad+boxN*pad+32,
         wPad+51);
        
    stroke(0);
    //noStroke();
    strokeWeight(2);
    textSize(28);
    fill(255);
    text("Tap ship's\nengine-block\nto return to editor",
         wPad+boxN*pad+32,
         wPad+height/1.8);
    
}

// Array of gridBox arrays loaded?
shA = false;

function loadDesign(_whichShip){
  
    if (shA===false) loadDesigns();
    
    let bxs = shipLoad.boxs;
    
    let j = (boxN*boxN) *
            _whichShip;
    
    console.log(_whichShip + " loading...At position " + j);
    
    for (let i=0;i<gridBoxes.length;i++)
    {
        
        // Sluice array.
        gridBoxes[i].e = false;
        gridBoxes[i].p = false;
        
        gridBoxes[i].e =
            bxs[j+i].e;
        gridBoxes[i].p =
            bxs[j+i].p;
        
    }
           
}

function loadDesigns(){
  
    let bxs = shipLoad.boxs;
    
    // j cycles through at
    // intervals of total number of
    // gridboxes.
    for (let j=0;j<
         bxs.length;
         j+=(boxN*boxN)){
    for (let i=0;i<gridBoxes.length;i++)
    {
        
        // Sluice array.
        gridBoxes[i].e = false;
        gridBoxes[i].p = false;
        
        gridBoxes[i].e =
            bxs[j+i].e;
        gridBoxes[i].p =
            bxs[j+i].p;
        
    }
        
    }
    
    // Ship designs loaded :)
    shA = true;
    console.log(bxs.length/289 + " designs loaded!");
 
}

// Array to store all ship
// designs in this session.
let totalSsf = [];
function concatDesign(_array){
    let tempA = [];
    tempA = concat(totalSsf, _array);
    totalSsf = [];
    totalSsf = tempA;
}

// Append all designs in this session
// to existing file.
function saveDesign(){
    // We want to convert the array
    // to an object that can be
    // passed to the JSON.
    let jFile = {};
    
    //jFile.boxs = _array;
        
    //saveJSON(jFile, 'designs.json');
    
    // Will I also be able to 
    // *append* to the JSON?
    // Yes-> first we grab the 
    // existing designs from the JSON.
    let ssf = [];
    ssf = shipLoad.boxs;
    // Then we concatenate the saved
    // ship designs from this session.
    jFile.boxs = concat(ssf, totalSsf);
    saveJSON(jFile, 'designs.json');
}

// Used to create an initial JSON.
function saveBasic(_array){
    // We want to convert the array
    // to an object that can be
    // passed to the JSON.
    let jFile = {};
    
    jFile.boxs = _array;
        
    saveJSON(jFile, 'designs.json');
}

function mousePressed(){
    
    if (gameMode===1){
        touchThrust = true;
    }
    // Return if not in Editor mode.
    if (gameMode!==0) return;
    
    // For detecting tapping off
    // grid to exit editor.
    let offTap = true;
    
    // Toggle box's 'populated'.
    // If first/only populated box,
    // then set as 'engine block'.
    for (let i=0; i<
            gridBoxes.length;i++){
        if(gridBoxes[i].checkMouse()){
            
            // Not an offTap.
            offTap = false;
            
            gridBoxes[i].p=
                !gridBoxes[i].p;
            // If now not populated,
            // cannot be an engine.
            if (!gridBoxes[i].p)
                gridBoxes[i].e=false;
            else{
            // If no others populated
            // then make this newly 
            // populated engine block.
            let oP = true;
            for (let j=0;
                j<gridBoxes.length;
                j++){
                    if (i!==j &&
                       gridBoxes[j].e){
                        oP = false;
                        break;
                    }
    
                }
            if (oP) gridBoxes[i].e=true;
            }
            // Found the right box
            // so can break out of check.
         break;  
        } 
        
    }
    
    // If here, we could
        // exit editor -- tap off grid.
        if (offTap) {
            
            // Testing Json saving...
            // Click left high to save,
            // right low to load...
            if (mouseX < width/2){
                if (mouseY < height/2)
                concatDesign(gridBoxes); else
                    loadDesign(
                    Math.floor(
                    Math.random()*6));
            }
            else gameMode = 1;
        }
    
    // Construct newly designed ship!
    cybers[0].construct(gridBoxes);
    
}

function renderGridBoxes(){
    // Check for highlighting here.
    // MousePressed (above) checks
    // to populate grid.
    for (let i=0; i<
            gridBoxes.length;i++){
            if(gridBoxes[i].checkMouse())
               gridBoxes[i].h = true;
        else gridBoxes[i].h = false;
            gridBoxes[i].render();
        }
}

class GridBox{
    constructor(x,y,r,gX,gY){
        this.x = x;
        this.y = y;
        this.r = r;
        // Grid index.
        this.gX = gX;
        this.gY = gY;
        
        // Highlighted?
        this.h = false;
        // Populated?
        this.p = false;
        // Engine block?
        this.e = false;
    }
    
    checkMouse(){
        if (mouseX < this.x-this.r/2 ||
           mouseX > this.x+this.r/2 ||
           mouseY < this.y-this.r/2 ||
           mouseY > this.y+this.r/2){
            return false;
        }
        else return true;
    }
    
    render(){
        stroke(0,0,120);
        strokeWeight(3);
        
        // Populated/non-populated
        // base colour.
        // Nod to Shiffman 51 :)
        if (this.p) {
            fill(51);  
        } else fill(250);
        
        if (this.e) fill(0,250,250);
        
        rect(this.x,this.y,
             this.r-3,this.r-3);
        
        // Highlight overlay.
        if (this.h) {
            fill(255,255,0,100);
            rect(this.x,this.y,
             this.r,this.r);
        }
    }
}


    