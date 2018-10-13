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
	this.death = false;

	ctx.font = '42px sans-serif';
}




Knight.prototype.show = function() {
	let a = this.sprites[this.state];

	if (this.framesCount >= this.framePerSecond) {
		this.framesCount = 0;

		if (this.index + 1 === a.imgs.length && this.state == 'attack') {
			this.setState('idle');
		}
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
	ctx.fillText(this.hp, 100, 100);
};



Knight.prototype.move = function() {
	if (this.hp <= 0) this.die();


	let w = this.sprites[this.state].w;

	if ((this.dir === -1 && this.x <= 0) || (this.dir === 1 && this.x + w >= width)) return;

	this.x += this.dir * this.speed;
};



Knight.prototype.setDir = function(n) {
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




Knight.prototype.attack = function(n) {
	if (n == 1) {

		this.setState('attack');

		for (let i = app.enemyes.length-1; i >= 0; i--) {
			let e = app.enemyes[i];

			if (!e.agr) continue;

			if (e.punch(15)) {
				app.enemyes.splice(i, 1);
			}
		}


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

