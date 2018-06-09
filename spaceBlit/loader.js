let message="loading";
function loadMe(){
    // Loading mode.
    
    let speed = 2;
    
    let r = height/12; 
    
    // Text size.
    let txtS = 32;
  
    // Outline colour of
    // obrital knot.
    stroke(100,12);
    // Fill colour of 
    // orbital knot.
    fill(0,242,242,12); 
    // Circle shape, which
    // renders the knot.
    // Position determined
    // by polar co-ords.
    ellipse(
        width/2+r*
        Math.cos(frameCount/20*speed),
        height/2+r*
        Math.sin(frameCount/30*speed),
        64);
   
    // Fill colour of text.
    fill(255);
    // Outline colour of 
    // text.
    //stroke(0);
    noStroke();
    // Thickness of stroke.
    //strokeWeight(2);
    // Apply text size.
    textSize(txtS);
   
    // Render message to 
    // canvas.
    text(message,
         width/2-message.length/2*
         txtS/2,
         height/2+txtS);
    
    // Click when ready message.
    if (howMuchMusicLoaded ===
       assetsLoadTotal - 1){
        
        message = "done!";
        
        let clickMessage = 
        "tap when ready";    
        fill(0,242,242);
        noStroke();
        text(clickMessage,
         width/2-clickMessage.length/2*
         txtS/2.2,
         txtS * 3.14);
    }
}

function loadMe_orig(){
    let r = height/12; 
        //let message = "Loading new Universe";
        let message="loading";
        let txtS = 32;
   
       stroke(0);
       fill(0,242,242); ellipse(width/2+r*Math.cos(frameCount/100),height/2+r*Math.sin(frameCount/100),42);
        
        noStroke();
        fill(255);
        textSize(txtS);
        text(message,width/2-message.length/2*txtS/2,height/2+txtS*2);
}