/*
 * Class of the Snake object
 */
class Snake {
	constructor() {
		let x = floor(random(cols));
		let y = floor(random(rows));

		this.pos = createVector(x, y);
		this.dir = createVector(1, 0);

		this.length = 3;
		this.body = [];



		// Singleton
		if (!Snake.instance)
			Snake.instance = this;

		return Snake.instance;
	}



	// Drawing snake and score
	draw() {
		for (let b of this.body) {

			if (this.pos.x === b.x && this.pos.y === b.y) {
				fill('green');
			} else {
				fill('blue');
			}

			rect(b.x * res, b.y * res, res, res);
		}


		fill(255);
		text(`SCORE: ${this.length}`, 20, 40);
	}


	// Snake movement
	move() {
		this.pos.add(this.dir);

		if (this.pos.x >= cols) this.pos.x = 0;
		if (this.pos.y >= rows) this.pos.y = 0;
		if (this.pos.x < 0) this.pos.x = cols - 1;
		if (this.pos.y < 0) this.pos.y = rows - 1;


		for (let b of this.body) {
			if (this.pos.x === b.x && this.pos.y === b.y) {
				this.die();
				break;
			}
		}


		this.add();

		while(this.body.length > this.length) {
			this.body.shift();
		}
	}


	// Adding new snake part
	add() {
		this.body.push({
			x: this.pos.x,
			y: this.pos.y,
		});
	}


	// Setting snake direction on the map
	setDir(dir) {
		if (dir == 'left')  this.dir.set(-1, 0);
		if (dir == 'up')    this.dir.set(0, -1);
		if (dir == 'right') this.dir.set(1, 0);
		if (dir == 'down')  this.dir.set(0, 1);
	}


	// Check if snake can eats the apple
	eats(a) {
		return this.pos.equals(a);
	}


	// Eating apple
	eat() {
		this.length++;
		setFrameRate(this.length * 2);
	}


	// Reset snake state when died
	die() {
		this.length = 3;

		let x = floor(random(cols));
		let y = floor(random(rows));

		this.pos.set(x, y);
	}
}









