let blob = [];
let blobs = [];
let bio = [];

let event = {
	blob: null,
	clicked: false,
};




function setup() {
	createCanvas(windowWidth, windowHeight);

	// setFrameRate(10);
	textAlign(CENTER);

	addBlobs();
}



function draw() {
	background(0);

	for (let i = 0; i < blob.length; i++) {
		blob[i].show();
		if (blob[i].count < blob[i].maxBio) {
			blob[i].count = blob[i].count + 0.2;
		}
	}

	for (let i = 0; i < blobs.length; i++) {
		blobs[i].show();
	}

	stroke(255);
	strokeWeight(6);
	for (let i = bio.length-1; i >= 0; i--) {
		let d = bio[i].endBlob.pos.dist(bio[i].points[0]);

		if (d < bio[i].endBlob.r) {
			bio[i].endBlob.count -= bio[i].count;

			if (bio[i].endBlob.count < 0) {
				blob.push(bio[i].endBlob);
				bio[i].endBlob.color = color(0, 255, 0);
				bio[i].endBlob.count = 0;
			}

			bio.splice(i, 1);
			continue;
		}

		for (let j = 0; j < bio[i].points.length; j++) {
			let p = bio[i].points[j];

			p.add(bio[i].dir);

			point(p.x, p.y);
		}
	}


	let b = event.blob;

	if (b) {
		fill(255);
		stroke(255);
		strokeWeight(4);
		line(b.pos.x, b.pos.y, b.mx, b.my);
	}
}



function mousePressed() {
	let v = createVector(mouseX, mouseY);

	if (blob[0].r < blob[0].pos.dist(v)) return;

	event.blob = blob[0];
	event.clicked = true;
	event.blob.mx = mouseX;
	event.blob.my = mouseY;
}



function mouseDragged() {
	if (event.blob) {
		event.blob.mx = mouseX;
		event.blob.my = mouseY;
	}
}



function mouseReleased() {
	for (let i = 0; i < blobs.length; i++) {
		let v = createVector(mouseX, mouseY);

		if (blobs[i].r > blobs[i].pos.dist(v)) {
			let b = {};

			b.startBlob =  event.blob;
			b.endBlob =  blobs[i];
			b.pos =  event.blob.pos.copy();
			b.dir =  b.endBlob.pos.copy().sub(b.pos);
			b.dir.setMag(3);
			b.count = b.startBlob.count = b.startBlob.count / 2;

			b.points = [];

			for (let j = 0; j < 15; j++) {
				let x = b.pos.x + random(-j*2, j*2);
				let y = b.pos.y + random(-j*2, j*2);

				b.points.push(createVector(x, y));
			}

			bio.push(b);
		}

	}

	event.blob = null;
	event.clicked = false;
}





function addBlobs() {
	blob[0] = new Blob(width/2, height/2, 60, color(0, 255, 0));

	for (let i = 0; i < 10; i++) {
		let x = random(60, width-60);
		let y = random(60, height-60);

		blobs[i] = new Blob(x, y, 35, color(200));

		for (let j = 0; j < blobs.length; j++) {
			if (blobs[i].pos.equals(blobs[j].pos)) continue;

			let r = blobs[i].r + blobs[j].r;
			let v = blobs[i].pos.copy().sub(blobs[j].pos);

			v.setMag(1);

			while(r > blobs[i].pos.dist(blobs[j].pos)) {
				blobs[i].pos.add(v);
			}
		}
	}

	for (let j = 0; j < blobs.length; j++) {
		if (blob[0].pos.equals(blobs[j].pos)) continue;

		let r = blob[0].r + blobs[j].r;
		let v = blob[0].pos.copy().sub(blobs[j].pos);

		v.setMag(1);

		while(r > blob[0].pos.dist(blobs[j].pos)) {
			blob[0].pos.add(v);
		}
	}
}


