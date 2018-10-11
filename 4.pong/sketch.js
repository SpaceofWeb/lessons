let ball;
let leftPlatform;
let rightPlatform;



function setup() {
	createCanvas(600, 400);
	textSize(18);

	ball = new Ball(590, 10, 10, 5);
	leftPlatform = new Platform(10, height/2-60, 14, 120, 4);
	rightPlatform = new Platform(width-24, height/2-60, 14, 120, 4);
}



function draw() {
	background(0);

	leftPlatform.draw();
	rightPlatform.draw();

	ball.move();
	ball.draw();

	leftPlatform.move();
	rightPlatform.move();

	ball.ricochetLeft(leftPlatform);
	ball.ricochetRight(rightPlatform);

	text(leftPlatform.points, 10, 30);
	text(rightPlatform.points, width-26, 30);

	if (ball.pos.x + ball.r <= 0) {
		rightPlatform.points++;

		if (rightPlatform.points >= 9) {
			alert('Right player win with '+ rightPlatform.points + ' points');
			rightPlatform.points = 0;
		}

		ball.pos.x = leftPlatform.pos.x + leftPlatform.w + 20;
		ball.pos.y = height/2;

		ball.dir.x = 0;
		ball.dir.y = 0;

		leftPlatform.pos.x = 10;
		leftPlatform.pos.y = height/2 - leftPlatform.h/2;

		setTimeout(() => {
			ball.dir.x = 1;
			ball.dir.y = 1;
		}, 1000);
	}

	if (ball.pos.x >= width-ball.r) {
		leftPlatform.points++;

		if (leftPlatform.points >= 9) {
			alert('Left player win with '+ leftPlatform.points + ' points');
			leftPlatform.points = 0;
		}

		ball.pos.x = rightPlatform.pos.x + rightPlatform.w - 30;
		ball.pos.y = height/2;

		ball.dir.x = 0;
		ball.dir.y = 0;

		rightPlatform.pos.x = width-24;
		rightPlatform.pos.y = height/2 - rightPlatform.h/2;

		setTimeout(() => {
			ball.dir.x = -1;
			ball.dir.y = 1;
		}, 1000);
	}
}



function keyPressed() {
	if (key == 'W') {
		leftPlatform.up = true;
	}

	if (key == 'S') {
		leftPlatform.down = true;
	}


	if (keyCode == 38) {
		rightPlatform.up = true;
	}

	if (keyCode == 40) {
		rightPlatform.down = true;
	}
}


function keyReleased() {
	if (key == 'W') {
		leftPlatform.up = false;
	}

	if (key == 'S') {
		leftPlatform.down = false;
	}

	if (keyCode == 38) {
		rightPlatform.up = false;
	}

	if (keyCode == 40) {
		rightPlatform.down = false;
	}
}
