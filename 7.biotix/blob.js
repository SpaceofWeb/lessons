function Blob(x, y, r, col) {
	this.pos = createVector(x, y);
	this.r = r;
	this.color = col;
	this.maxBio = this.r;
	this.count = this.maxBio;
}



Blob.prototype.show = function() {
	noFill();
	stroke(this.color);
	strokeWeight(4);
	ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);

	strokeWeight(2);
	textSize(this.r);
	noStroke();
	fill(255);
	text(floor(this.count), this.pos.x, this.pos.y+20);
};