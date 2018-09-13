function Ball(x, y, r, vel) {
	this.pos = createVector(x, y);
	this.r = r;
	this.dir = createVector(0, 0);
	this.vel = vel;

	if (Ball.instance) {
		return Ball.instance;
	} else {
		Ball.instance = this;
		return this;
	}
}


Ball.prototype.move = function() {
	
}

Ball.prototype.draw = function() {
	fill(255);
	ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
}

Ball.prototype.ricochet = function() {
	
}

