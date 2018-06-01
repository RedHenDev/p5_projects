// Editor!

function drawGrid(){
    
    background(0,29,0,10);
    
    let pad = width/68;
    let Wpad = width/10;
    
    stroke(200);
    strokeWeight(2);
    
    for (let i=0; i< 34;i++){
        line(   i*pad+Wpad,Wpad,
                i*pad+Wpad,33*pad+Wpad);
        line(   Wpad,i*pad+Wpad,
                33*pad+Wpad,i*pad+Wpad);
    }
    
}