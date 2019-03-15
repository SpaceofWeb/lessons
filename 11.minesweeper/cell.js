class Cell {
	constructor(x, y, n) {
		this.x = x;
		this.y = y;
		this.n = n;
		this.state = null;
		this.show = false;
	}


	draw() {
		if (!this.show) return;

		if (this.state === -1) {
			fill(0);
			rect(this.x, this.y, res, res);
			fill(255, 0, 0);
			text(this.state, this.x + res / 2, this.y + res / 2);
		} else if (this.state > 0) {
			fill(0, 255, 0);
			text(this.state, this.x + res / 2, this.y + res / 2);
		} else {
			fill(0, 0, 255);
			text(this.state, this.x + res / 2, this.y + res / 2);
		}

		// fill(100);
		// text(+this.stateN, this.x + res / 3, this.y + res / 2);
		// text(this.n, this.x, this.y + res);
	}
}