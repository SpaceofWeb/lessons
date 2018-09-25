let tx = 21;
let ty = 21;
let ts = 20;
let player1;
let player2;
let bullets = [];



function setup() {
	createCanvas(tx*ts+120, ty*ts);

	textSize(20);
	setFrameRate(10);

	startGame();
}



function draw() {
	fillBg();

	fill(255);
	text('Player1: '+player1.lives, tx*ts+10, 30);
	text('Player2: '+player2.lives, tx*ts+10, 60);

	player1.move();
	player1.show();

	player2.move();
	player2.show();



	for (let i = bullets.length-1; i >= 0; i--) {
		let b = bullets[i];

		if (b.pos.x < 0 || b.pos.x >= tx || 
				b.pos.y < 0 || b.pos.y >= ty) bullets.splice(i, 1);

		b.show();
		b.move();

		if (player1.collide(b) || player2.collide(b)) {
			bullets.splice(i, 1);
		}
	}
}



function fillBg() {
	background(0);

	fill(100);

	for (let i = 0; i < tx; i++) {
		for (let j = 0; j < ty; j++) {
			rect(i*ts, j*ts, ts-1, ts-1);
		}
	}
}




function keyPressed() {
	if (key == 'W') player1.setDir('up');
	if (key == 'A') player1.setDir('left');
	if (key == 'S') player1.setDir('down');
	if (key == 'D') player1.setDir('right');
	if (key == ' ') {
		let b = player1.attack();
		if (b !== false) bullets.push(b);
	}


	if (keyCode == 38) player2.setDir('up');
	if (keyCode == 37) player2.setDir('left');
	if (keyCode == 40) player2.setDir('down');
	if (keyCode == 39) player2.setDir('right');
	if (keyCode == 16) {
		let b = player2.attack();
		if (b !== false) bullets.push(b);
	}
}



function keyReleased() {
	if (key == 'W') player1.unSetDir('up');
	if (key == 'A') player1.unSetDir('left');
	if (key == 'S') player1.unSetDir('down');
	if (key == 'D') player1.unSetDir('right');

	if (keyCode == 38) player2.unSetDir('up');
	if (keyCode == 37) player2.unSetDir('left');
	if (keyCode == 40) player2.unSetDir('down');
	if (keyCode == 39) player2.unSetDir('right');
}




function startGame() {
	player1 = new Tank(5, 5, 3, 3, {
		'up': [
				[0,1,0],
				[1,1,1],
				[1,1,1],
		],
		'left': [
				[0,1,1],
				[1,1,1],
				[0,1,1],
		],
		'down': [
				[1,1,1],
				[1,1,1],
				[0,1,0],
		],
		'right': [
				[1,1,0],
				[1,1,1],
				[1,1,0],
		]
	});

	player2 = new Tank(15, 15, 3, 3, {
		'up': [
				[0,1,0],
				[1,1,1],
				[1,0,1],
		],
		'left': [
				[0,1,1],
				[1,1,0],
				[0,1,1],
		],
		'down': [
				[1,0,1],
				[1,1,1],
				[0,1,0],
		],
		'right': [
				[1,1,0],
				[0,1,1],
				[1,1,0],
		]
	});
}

