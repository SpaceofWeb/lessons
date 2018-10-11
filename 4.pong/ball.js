function Ball(x, y, r, vel) {
	this.pos = createVector(x, y);
	this.r = r;
	this.dir = createVector(-1, 1);
	this.vel = vel;

	if (Ball.instance) {
		return Ball.instance;
	} else {
		Ball.instance = this;
		return this;
	}
}



Ball.prototype.move = function() {
	this.pos.add(this.dir.copy().mult(this.vel));

	if (this.pos.y <= this.r) {
		this.dir.y *= -1;
	}

	if (this.pos.y >= height-this.r) {
		this.dir.y *= -1;
	}
};


Ball.prototype.draw = function() {
	fill(255);
	ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
};



Ball.prototype.ricochetLeft = function(pl) {
	if (pl.pos.x <= this.pos.x - this.r && 
			pl.pos.x + pl.w >= this.pos.x - this.r && 
			pl.pos.y <= this.pos.y - this.r && 
			pl.pos.y + pl.h >= this.pos.y - this.r) {

		ball.dir.x *= -1;
	}
};



Ball.prototype.ricochetRight = function(pl) {
	if (pl.pos.x <= this.pos.x + this.r && 
			pl.pos.x + pl.w >= this.pos.x + this.r && 
			pl.pos.y <= this.pos.y + this.r && 
			pl.pos.y + pl.h >= this.pos.y + this.r) {

		ball.dir.x *= -1;
	}
};

