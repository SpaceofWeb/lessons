let resolution = 4;
let cols;
let rows;
let map1 = [];
let map2 = [];


function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(20);

	cols = width / resolution;
	rows = height / resolution;

	for (let i = 0; i < cols; i++) {
		map1[i] = [];
		map2[i] = [];

		for (let j = 0; j < rows; j++) {
			map1[i][j] = round(random(1));
			// map1[i][j] = 0;
			map2[i][j] = 0;
		}
	}

	// map1[3][1] = 1;
	// map1[3][2] = 1;
	// map1[3][3] = 1;
	// map1[2][3] = 1;
	// map1[1][2] = 1;
}



function draw() {
	background(0);
	fill(255);

	drawRects();
	update();
}



function drawRects() {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			if (map1[i][j] == 1) {
				let x = i * resolution;
				let y = j * resolution;

				rect(x, y, resolution, resolution);
			}
		}
	}
}



function update() {
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let n = checkNeibourhood(i, j);
			let m = map1[i][j];

			if (m == 0 && (n == 3)) {
				map2[i][j] = 1;
			} else if (m == 1 && (n < 2 || n > 3)) {
				map2[i][j] = 0;
			} else {
				map2[i][j] = map1[i][j];
			}

			// if (n == 3 || n == 4) {
			// 	map2[i][j] = 1;
			// } else {
			// 	map2[i][j] = 0;
			// }
		}
	}

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			map1[i][j] = map2[i][j];
			map2[i][j] = 0;
		}
	}
}



function checkNeibourhood(x, y) {
	let nCount = 0;

	for (let i = x-1; i <= x+1; i++) {
		for (let j = y-1; j <= y+1; j++) {

			if (i < 0 || cols <= i || 
					j < 0 || rows <= j || 
					(x == i && y == j)) continue;

			nCount += map1[i][j];
		}
	}

	return nCount;
}


