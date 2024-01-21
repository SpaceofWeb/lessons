/*
 * Class of the Snake object
 */
class Snake {
	constructor() {
		let x = floor(random(cols));
		let y = floor(random(rows));

		// this.pos = createVector(x, y);
		this.pos = createVector(5, 5);
		this.coords = createVector(this.pos.x * res, this.pos.y * res);
		this.dir = createVector(1, 0);

		this.length = 2;
		this.speed = 2;
		this.eat();
		this.body = [];

		// Singleton
		if (!Snake.instance)
			Snake.instance = this;

		return Snake.instance;
	}


	// Drawing snake and score
	draw() {
		// draw head
		fill(47, 111, 55);
		stroke(47, 111, 55);
		noFill();
		scribble.scribbleEllipse(this.pos.x * res + res * .5, this.pos.y * res + res * .5, res, res);

		let p = this.pos;

		// draw head lines
		if (this.dir.x === -1) { // going left
			scribble.scribbleFilling(
				[p.x * res + res * .7, p.x * res + res, p.x * res + res, p.x * res + res * .7],
				[p.y * res, p.y * res, p.y * res + res, p.y * res + res],
				3.5, 90
			);

		} else if (this.dir.x === 1) { // going right
			scribble.scribbleFilling(
				[p.x * res, p.x * res + res * .3, p.x * res + res * .3, p.x * res],
				[p.y * res, p.y * res, p.y * res + res, p.y * res + res],
				3.5, 90
			);

		} else if (this.dir.y === -1) { // going top
			scribble.scribbleFilling(
				[p.x * res, p.x * res + res, p.x * res + res, p.x * res],
				[p.y * res + res * .7, p.y * res + res * .7, p.y * res + res, p.y * res + res],
				3.5, 0
			);

		} else if (this.dir.y === 1) { // going bottom
			scribble.scribbleFilling(
				[p.x * res, p.x * res + res, p.x * res + res, p.x * res],
				[p.y * res, p.y * res, p.y * res + res * .3, p.y * res + res * .3],
				3.5, 0
			);
		}


		// draw tail
		if (this.body[1] !== undefined) {
			let nextB = this.body[1];
			if (nextB === undefined) nextB = this.pos;

			let v1 = createVector(this.body[0].x, this.body[0].y),
				v2 = createVector(nextB.x, nextB.y);

			let sub = v2.copy().sub(v1);
			let angle = sub.heading();

			let x1 = this.body[0].x * res,
				y1 = this.body[0].y * res,
				x2 = this.body[0].x * res + res,
				y2 = this.body[0].y * res,
				x3 = this.body[0].x * res + res,
				y3 = this.body[0].y * res + res,
				x4 = this.body[0].x * res,
				y4 = this.body[0].y * res + res;


			// reverse angle for tail while around corners
			if (sub.mag() > 1) angle *= -1;

			// make tail triangle like
			if (angle === -180 || Object.is(angle, +0)) { // from left
				y1 += res * .5;
				y4 -= res * .5;
			} else if (angle === 90) { // from top
				x1 += res * .5;
				x2 -= res * .5;
			} else if (angle === 180 || Object.is(angle, -0)) { // from right
				y2 += res * .5;
				y3 -= res * .5;
			} else if (angle === -90) { // from bottom
				x3 -= res * .5;
				x4 += res * .5;
			}

			stroke(47, 111, 55);
			scribble.scribbleFilling(
				[x1, x2, x3, x4],
				[y1, y2, y3, y4],
				3.5, angle + 90
			);
		}


		// draw rest of body
		for (let i = 1; i < this.body.length - 1; i++) {
			let b = this.body[i];

			let v1 = createVector(this.body[i - 1].x, this.body[i - 1].y),
				v2 = createVector(this.body[i + 1].x, this.body[i + 1].y);

			let angle = v2.sub(v1).heading();

			stroke(47, 111, 55);
			scribble.scribbleFilling(
				[b.x * res, b.x * res + res, b.x * res + res, b.x * res],
				[b.y * res, b.y * res, b.y * res + res, b.y * res + res],
				3.5, angle * -1 + 90
			);
		}

		textSize(24);
		stroke(255);
		noFill();
		text(`SCORE: ${this.length}`, 20, 40);
	}


	// Snake movement
	move() {
		this.coords.add(this.dir.copy().mult(this.speed));

		// move through the walls
		if (this.coords.x >= mapWidth) this.coords.x = 0;
		if (this.coords.y >= mapHeight) this.coords.y = 0;
		if (this.coords.x < 0) this.coords.x = mapWidth;
		if (this.coords.y < 0) this.coords.y = mapHeight;

		let nx = floor(this.coords.x / res);
		let ny = floor(this.coords.y / res);
		let changed = false;

		if (this.pos.x !== nx) {
			this.pos.x = nx;
			changed = true;
		}
		if (this.pos.y !== ny) {
			this.pos.y = ny;
			changed = true;
		}

		for (let i = this.body.length - 2; i > 0; i--) {
			if (this.pos.x === this.body[i].x && this.pos.y === this.body[i].y) {
				this.die();
				break;
			}
		}

		while (this.body.length > this.length) {
			this.body.shift();
		}

		if (changed) {
			this.body.push({
				x: this.pos.x,
				y: this.pos.y,
			});
		}
	}


	// Setting snake direction on the map
	setDir(dir) {
		if (dir === 'left') this.dir.set(-1, 0);
		if (dir === 'up') this.dir.set(0, -1);
		if (dir === 'right') this.dir.set(1, 0);
		if (dir === 'down') this.dir.set(0, 1);
	}


	// Check if snake can eat an apple
	eats(a) {
		return this.pos.equals(a);
	}


	// Eating apple
	// Increase speed with ease in func from snake length
	eat() {
		this.speed = constrain(map(norm(++this.length, 3, 40) ** 2, 0, 1, 3, 20), 2, 20);
	}


	// Reset snake state when died
	die() {
		this.body = [];
		this.length = 2;
		this.eat();

		let x = floor(random(cols));
		let y = floor(random(rows));
		this.pos.set(x, y);
		this.coords.set(x * res, y * res);

		// random direction
		let dir = random()
		if (dir < .25) this.dir.set(-1, 0);
		else if (dir < .5) this.dir.set(0, -1);
		else if (dir < .75) this.dir.set(1, 0);
		else this.dir.set(0, 1);
	}
}









