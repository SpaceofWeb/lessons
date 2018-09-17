function Platform(x, y, w, h, vel) {
	this.pos = createVector(x, y);
	this.w = w;
	this.h = h;
	this.up = false;
	this.down = false;
	this.vel = vel;
	this.points = 0;
}



Platform.prototype.move = function() {
	if (this.up && this.pos.y + this.h/2 > 0) this.pos.y += -1*this.vel;

	if (this.down && this.pos.y + this.h/2 < height) this.pos.y += 1*this.vel;
};


Platform.prototype.draw = function() {
	fill(255);
	rect(this.pos.x, this.pos.y, this.w, this.h);
};



