// Character class.

// What do we need?

// We need a position, essentially,
// What else? We need like the type
// of character we are.

// And then, perhaps, augmenting this,
// what animations etc. etc.

// ************************
// ************************

var rh_textFields = [];

class RedHen_tChar {
    
    // Sets things up and creates
    // a new 'text field'.
    // We might have
    // an array of text fields,
    // which will therefore
    // probably be objects in
    // their own right.
    static newTextField(_marginSize, _width, _height, startPos_x, startPos_y){
        
        // There is here the question
        // of how to structure the
        // polymorphism.
        // Obvious answer points us
        // towards the lowest object
        // dangling on the chain.
        rh_textFields.push(
        new TextField(_marginSize, _width, _height, startPos_x, startPos_y));
        
    }
    
}

class TextField {
    constructor(_marginSize, _width, _height, startPos_x, startPos_y){
        
        // OK, we'll at least leave
        // polymorphism till later!
        
        this.marginSize = _marginSize;
        this.startPos = createVector(startPos_x, startPos_y);
        this.width = _width;
        this.height = _height;
        
        // Where are we currently
        // typing?
        // At initialisation, this
        // is set to start position.
        // So, this means the top-
        // left of the text field.
        this.cursorPos = createVector(this.startPos.x, this.startPos.y);
        
        // An array to manage
        // the tChar objects.
        this.tChars = [];
        
    }
    
    typeSomething(_char){
        this.tChars.push(new tChar(_char, this.cursorPos.x, this.cursorPos.y));
                         
        adjustCursorPos(31);
    }
    
    adjustCursorPos(_amount){
        // This is when we need to
        // work out when to move
        // down a line, and when we
        // hit the side of the text
        // field, minus margin, and
        // all of this relative to
        // current font-size etc.
        
        // If left null, then
        // perhaps this method
        // ought to calculate the
        // cursor pos by iterating
        // over all the tChars etc.?
        
        this.cursorPos.x += _amount;
        
    }
    
    printChars(){
        for (let i = 0; i < this.tChars.length; i++){
            this.tChars[i].print();
        }
    }
}


class tChar {
    constructor(_char, _x, _y){
        // How will the char
        // know how to work
        // out where its
        // position is?
        
        this.string = _char;
        
        // We should use a
        // static method to
        // grab this position.
        // No -- will be
        // managed by a higher
        // order object, the
        // 'text field'.
        this.pos = createVector
        (_x, _y);
        
        this.rotation = 0;
        
        this.fontSize = 64;
        this.stroke = color(255);
        this.fill = color(200,0,200);
        
        
    }
    
    print(){
        push();
        
        translate(this.pos.x, this.pos.y);
        rotate(radians(this.rotation));
        
        text(this.string, this.pos.x, this.pos.y);
        
        pop();
    }
    
}