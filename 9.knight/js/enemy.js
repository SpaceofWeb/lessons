function Enemy(x, y, sprites) {
	this.x = x;
	this.y = y;
	this.sprites = sprites;
	this.state = 'run';
	this.index = 0;
	this.framesCount = 0;
	this.framePerSecond = 4;
	this.lastDir = 0;
	this.dir = 0;
	this.speed = 2;
	this.view = -1;
	this.power = 2;
	this.attackCount = 0;
	this.attackSpeed = 50;
	this.hp = 15;
	this.agr = false;
}




Enemy.prototype.show = function() {
	let a = this.sprites[this.state];

	if (this.framesCount >= a.fps) {
		this.framesCount = 0;
		this.index = (this.index + 1) % a.imgs.length;
	}

	let img = a.imgs[this.index];


	if (this.view === -1) {

		ctx.save();
		ctx.scale(-1, 1);
		ctx.drawImage(img, -this.x - a.w, this.y - a.h, a.w, a.h);
		ctx.restore();

	} else {
		ctx.drawImage(img, this.x, this.y - a.h, a.w, a.h);
	}

	this.framesCount++;
};



Enemy.prototype.move = function() {
	let p = app.player;

	this.agr = false;

	if (this.x + this.sprites[this.state].w < p.x + 50) {

		this.view = 1;
		this.x += this.speed;

	} else if (this.x + 50 > p.getRightCorner()) {

		this.view = -1;
		this.x += -this.speed;

	} else {

		if (!p.death && !p.shielded && this.attackCount >= this.attackSpeed) {
			p.addHp(-this.power);
			this.attackCount = 0;
		}

		this.agr = true;
		this.attackCount++;
	}
};




Enemy.prototype.punch = function(n) {
	this.hp -= n;

	return this.hp <= 0;
};




Enemy.prototype.getRightCorner = function() {
	return this.x + this.sprites[this.state].w;
};



Enemy.prototype.collide = function(s) {
	let w = this.sprites[this.state].w;

	return ((this.x < s.x && s.x < this.x + w) || 
					(this.x < s.x + s.w && s.x + s.w < this.x + w));
};

