let players;
let blobs = [];
let swarms = [];
let evt = {
	blobsFrom: [],
	blobTo: null,
};





function setup() {
	createCanvas(windowWidth, windowHeight);

	textAlign(CENTER);

	players = [
		{
			id: 0,
			name: 'me',
			color: color(0, 255, 0),
		}, {
			id: 1,
			name: 'enemy',
			color: color(255, 0, 0),
		}, {
			id: 2,
			name: 'neutral',
			color: color(200),
		}
	];

	startGame();
}



function draw() {
	background(0);

	for (let i = 0; i < blobs.length; i++) {
		blobs[i].show();
	}


	drawSwarms();
	drawLines();
}



function drawSwarms() {
	for (let i = swarms.length-1; i >= 0; i--) {
		let s = swarms[i];
		let startBlob = blobs[s.startBlobId];
		let endBlob = blobs[s.endBlobId];

		if (s.checkDistance()) {
			if (startBlob.pId === endBlob.pId) {

				endBlob.count += s.count;

			} else {

				endBlob.count -= s.count;

				if (endBlob.count <= 0) {
					endBlob.count = abs(endBlob.count);
					endBlob.pId = 0;
				}
			}

			swarms.splice(i, 1);
			continue;
		}

		s.show();
		s.move();
	}
}



function drawLines() {
	stroke(255);
	strokeWeight(4);

	for (let i = 0; i < evt.blobsFrom.length; i++) {
		let b = blobs[evt.blobsFrom[i]];

		line(b.pos.x, b.pos.y, mouseX, mouseY);
	}
}



function mousePressed() {
	addBlobToQueue();
}



function mouseDragged() {
	addBlobToQueue();
}



function mouseReleased() {
	for (let i = 0; i < blobs.length; i++) {
		let b = blobs[i];

		let d = createVector(mouseX, mouseY).dist(b.pos);

		if (d < b.r) {
			evt.blobTo = i;
			attack();
			return;
		}
	}

	evt = {
		blobsFrom: [],
		blobTo: null,
	};
}





function startGame() {
	blobs.splice(0, blobs.length);

	blobs.push(new Blob(players[0].id, 100, height/2, 60));
	blobs.push(new Blob(players[1].id, width - 100, height/2, 60));

	for (let i = 0, j = 1; i < 10; i++, j+=0.5) {
		// let x = random(100, width - 100);
		// let y = random(100, height - 100);

		let x = width / 2 + 100 * ((i % 2) ? 1 : -1);
		let y = 110 * floor(j);

		blobs.push(new Blob(players[2].id, x, y, 45));
		// blobs.push(new Blob(players[2].id, x, y, floor(random(30, 50))));
		// blobs[i+2].slide();
	}
}



function addBlobToQueue() {
	for (let i = 0; i < blobs.length; i++) {
		if (blobs[i].pId !== 0) continue;

		if (evt.blobsFrom.includes(i)) continue;


		let d = createVector(mouseX, mouseY).dist(blobs[i].pos);

		if (d < blobs[i].r) {
			evt.blobsFrom.push(i);
			break;
		}
	}
}



function attack() {
	for (let i = 0; i < evt.blobsFrom.length; i++) {
		if (evt.blobsFrom[i] === evt.blobTo) continue;

		let b = blobs[evt.blobsFrom[i]];

		let count = b.count/2;
		let v = blobs[evt.blobTo].pos.copy();

		v.sub(b.pos).setMag(1);

		let s = new Swarm(b.pos.copy(), v, i, evt.blobTo, count);

		b.count -= count;
		swarms.push(s);
	}

	evt = {
		blobsFrom: [],
		blobTo: null,
	};
}





