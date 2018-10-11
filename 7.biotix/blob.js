function Blob(pId, x, y, r) {
	this.pId = pId;
	this.pos = createVector(x, y);
	this.r = r;
	this.maxBio = this.r;
	this.count = this.maxBio;
}



Blob.prototype.show = function() {
	noFill();
	stroke(players[this.pId].color);
	strokeWeight(4);
	ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);

	this.fillText();
	this.restore();
};



Blob.prototype.fillText = function() {
	textSize(this.r);
	fill(255);
	noStroke();
	text(floor(this.count), this.pos.x, this.pos.y + this.r * 0.3);
};



Blob.prototype.restore = function() {
	if (this.pId === 2) return;

	if (this.maxBio > this.count) this.count += 0.05;
	if (this.maxBio < this.count-1) this.count -= 0.5;
};



Blob.prototype.slide = function() {
	console.log('slide', this.pId);
	for (let i = 0; i < blobs.length; i++) {
		if (blobs[i].pId == this.pId) continue;

		if (this.pos.dist(blobs[i].pos) < blobs[i].r + this.r + 10) {
			let v = blobs[i].pos.copy().sub(this.pos);

			v.setMag(1);

			while(this.pos.dist(blobs[i].pos) < blobs[i].r + this.r + 10) {
				this.pos.add(v);
			}
		}
	}
};

