function Blob(x, y, r) {
	this.pos = createVector(x, y);
	this.r = r;
	this.vel = createVector(0, 0);
}



Blob.prototype.update = function() {
	let newVel = createVector(mouseX-width/2, mouseY-height/2);
	newVel.setMag(3);
	this.vel = this.vel.lerp(newVel, 0.2);
	this.pos.add(this.vel);
};


Blob.prototype.show = function() {
	fill(255);
	ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
};


Blob.prototype.eats = function(other) {
	let d = this.pos.dist(other.pos);
	return d < this.r + (other.r*0.1);
};


