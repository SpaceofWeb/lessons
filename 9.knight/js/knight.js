function Knight(x, y, sprites) {
	this.x = x;
	this.y = y;
	this.sprites = sprites;
	this.state = 'idle';
	this.index = 0;
	this.framesCount = 0;
	this.framePerSecond = 6;
	this.lastDir = 0;
	this.dir = 0;
	this.speed = 4;
}



Knight.prototype.show = function() {
	let a = this.sprites[this.state];

	if (this.framesCount >= this.framePerSecond) {
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



Knight.prototype.move = function() {
	let w = this.sprites[this.state].w;

	if ((this.dir === -1 && this.x <= 0) || (this.dir === 1 && this.x + w >= width)) return;

	this.x += this.dir * this.speed;
};



Knight.prototype.setDir = function(n) {
	if (n === 0) {
		this.state = 'idle';
	} else if (n === -1) {

		this.view = -1;
		this.state = 'run';

	} else if (n === 1) {

		this.view = 1;
		this.state = 'run';
	}

	this.dir = n;
};




Knight.prototype.attack = function(n) {
	
}





