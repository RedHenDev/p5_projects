var canvas;// = document.getElementById('canvas');
//var context = canvas.getContext('2d');

var jumperColor = '#660033';;
var jumperXSpeed = 10;
var gravity = 9.8;

var brickList = [];

function setup(){
    canvas = createCanvas(600,600);
}

var jumper =
{
width: 30,
height: 30,
x: 450,
y: 50,
mass: 100,

speedX: 0,
speedY: 0
}

var brick = createBrick(100, 500, 400, 20);
brickList.push(brick);
brick = createBrick(400, 300, 200, 20);
brickList.push(brick);

registerKeyboard();
setInterval(gameController, 10);

function gameController()
{
draw();
move();
}

function move ()
{
moveJumper()
}

function draw ()
{
clearCanvas();
drawJumper();
drawBricks();
GotoMidGuys();
}

function drawBricks() {
for (var i = 0; i < brickList.length; i++) {
var brick = brickList[i];
context.fillStyle = "#3E263A";
context.fillRect(brick.x, brick.y, brick.width, brick.height);
}
}

function moveJumper()
{
jumper.x += jumper.speedX;
jumper.y += jumper.speedY;

jumper.speedY += 0.2;
if (jumper.speedY >= 10) {
	jumper.speedY = 10;
}
}

function getRandomCoordinate()
{
return Math.floor(Math.random() * squareCount + 1);
}

function clearCanvas()
{
background(51);
    //context.clearRect(0, 0, 600, 600);
}

function drawJumper ()
{
context.fillStyle = jumperColor;
//context.fillRect(jumper.x, jumper.y, jumper.width, jumper.height);
}

function GotoMidGuys()
{
document.getElementById("canvas").style.marginLeft = "auto";
document.getElementById("canvas").style.marginRight = "auto";
canvas.style.display = 'block';
}

function registerKeyboard() {
document.addEventListener('keydown', function (event) {
/*
key codes
W = 119
S = 115
A = 65
D = 68
*/

	if(event.keyCode == 87)
	{
		jumper.speedY = -10;
	}
	if(event.keyCode == 65)
	{
		jumper.speedX = -jumperXSpeed;
	}
	else if(event.keyCode == 68)
	{
		jumper.speedX = jumperXSpeed;
	}
}); 

document.addEventListener('keyup', function() {
	console.log('key up')
	if(event.keyCode == 119)
	{
	}
	if(event.keyCode == 65 || event.keyCode == 68)
	{
		jumper.speedX = 0;
	}
});
}

function createBrick(x, y, width, height) {
return {
width: width,
height: height,
x: x,
y: y
}
}

function checkCollisions ()
{
checkBrickcollisions();
}

function checkBrickCollisions ()
{
for (var i = 0; i < brickList.length; i++) {
var brick = brickList[i];
if (jumper.x + jumper.width >= brick.x && jumper.x <= brick.x + brick.width && jumper.y > brick.y && jumper.y <= brick.y + brick.height)
{
jumper.speedY -= jumper.speedY ;
jumper.speedx -= jumper.speedx ;
gravity -= gravity;
}
}
}