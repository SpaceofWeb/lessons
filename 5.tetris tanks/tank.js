function Tank(x, y, tx, ty, map) {
	this.pos = createVector(x, y);
	this.tx = tx;
	this.ty = ty;
	this.map = map;
	this.lives = 5;
	this.dir = 'up';
	this.key = {
		up: false,
		left: false,
		down: false,
		right: false,
	};
}



Tank.prototype.show = function() {
	if (this.dead) return;

	fill(255);

	for (let i = 0; i < this.map[this.dir].length; i++) {
		for (let j = 0; j < this.map[this.dir].length; j++) {
			if (this.map[this.dir][i][j] === 1) {
				rect((this.pos.x+j) * ts, (this.pos.y+i) * ts, ts-1, ts-1);
			}
		}
	}
};



Tank.prototype.move = function() {
	if (+this.key.up + +this.key.left + +this.key.down + +this.key.right != 1) return;


	if (this.key.up && !(this.pos.y <= 0)) {
		this.dir = 'up';
		this.pos.y -= 1;
	}

	if (this.key.left && !(this.pos.x <= 0)) {
		this.dir = 'left';
		this.pos.x -= 1;
	}

	if (this.key.down && !(this.pos.y+this.ty >= ty)) {
		this.dir = 'down';
		this.pos.y += 1;
	}

	if (this.key.right && !(this.pos.x+this.tx >= tx)) {
		this.dir = 'right';
		this.pos.x += 1;
	}
};



Tank.prototype.setDir = function(dir) {
	this.key[dir] = true;
};



Tank.prototype.unSetDir = function(dir) {
	this.key[dir] = false;
};



Tank.prototype.collide = function(bullet) {
	let map = this.getMap();

	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map.length; j++) {
			let t = map[i][j];

			if (t && this.pos.x+i == bullet.pos.x && this.pos.y+j == bullet.pos.y) {
				this.dead = true;

				setTimeout(() => {
					this.dead = false;
				}, 150);

				if (--this.lives <= 0) {
					this.dead = true;

					setTimeout(() => {
						this.dead = false;
						startGame();
					}, 300);
				}

				return true;
			}
		}
	}

	return false;
};



Tank.prototype.getMap = function() {
	return this.map[this.dir];
};



Tank.prototype.attack = function() {
	if (this.dir == 'up') {
		return new Bullet(this.pos.x+1, this.pos.y-1, 0, -1);
	}
	if (this.dir == 'left') {
		return new Bullet(this.pos.x-1, this.pos.y+1, -1, 0);
	}
	if (this.dir == 'down') {
		return new Bullet(this.pos.x+1, this.pos.y+3, 0, 1);
	}
	if (this.dir == 'right') {
		return new Bullet(this.pos.x+3, this.pos.y+1, 1, 0);
	}

	return false;
};


