let ball;

function setup() {
	createCanvas(600, 400);
	ball = new Ball(10,10,5, 1);
}

function draw() {
	background(0);
	ball.draw();
}