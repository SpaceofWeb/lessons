function Enemy(x, y, h, sprites) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.sprites = sprites;
	this.state = 'run';
	this.index = 0;
	this.framesCount = 0;
	this.framePerSecond = 4;
}




Enemy.prototype.show = function() {
	let a = this.sprites[this.state].imgs;

	if (this.framesCount >= this.framePerSecond) {
		this.framesCount = 0;
		this.index = (this.index + 1) % a.length;
	}

	let img = a[this.index];

	ctx.drawImage(img, this.x, this.y, this.w, this.h);

	this.framesCount++;
};





