class Cell {
	constructor(x, y, n) {
		this.x = x;
		this.y = y;
		this.n = n;
		this.state = null;
		this.show = false;
		this.flagged = false;
	}


	draw() {
		if (gameEnded) {

			if (this.state === -1) {

				if (this.flagged) {
					fill(84, 133, 228);
					rect(this.x, this.y, res, res);
					fill(255, 0, 0);
					text('B', this.x + res / 2, this.y + res / 2);

				} else {

					fill(240, 0, 0);
					rect(this.x, this.y, res, res);
					fill(0, 0, 0);
					text('B', this.x + res / 2, this.y + res / 2);
				}

			} else if (this.state === 0) {
				fill(255);
				rect(this.x, this.y, res, res);

			} else if (this.state > 0) {
				fill(255);
				rect(this.x, this.y, res, res);
				fill(0, 255, 0);
				text(this.state, this.x + res / 2, this.y + res / 2);
			}

			return;
		}


		if (this.show) {

			if (this.state === -1) {
				fill(0);
				rect(this.x, this.y, res, res);
				fill(255, 0, 0);
				text(this.state, this.x + res / 2, this.y + res / 2);

			} else if (this.state === 0) {
				fill(255);
				rect(this.x, this.y, res, res);

			} else if (this.state > 0) {
				fill(255);
				rect(this.x, this.y, res, res);
				fill(0, 255, 0);
				text(this.state, this.x + res / 2, this.y + res / 2);
			}

		} else {

			fill(220);
			rect(this.x, this.y, res, res);

			if (this.flagged) {
				fill(255, 0, 0);
				rect(this.x, this.y, res, res);
			}
		}
	}
}