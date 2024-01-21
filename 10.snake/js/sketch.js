// Resolution
let res = 50;

// Snake & Apple instances
let snake, apple;

// Numbers of rows and columns
let rows, cols;
let mapWidth, mapHeight;

const scribble = new Scribble();


// Initialize function
function setup() {
	angleMode(DEGREES);
	createCanvas(windowWidth, windowHeight);

	cols = floor(width / res);
	rows = floor(height / res);
	mapWidth = cols * res;
	mapHeight = rows * res;

	snake = new Snake;
	apple = new Apple;

	setFrameRate(30);
	textSize(24);
}


// Main loop function
function draw() {
	background(26, 26, 26);

	// drawMap();

	apple.draw();

	snake.move();
	snake.draw();

	if (snake.eats(apple.pos)) {
		snake.eat();

		apple.setPos();
	}
}


// On event resizing window
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);

	rows = floor(height / res);
	cols = floor(width / res);
}


// Drawing background
function drawMap() {
	stroke(250);
	noFill(100);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			rect(i * res, j * res, res, res);
		}
	}
}


// Player control
function keyPressed() {
	if (keyCode === 37) snake.setDir('left');
	if (keyCode === 38) snake.setDir('up');
	if (keyCode === 39) snake.setDir('right');
	if (keyCode === 40) snake.setDir('down');

	if (keyCode === 80) noLoop();
	if (keyCode === 79) loop();
	if (keyCode === 73) draw();
}


