function Player() {
	this.posFloat = createVector(0, 0);
	this.posLast = createVector(0, 0);
	this.pos = createVector(0, 0);
	this.dir = createVector(0, 0);
	this.speed = .2;
	this.drawing = false;
	this.lives = 3;
}



Player.prototype.draw = function() {
	fill('lime');

	rect(this.pos.x * resolution, this.pos.y * resolution, resolution, resolution);
};



Player.prototype.move = function() {
	if (this.dir.side == 'left'  && this.pos.x <= 0) return;
	if (this.dir.side == 'up'    && this.pos.y <= 0) return;
	if (this.dir.side == 'right' && this.pos.x >= cols-1) return;
	if (this.dir.side == 'down'  && this.pos.y >= rows-1) return;

	this.posFloat.add(this.dir.copy().mult(this.speed));
	this.pos.x = floor(this.posFloat.x);
	this.pos.y = floor(this.posFloat.y);


	if (map[this.posLast.x][this.posLast.y] == 0 && !this.posLast.equals(this.pos)) {
		this.drawing = true;
		map[this.posLast.x][this.posLast.y] = 2;
	}

	this.posLast.x = this.pos.x;
	this.posLast.y = this.pos.y;

	if (map[this.pos.x][this.pos.y] == 2) {
		console.log(this.pos.x, this.pos.y);
		this.die();
	}


	this.fill();
};



Player.prototype.fill = function() {
	if (this.drawing && map[this.pos.x][this.pos.y] === 1) {
		this.drawing = false;

		for (let i = 0; i < enemyes.length; i++) {
			let x = floor(enemyes[i].pos.x / resolution);
			let y = floor(enemyes[i].pos.y / resolution);

			this.getTile(x, y);
		}


		this.dir.x = 0;
		this.dir.y = 0;

		for (let i = 1; i < cols-1; i++) {
			for (let j = 1; j < rows-1; j++) {
				let m = map[i][j];

				if (m == 0 || m == 2) {
					map[i][j] = 1;
				} else if (m == -1) {
					map[i][j] = 0;
				}
			}
		}
	}
};



Player.prototype.setDir = function(dir) {
	if (dir == 'left') {

		this.dir.x = -1;
		this.dir.y = 0;
		this.dir.side = 'left';

	} else if (dir == 'up') {

		this.dir.x = 0;
		this.dir.y = -1;
		this.dir.side = 'up';

	} else if (dir == 'right') {

		this.dir.x = 1;
		this.dir.y = 0;
		this.dir.side = 'right';

	} else if (dir == 'down') {

		this.dir.x = 0;
		this.dir.y = 1;
		this.dir.side = 'down';

	}
};




Player.prototype.getTile = function(x, y) {
	if (map[x][y] === 0) {
		map[x][y] = -1;
	}

	if (map[x][y-1] === 0) this.getTile(x, y-1);
	if (map[x][y+1] === 0) this.getTile(x, y+1);
	if (map[x-1][y] === 0) this.getTile(x-1, y);
	if (map[x+1][y] === 0) this.getTile(x+1, y);
}



Player.prototype.die = function() {
	if (--this.lives <= 0) {

		startGame();

	} else {

		for (let i = 1; i < cols-1; i++) {
			for (let j = 1; j < rows-1; j++) {
				if (map[i][j] == 2) map[i][j] = 0;
			}
		}

		this.posFloat.x = 0;
		this.posFloat.y = 0;
		this.posLast.x = 0;
		this.posLast.y = 0;
		this.pos.x = 0;
		this.pos.y = 0;
	}
};



