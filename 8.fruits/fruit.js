function Fruit(ctx, x, y, w, h, p, img) {
	this.ctx = ctx;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.p = p;
	this.img = img;
}



Fruit.prototype.show = function() {
	this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
};



Fruit.prototype.move = function() {
	this.y++;
};



Fruit.prototype.isDown = function() {
	return game.h < this.y + 10;
};

