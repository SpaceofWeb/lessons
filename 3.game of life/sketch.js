let count = 60;
let size = 10;
let map1 = [];
let map2 = [];


function setup() {
	createCanvas(count*size, count*size);
	frameRate(10);

	for (let i = 0; i < count; i++) {
		map1[i] = [];
		map2[i] = [];

		for (let j = 0; j < count; j++) {
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


	// map1[15][14] = 1;
	// map1[15][15] = 1;
	// map1[15][16] = 1;
	// map1[15][16] = 1;
}


// 0,0,1
// 1,0,1
// 0,1,1


function draw() {
	background(0);
	fill(255);

	drawRects();
	update();
}



function drawRects() {
	for (let i = 0; i < count; i++) {
		for (let j = 0; j < count; j++) {
			if (map1[i][j] == 1) {
				rect(i*size, j*size, size, size);
			}
		}
	}
}



function update() {
	for (let i = 0; i < count; i++) {
		for (let j = 0; j < count; j++) {
			let n = checkNeibourhood(i, j);

			if (n == 3 || n == 4) {
				map2[i][j] = 1;
			} else {
				map2[i][j] = 0;
			}
		}
	}

	for (let i = 0; i < count; i++) {
		for (let j = 0; j < count; j++) {
			map1[i][j] = map2[i][j];
			map2[i][j] = 0;
		}
	}
}



function checkNeibourhood(x, y) {
	let nCount = 0;

	for (let i = x-1; i <= x+1; i++) {
		for (let j = y-1; j <= y+1; j++) {

			if (i < 0 || count <= i || 
					j < 0 || count <= j || 
					(x == i && y == j)) continue;

			nCount += map1[i][j];
		}
	}

	return nCount;
}


