function Car(x, y, w, h, color) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = color;
}




Car.prototype.update = function() {
	this.y += vel;

	if (this.y >= height) {
		this.y = -this.h;
	}
};


Car.prototype.draw = function() {
	fill(this.color);
	rect(this.x, this.y, this.w, this.h);
};


Car.prototype.moveLeft = function() {
	if (this.x == 0) return;

	this.x -= lineSize;
};


Car.prototype.moveRight = function() {
	if (this.x == lineSize*(lines-1)) return;

	this.x += lineSize;
};


Car.prototype.collide = function(other) {
	if (this.x != other.x) return false;

	return (other.y < this.y && this.y < other.y+other.h) || 
				(other.y < this.y+this.h && this.y+this.h < other.y+other.h);
};








