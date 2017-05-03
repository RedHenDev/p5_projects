//<script src="https://gist.github.com/justfun23/a8f3982cd53d08b777ea7521ebab51c9.js"></script>

var streams = [];
var fadeInterval = 1.6;
var symbolSize = 20;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
        
        streams.push(new Stream());
        streams[i].generateSymbols(x, random(-2000, 0));
        x += symbolSize;
    }
    textFont('Consolas');
    textSize(symbolSize);
}

function draw() {
    var rb = random(100, 255);
    var gb = random(100, 255);
    var bb = random(100, 255);
    background(rb, gb, bb, 100);
    streams.forEach(function (stream) {
        stream.render();
    });
}

function Symbol(x, y, speed, first, opacity) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.first = first;
    this.opacity = opacity;
    this.switchInterval = round(random(2, 25));
    this.setToRandomSymbol = function () {
        var charType = round(random(0, 5));
        if (frameCount % this.switchInterval == 0) {
            if (charType > 1) {
                this.value = String.fromCharCode(0x30A0 + round(random(0, 95)));
            }
            else {
                this.value = round(random(0, 9));
            }
        }
    }
    this.rain = function () {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }
}

function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 35));
    this.speed = random(5, 22);
    this.generateSymbols = function (x, y) {
        var opacity = 255;
        var first = round(random(0, 4)) == 1;
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed, first, opacity);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            opacity -= (255 / this.totalSymbols) / fadeInterval;
            y -= symbolSize;
            first = false;
        }
    }
    this.render = function () {
        this.symbols.forEach(function (symbol) {
            var r = random(255);
            var g = random(255);
            var b = random(255);
            if (symbol.first) {
                fill(140, 255, 170, symbol.opacity);
            }
            else {
                fill(r, g, b, symbol.opacity);
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}