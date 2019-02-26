function Knight(x, y, sprites) {
	this.x = x;
	this.y = y;
	this.sprites = sprites;
	this.state = 'idle';
	this.lastState = 'idle';
	this.index = 0;
	this.framesCount = 0;
	this.framePerSecond = 6;
	this.lastDir = 0;
	this.dir = 0;
	this.speed = 4;
	this.hp = 100;
	this.mp = 100;
	this.death = false;
	this.shielded = false;
	this.view = 1;
}




Knight.prototype.show = function() {
	let a = this.sprites[this.state];

	if (this.framesCount >= a.fps) {
		this.framesCount = 0;

		if (this.index + 1 === a.imgs.length) this.lastFrame();
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



Knight.prototype.move = function() {
	if (this.death) return;

	let w = this.sprites[this.state].w;

	if ((this.dir === -1 && this.x <= 0) || (this.dir === 1 && this.x + w >= width)) return;

	this.x += this.dir * this.speed;
};



Knight.prototype.setDir = function(n) {
	if (this.death) return;

	if (n === 0) {
		this.setState('idle');
	} else if (n === -1) {

		this.view = -1;
		this.setState('run');

	} else if (n === 1) {

		this.view = 1;
		this.setState('run');
	}

	this.dir = n;
};



Knight.prototype.lastFrame = function() {
	if (this.state == 'attack') {

		for (let i = app.enemies.length-1; i >= 0; i--) {
			let e = app.enemies[i];

			if (!e.agr) continue;

			if (e.punch(15)) {
				app.enemies.splice(i, 1);
			}
		}

		this.setState('idle');

	} else if (this.state == 'death') {

		app.endGame();

	}
};



Knight.prototype.attack = function(n) {
	if (n == 1) {

		this.setState('attack');

	} else if (n == 3) {

		this.addMp(-10);

		let h = this.sprites[this.state].h;
		app.swords.push(
			new ThreeSwords(this.x, this.y - h/2, 50, 50, 40, this.view, app.skills.three)
		);

	}
};




Knight.prototype.setState = function(s) {
	if (this.lastState !== s) this.index = 0;

	this.lastState = this.state;
	this.state = s;
};



Knight.prototype.getRightCorner = function() {
	return this.x + this.sprites[this.state].w;
};



Knight.prototype.die = function() {
	this.death = true;
	this.setState('death');
};



Knight.prototype.addHp = function(n) {
	if ((this.hp >= 100 && n > 0) || this.death) return;

	this.hp += n;

	app.setHp(this.hp);

	if (this.hp <= 0) this.die();
};



Knight.prototype.addMp = function(n) {
	if (this.mp >= 100 && n > 0) return;

	this.mp += n;

	app.setMp(this.mp);
};



Knight.prototype.shield = function() {
	this.shielded = true;
};



Knight.prototype.unShield = function() {
	this.shielded = false;
};

