let run = [
	'run/run0001.png',
	'run/run0002.png',
	'run/run0003.png',
	'run/run0004.png',
	'run/run0005.png',
	'run/run0006.png',
	'run/run0007.png',
	'run/run0008.png',
	'run/run0009.png',
	'run/run0010.png',
	'run/run0011.png',
	'run/run0012.png',
	'run/run0013.png',
	'run/run0014.png',
	'run/run0015.png',
	'run/run0016.png',
	'run/run0017.png',
];

let sprites = [];

let imgsLoaded = 0;
let fullyLoaded = false;
let index = 0;

let c = document.createElement('canvas');
c.width = c.height = 800;

document.body.appendChild(c);

let ctx = c.getContext('2d');



let fps = 2;
let frameCount = 0;



function setup() {
	// createCanvas(800, 800);

	for (let i = 0; i < run.length; i++) {
		let img = new Image();

		img.onload = () => {
			imgsLoaded++;

			if (imgsLoaded == run.length) {
				fullyLoaded = true;
			}
		};

		img.src = run[i];
		sprites.push(img);
	}
}




function draw() {
	if (!fullyLoaded) return;

	ctx.clearRect(0, 0, 800, 800);

	if (frameCount >= fps) {
		frameCount = 0;
		index = (index + 1) % sprites.length;
	}


	ctx.save();
	ctx.scale(-1, -1);
	ctx.drawImage(sprites[index], -600, -600, 400, 400);
	ctx.restore();
}



function loop() {
	frameCount++;

	draw();

	requestAnimationFrame(loop);
}



setup();

loop();







