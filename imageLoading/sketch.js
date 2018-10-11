let img = new p5.Image('ZlNQKEtJcik.jpg');

// img.src = 'ZlNQKEtJcik.jpg';



function preload() {
	img = loadImage('http://localhost:3001/ZlNQKEtJcik.jpg');
	// img = loadImage('./ZlNQKEtJcik.jpg');
	// img = loadImage('https://pp.userapi.com/c847221/v847221857/f4879/JOdNHD9LOiA.jpg');
}


function setup() {
	createCanvas(windowWidth, windowHeight);

	image(img, 0, 0);
}




