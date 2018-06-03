// Editor!
let gridBoxes = [];

function drawGrid(){
    
    background(0,29,0,10);
    
    let boxN = 17;
    
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

function loadDesign(){
  
    let bxs = shipLoad.boxs;
    
    for (let i=0;i<gridBoxes.length;i++)
    {
        
        // Sluice array.
        gridBoxes[i].e = false;
        gridBoxes[i].p = false;
        
        gridBoxes[i].e =
            bxs[i].e;
        gridBoxes[i].p =
            bxs[i].p;
    }
        
}

function saveDesign(_array){
    
    // We want to convert the array
    // to an object that can be
    // passed to the JSON.
    // Will I also be able to 
    // *append* to the JSON?
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
            if (mouseX < width/2){
                loadDesign();
                //saveDesign(gridBoxes);
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


    