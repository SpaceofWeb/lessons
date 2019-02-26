// Resolution
let res = 20;

// Snake & Apple instances
let snake, apple;

// Numbers of rows and columns
let rows, cols;



// Initialize function
function setup() {
	createCanvas(windowWidth, windowHeight);

	rows = floor(height / res);
	cols = floor(width / res);

	snake = new Snake;
	apple = new Apple;

	setFrameRate(6);
	textSize(24);
}



// Main loop function
function draw() {
	background(0);

	drawMap();

	snake.move();
	snake.draw();

	apple.draw();

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
	fill(100);

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
}


