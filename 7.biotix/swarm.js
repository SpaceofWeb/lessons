function Swarm(pos, dir, startBlobId, endBlobId, count) {
	this.pos = pos;
	this.dir = dir;
	this.startBlobId = startBlobId;
	this.endBlobId = endBlobId;
	this.count = count;
	this.points = [];

	this.genPoints();
}



Swarm.prototype.genPoints = function() {
	let count = floor(this.count / 2) || 1;
	for (let i = 0; i < count; i++) {
		let x = random((-i - 2) * 2, (i + 2) * 2);
		let y = random((-i - 2) * 2, (i + 2) * 2);

		this.points.push(createVector(x, y));
	}
};



Swarm.prototype.move = function() {
	this.pos.add(this.dir);
};



Swarm.prototype.show = function() {
	for (let i = 0; i < this.points.length; i++) {
		stroke(255);
		strokeWeight(6);
		point(this.pos.x + this.points[i].x, this.pos.y + this.points[i].y);
	}
};



Swarm.prototype.checkDistance = function() {
	let b = blobs[this.endBlobId];
	let d = this.pos.dist(b.pos);

	return d < b.r;
};









