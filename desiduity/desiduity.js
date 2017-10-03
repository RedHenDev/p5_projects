
var nodes = [];
var numNodes = 0;

function setup(){
    
    createCanvas(windowWidth, windowHeight);
    
    background(0,101,202);
    
    
}

function draw(){
    
}

function touchEnded(){
    nodes[numNodes] = new Node(numNodes);
    numNodes++;
    nodes[nodes.length-1].placeMe(nodes[numNodes-2]);
    nodes[nodes.length-1].renderNode();
}

function seedTree(){
    
    // It would be cool to be able to
    // watch the tree grow each time
    // we run the application.
    // And, that the tree will look
    // different according to some
    // Perlin noise. In that way we
    // could 'seed' it for real in some sense.
    
    // So perhaps we could determine
    // a set of nodes for the trunk, which
    // determine Bezier curves from pre-determined
    // points from the base of the screen,
    // which determine that the trunk always
    // flairs at the bottom.
    
    // Next, for the branches, it would be
    // nice to use recursion, or a loop, whose
    // behaviour is also driven by the seed.
    
    // OK, new plan. Just some nodes snaking
    // upwards, according to Perlin, and then
    // being 'fitted' with two lines.
    
}

class Node{
    constructor(_index){
        this.index = _index;
        this.pos = createVector(width/2,height);
        
        this.growthRate = 10;  // This many pixels up.
        this.xGrowth = 12;     // Xaxis move, due to Perlin.
        
        this.perlinXpos = 0;
        this.perlinRes = 10;
        
    }
    
    seedMe(_seed){  
        // Perlin noise.
        noiseSeed(_seed);
    }
    
    iteratePerlin(){
        // Increase offset of Perlin.
        this.perlinXpos += this.perlinRes;
        
        // Apply Perlin 'path' to node's x pos.
        this.pos.x +=   (-this.xGrowth/2) +
                        (noise(this.perlinXpos) *
                        this.xGrowth);
    }
    
    renderNode(){
        // Renders node itself.
        stroke(255,100);
        strokeWeight(8);
        fill(0,200,0,101);
        ellipse(this.pos.x, this.pos.y,
               20,20);
    }
    
    placeMe(_previousNode){
        if (!(_previousNode instanceof Node)||
            _previousNode === null)
            {
                // Must be first node!
                // Do seedy things :)
                this.seedMe(9);
            }
        else    {
                    // Just a normal node.
                    // Wonder what to do
                    // when terminal node?
                    
                    // Anyway, first clone previous node.
                    // Then, push pos up by growth rate.
                    // Finally, iterate Perlin for xGrowth.
                    this.perlinXpos =
                        _previousNode.perlinXpos;
                    this.perlinRes = 
                        _previousNode.perlinRes;
                    this.growthRate = 
                        _previousNode.growthRate;
                    this.xGrowth = _previousNode.xGrowth;
                    this.pos = _previousNode.pos;
                    this.pos.y -= this.growthRate;
                    this.iteratePerlin();
                }
    }
}
