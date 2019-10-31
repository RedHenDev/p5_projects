// This class assumes rectMode(CENTER).

class Button{
    
    constructor(x,y,wid,hei){
        // Position of button.
        this.pos = createVector(x,y);
        // Dimensions.
        this.size = createVector(wid,hei);
        // Fill colour of button. 
        this.fill = createVector();
        // Alpha.
        this.alpha = 100;
        // Stroke colour of button.
        this.stroke = createVector();
        this.weight = 2;
        // Am I being hovered over?
        this.hover = false;
        // Label.
        this.text = "Y7 winner";
        // Sine rate?
        this.sRate = 12;
        // Visible?
        this.visible = true;
        
        // For hypertext.
        this.link = "https://nationalpoetryday.co.uk/";
        // Activates hyperlink defaults to false.
        this.hLink = false;
        
    }
    
    hoverCheck(x,y){
        if (x < this.pos.x - this.size.x/2)
            this.hover = false;
        else if (x > this.pos.x + this.size.x/2)
            this.hover =  false;
        else if (y < this.pos.y - this.size.y/2)
            this.hover =  false;
        else if (y > this.pos.y + this.size.y/2)
            this.hover = false;
        else this.hover = true;
    }
    
    render(){
        
        if (!this.hover){
        fill(   this.fill.x,
                this.fill.y,
                this.fill.z,
                this.alpha);
        stroke( this.stroke.x,
                this.stroke.y,
                this.stroke.z);
        strokeWeight(this.weight);
        }
        else{
        fill(   this.fill.x+42,
                this.fill.y+42,
                this.fill.z+42,
                this.alpha);
        stroke( this.stroke.x+10,
                this.stroke.y+10,
                this.stroke.z+10);
        strokeWeight(this.weight*2);
        }
            
        rect(   this.pos.x, this.pos.y,
                this.size.x,this.size.y);
        
        
        textSize(16);
        stroke(0);
        fill(255);
        text(this.text,this.pos.x-this.size.x/2.2,this.pos.y);
            
    }
    
    checkClick(x,y){
        if (x < this.pos.x - this.size.x/2)
            return false;
        else if (x > this.pos.x + this.size.x/2)
            return false;
        else if (y < this.pos.y - this.size.y/2)
            return false;
        else if (y > this.pos.y + this.size.y/2)
            return false;
        else return true;
    }
    
    activate(){
        // For testing.
        plip.play();
        if (this.hLink)
            window.location.href =
                this.link;
    }
    
    animate(){
        this.pos.y += Math.sin((frameCount+this.sRate)/12);
    }
}