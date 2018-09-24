function Bullet(x, y, dx, dy) {
	this.pos = createVector(x, y);
	this.dir = createVector(dx, dy);
}



Bullet.prototype.show = function() {
	fill(255, 0, 0);
	rect(this.pos.x*ts, this.pos.y*ts, ts-1, ts-1);
};



Bullet.prototype.move = function() {
	this.pos.add(this.dir);
};

