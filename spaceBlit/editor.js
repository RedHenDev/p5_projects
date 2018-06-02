// Editor!
let gridBoxes = [];

function drawGrid(){
    
    background(0,29,0,10);
    
    let pad = width/20;
    let Wpad = width/10;
    
    let boxN = 7;
    
    if (gridBoxes.length===0){
        
        console.log("Creating boxes.");
    for (let i=0;i< boxN;i++){
        for (let j=0;j<boxN;j++){
        let x = Wpad + i * pad;
        let y = Wpad + j * pad;
        let gb = new GridBox(x,y,pad,
                             j+1,i+1);
        gridBoxes.push(gb);
        }
    }
    }
    
    renderGridBoxes();
    
}


function mousePressed(){
    // Return if not in Editor mode.
    //if (gameMode!==0) return;
    touchThrust = true;
    // Toggle box's 'populated'.
    for (let i=0; i<
            gridBoxes.length;i++){
        if(gridBoxes[i].checkMouse()){
            gridBoxes[i].p=
                !gridBoxes[i].p
        }
    }
    
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


    