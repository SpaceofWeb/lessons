let blob;
let blobs = [];
let zoom = 1;




function setup() {
	createCanvas(windowWidth, windowHeight);
	blob = new Blob(0, 0, 64);

	for (let i = 0; i < 100; i++) {
		let x = random(-width, width);
		let y = random(-height, height);

		blobs[i] = new Blob(x, y, 8);
	}
}



function draw() {
	background(0);

	translate(width/2, height/2);
	let newZoom = 64/blob.r;
	zoom = lerp(zoom, newZoom, 0.1);
	scale(zoom);
	translate(-blob.pos.x, -blob.pos.y);

	for (let i = blobs.length-1; i >= 0; i--) {
		fill(255, 255, blobs[i].x);
		blobs[i].show();
		if (blob.eats(blobs[i])) {
			blob.r += blobs[i].r*0.1;
			blobs.splice(i, 1);

			// let x = random(-width*3, width*3);
			// let y = random(-height*3, height*3);

			// blobs.push(new Blob(x, y, 8));
		}
	}

	blob.update();
	blob.show();
}


