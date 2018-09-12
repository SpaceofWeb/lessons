function map(a,b,c,d,f,g) {
	var h = (a - b) / (c - b) * (f - d) + d;
	return g ? d < f ? this.constrain(h,d,f) : this.constrain(h,f,d) : h
}


function constrain(a,b,c) {
		return Math.max(Math.min(a, c), b);
}






function lerp(a, b, c) {
	if (a instanceof Vector) {
		this.x += (a.x - this.x) * b;
		this.y += (a.y - this.y) * b;
		return this;
	}
	return c * (b - a) + a;
};



/*
 * Vector
 */
function Vector(x, y) {
	this.x = x;
	this.y = y;
}



Vector.prototype.add = function(v) {
	this.x += v.x;
	this.y += v.y;
	return this;
};


Vector.prototype.sub = function(v) {
	this.x -= v.x;
	this.y -= v.y;
	return this;
};


Vector.prototype.setMag = function(n) {
	return this.normalize().mult(n);
};


Vector.prototype.normalize = function() {
	let len = this.mag();

	if (len !== 0) this.mult(1/len);
	return this;
};


Vector.prototype.mag = function() {
	return Math.sqrt(this.magSq());
};


Vector.prototype.magSq = function() {
	return this.x * this.x + this.y * this.y;
};


Vector.prototype.mult = function(n) {
	this.x *= n;
	this.y *= n;
	return this;
};


Vector.prototype.dist = function(v) {
	return v.copy().sub(this).mag();
};


Vector.prototype.copy = function() {
	return new Vector(this.x, this.y);
};


Vector.prototype.lerp = lerp;


