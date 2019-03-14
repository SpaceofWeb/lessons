let rows = 10;
let res = 64;
let cells = [];


function setup() {
	createCanvas(windowWidth, windowHeight);

	setCells();
	setBombs();
	setStates();

	textSize(32);
}



function draw() {
	stroke(100);
	noFill();

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < rows; j++) {
			rect(res * j, res * i, res, res)
		}
	}

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < rows; i++) {
			cells[j * rows + i].show();
		}
	}
}




function setCells() {
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < rows; j++) {
			cells.push(new Cell(res * j, res * i, cells.length));
		}
	}
}



function setBombs() {
	for (let i = 0; i < rows * 2; i++) {
		let x = floor(random(rows));
		let y = floor(random(rows));
		let idx = y * rows + x;

		if (cells[idx].state !== -1) {
			cells[idx].state = -1;
		} else {
			i--;
		}
	}
}



function setStates() {
	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < rows; i++) {
			let n = getNeighbours(i, j);
			let idx = j * rows + i;

			if (cells[idx].state !== -1) cells[idx].state = n;
		}
	}
}



function getNeighbours(x, y) {
	let n = 0;

	for (let j = -1; j < 2; j++) {
		if ((j === -1 && y === 0) || (j === 1 && y === rows-1)) continue;

		for (let i = -1; i < 2; i++) {
			if ((i === -1 && x === 0) || (i === 1 && x === rows-1)) continue;
			if (i === 0 && j === 0) continue;

			let idx = (y + j) * rows + (x + i);

			// let nY = (y + j);
			// let nX = (x + i);
			// let s = (cells[idx] && cells[idx].state) ? cells[idx].state : null;

			// console.log({idx, nX, nY, s});


			if (cells[idx].state === -1) n++;
		}
	}

	return n;
}

