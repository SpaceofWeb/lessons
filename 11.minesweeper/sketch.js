let rows = 10;
let res = 64;
let bombsCount = 10;
let flagsCount = 0;
let cells = [];
let gameEnded = false;




function setup() {
	createCanvas(windowWidth, windowHeight);

	setCells();
	setBombs();
	setStates();

	textSize(32);
	textAlign(CENTER, CENTER);
}



function draw() {
	textAlign(CENTER, CENTER);
	background(255);

	stroke(100);
	strokeWeight(1);
	noFill();

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < rows; j++) {
			rect(res * j, res * i, res, res)
		}
	}

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < rows; i++) {
			cells[j * rows + i].draw();
		}
	}


	fill(150);
	textAlign(LEFT, CENTER);
	text(`Flags: ${flagsCount} from ${bombsCount}`, 10, rows * res + res / 3);
}



function mousePressed(e) {
	let x = floor(mouseX / res);
	let y = floor(mouseY / res);
	let idx = y * rows + x;

	if (e.button === 2) {
		setFlag(idx);
	} else {
		if (gameEnded) return;

		click(idx, x, y);
	}

	if (flagsCount === bombsCount) {
		checkState();
	}
}



function click(idx, x, y) {
	if (!cells[idx].flagged && cells[idx].state === -1) loose(); 
	else showCells(idx, x, y); 
}



function setFlag(idx) {
	if (cells[idx].show) return;

	if (cells[idx].flagged) {
		cells[idx].flagged = false;
		flagsCount--;
	} else {
		cells[idx].flagged = true;
		flagsCount++;
	}
}



function showCells(idx, x, y) {
	if (cells[idx].flagged) return;

	showCell(idx);

	if (cells[idx].state > 0) return;


	let nx, ny;

	// UP
	nx = x;
	ny = y - 1;

	if (0 <= nx && nx < rows && 0 <= ny && ny < rows) {
		let id = ny * rows + nx;

		if ((id >= 0 && id < rows**2) 
			&& cells[id].state !== -1
			&& !cells[id].show) showCells(id, nx, ny);
	}


	// DOWN
	nx = x;
	ny = y + 1;

	if (0 <= nx && nx < rows && 0 <= ny && ny < rows) {
		let id = ny * rows + nx;

		if ((id >= 0 && id < rows**2) 
			&& cells[id].state !== -1
			&& !cells[id].show) showCells(id, nx, ny);
	}


	// LEFT
	nx = x - 1;
	ny = y;

	if (0 <= nx && nx < rows && 0 <= ny && ny < rows) {
		let id = ny * rows + nx;

		if ((id >= 0 && id < rows**2) 
			&& cells[id].state !== -1
			&& !cells[id].show) showCells(id, nx, ny);
	}


	// RIGHT
	nx = x + 1;
	ny = y;

	if (0 <= nx && nx < rows && 0 <= ny && ny < rows) {
		let id = ny * rows + nx;

		if ((id >= 0 && id < rows**2) 
			&& cells[id].state !== -1
			&& !cells[id].show) showCells(id, nx, ny);
	}
}



function showCell(idx) {
	cells[idx].show = true;
}



function setCells() {
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < rows; j++) {
			cells.push(new Cell(res * j, res * i, cells.length));
		}
	}
}



function setBombs() {
	for (let i = 0; i < bombsCount; i++) {
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

			if (cells[idx].state === -1) n++;
		}
	}

	return n;
}



function checkState() {
	let endGame = true;

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < rows; i++) {
			let idx = j * rows + i;
			
			if (!((cells[idx].show && cells[idx].state !== -1) || 
					(!cells[idx].show && cells[idx].state === -1 && 
						cells[idx].flagged))) {

				endGame = false;
			}
		}
	}

	if (endGame) win();
}



function end() {
	gameEnded = true;

	for (let j = 0; j < rows; j++) {
		for (let i = 0; i < rows; i++) {
			cells[j * rows + i].show = true;
		}
	}
}



function win() {
	end();

	setTimeout(() => {
		alert('You win!');
	}, 100);
}



function loose() {
	end();

	setTimeout(() => {
		alert('You loose!');
	}, 100);
}




