let lines = 3;
let lineSize = 80;
let carHeight = 120
let car;
let cars = [];
let points = 0;
let defVel = 3;
let vel = defVel;


function setup() {
	createCanvas(lineSize*lines, 500);
	textSize(20);

	car = new Car(lineSize, height-carHeight, lineSize-2, carHeight, 255);

	for (let i = 0; i < 3; i++) {
		let y = -170*2*i;
		cars[i] = new Car(lineSize*i, y, lineSize-2, carHeight, 200);
	}
}



function draw() {
	background(0);
	points++;
	vel = defVel + floor(points/500);

	for (let c of cars) {
		c.update();
		c.draw();

		if (car.collide(c)) {
			car.x = lineSize;
			vel = defVel;
			points = 0;

			for (let c of cars) {
				c.y -= 500;
			}

			alert('Game over!');

			break;
		}
	}


	fill('red');
	text(points+' '+vel, 0, 20);
	car.draw();
}



function keyPressed() {
	if (keyCode == 37) {
		car.moveLeft();
	} else if (keyCode == 39) {
		car.moveRight();
	}
}




