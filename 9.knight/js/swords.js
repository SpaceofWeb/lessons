function ThreeSwords(x, y, w, h, p, dir, img) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.power = p;
	this.dir = dir;
	this.speed = 4;
	this.img = img;
}




ThreeSwords.prototype.show = function() {
	if (this.dir == -1) {

		ctx.save();
		ctx.scale(-1, 1);
		ctx.drawImage(this.img, -this.x, this.y, this.w, this.h);
		ctx.restore();

	} else {
		ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
	}

};



ThreeSwords.prototype.move = function() {
	this.x += this.dir * this.speed;
};








function RainSword(x, y, img) {
	this.x = x;
	this.y = y;
	this.img = img;
}




RainSword.prototype.show = function() {
	ctx.drawImage(this.img, this.x, this.y);
};



RainSword.prototype.move = function() {
	this.x += this.dir;
	this.y += 1;
};


