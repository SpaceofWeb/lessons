/*
 * Class of the Apple object
 */
class Apple {
	constructor() {
		this.pos = createVector(5, 5);

		this.setPos();
		this.pos.x = 4;
		this.pos.y = 4;


		// Singleton
		if (!Apple.instance)
			Apple.instance = this;

		return Apple.instance;
	}


	// Drawing apple on the map
	draw() {
		stroke(102, 0, 0);
		fill(255, 0, 0);
		scribble.scribbleEllipse(
			this.pos.x * res + res * .5,
			this.pos.y * res + res * .5,
			res * .5, res * .5
		);
	}


	// Set new apple position on the map
	setPos() {
		let x = floor(random(cols));
		let y = floor(random(rows));

		this.pos.set(x, y);
	}
}