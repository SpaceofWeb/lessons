let nesting = 8;



function setup() {
	createCanvas(windowWidth, windowHeight);

	textSize(24);
	setFrameRate(5);
}



function draw() {
	background(0);

	if (nesting > 12) nesting = 12;

	fill(255);
	text(`FPS: ${frameRate()}`, 10, 30);
	text(`NESTING: ${nesting}`, 10, 50);

	noFill();
	stroke(255);
	strokeWeight(1);
	sierpinski(nesting, getCords(width, height));
}



function sierpinski(n, cords) {
	if (n <= 0) return;


	triangle(cords[0].x, cords[0].y, 
					cords[1].x, cords[1].y, 
					cords[2].x, cords[2].y);


	// left bottom
	let c = getCords();

	c[0].x = cords[0].x;
	c[0].y = cords[0].y;

	c[1].x = (cords[0].x + cords[1].x) / 2;
	c[1].y = (cords[0].y + cords[1].y) / 2;

	c[2].x = (cords[0].x + cords[2].x) / 2;
	c[2].y = (cords[0].y + cords[2].y) / 2;

	sierpinski(n-1, c);


	// upper
	c = getCords();

	c[1].x = cords[1].x;
	c[1].y = cords[1].y;

	c[0].x = (cords[1].x + cords[0].x) / 2;
	c[0].y = (cords[1].y + cords[0].y) / 2;

	c[2].x = (cords[1].x + cords[2].x) / 2;
	c[2].y = (cords[1].y + cords[2].y) / 2;

	sierpinski(n-1, c);


	// right bottom
	c = getCords();

	c[2].x = cords[2].x;
	c[2].y = cords[2].y;

	c[0].x = (cords[2].x + cords[0].x) / 2;
	c[0].y = (cords[2].y + cords[0].y) / 2;

	c[1].x = (cords[2].x + cords[1].x) / 2;
	c[1].y = (cords[2].y + cords[1].y) / 2;

	sierpinski(n-1, c);
}



function mouseClicked() {
	// nesting++;
	// if (nesting > 12) nesting = 12;
	// console.log(mouseX, mouseY);
}



function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}



function getCords(w=null, h=null) {
	if (w === null || h === null) {

		return [{
				x: 0,
				y: 0,
			}, {
				x: 0,
				y: 0,
			}, {
				x: 0,
				y: 0,
		}];
	}


	if (w >= h) {

		let q = (w - h) / 2;

		return [{
				x: q,
				y: h,
			}, {
				x: w/2,
				y: 0,
			}, {
				x: w-q,
				y: h,
		}];

	} else if (w < h) {

		let q = (h - w) / 2;

		return [{
				x: 0,
				y: h - q,
			}, {
				x: w/2,
				y: q,
			}, {
				x: w,
				y: h - q,
		}];
	}



}

