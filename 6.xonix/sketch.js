let resolution = 20;
let rows, cols;
let map = [];
let player;
let enemyes = [];
let bottomH = 40;
let percents = 0;


function setup() {
	createCanvas(windowWidth, windowHeight);

	textSize(30);

	cols = floor(width / resolution);
	rows = floor((height-bottomH) / resolution);

	startGame();
}



function draw() {
	fillMap();
	// clear();

	countPercents();

	text('Lives: ' + player.lives, 15, height-bottomH+30);
	text('Percents: ' + percents + '%', width-240, height-bottomH+30);

	player.move();
	player.draw();

	for (let i = 0; i < enemyes.length; i++) {
		enemyes[i].move();
		enemyes[i].draw();
	}

	text(floor(frameRate()), width - 100, 100);
}




function fillMap() {
	background(0);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (map[i][j] == 0) continue;

			if (map[i][j] == 1) {

				fill(0, 150, 150);
				rect(i * resolution, j * resolution, resolution, resolution);

			} else if (map[i][j] == 2) {

				fill(150, 150, 0);
				rect(i * resolution, j * resolution, resolution, resolution);

			}
		}
	}
}



function keyPressed() {
	switch(keyCode) {
		case 37: player.setDir('left'); break;
		case 38: player.setDir('up'); break;
		case 39: player.setDir('right'); break;
		case 40: player.setDir('down'); break;
	}
}



// function mouseClicked() {
// 	let x = floor(mouseX / resolution);
// 	let y = floor(mouseY / resolution);
// 	let a = [];

// 	getTile(a, x, y)
// 	console.log(x, y, a);
// 	count = 0;
// }



// function mouseMoved() {
// 	enemyes[0].pos.x = mouseX;
// 	enemyes[0].pos.y = mouseY;
// }



function startGame() {
	player = new Player();

	for (let i = 0; i < 5; i++) {
		enemyes[i] = new Enemy();
	}


	for(let i = 0; i < cols; i++) {
		map[i] = [];

		for(let j = 0; j < rows; j++) {
			if (i == 0 || j == 0 || i == cols-1 || j == rows-1) {
				map[i][j] = 1;
			} else {
				map[i][j] = 0;
			}
		}
	}
}



function countPercents() {
	let countAll = (cols-2) * (rows-2);
	let oneP = countAll / 100;
	let count = 0;

	for(let i = 1; i < cols-1; i++) {
		for(let j = 1; j < rows-1; j++) {
			if (map[i][j] === 1) count++;
		}
	}

	percents = floor(count * 100 / countAll);
}







