/*
 * Class of the Apple object
 */
class Apple {
	constructor() {
		this.pos = createVector(5, 5);

		this.setPos();



		// Singleton
		if (!Apple.instance)
			Apple.instance = this;

		return Apple.instance;
	}



	// Drawing apple on the map
	draw() {
		fill('red');
		rect(this.pos.x * res, this.pos.y * res, res, res);
	}


	// Set new apple position on the map
	setPos() {
		let x = floor(random(cols));
		let y = floor(random(rows));

		this.pos.set(x, y);
	}
}