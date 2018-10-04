function Enemy() {
	let x = random(resolution*2, width-resolution*2);
	let y = random(resolution*2, (height - bottomH)-resolution*2);
	this.pos = createVector(x, y);
	this.dir = createVector(random(-1, 1), random(-1, 1));
	this.dir.setMag(1);
	this.speed = random(3, 7);
	this.r = resolution/2;
}



Enemy.prototype.draw = function() {
	fill('red');

	ellipse(this.pos.x, this.pos.y, resolution, resolution);
};



Enemy.prototype.move = function() {
	let x = floor((this.pos.x-this.r) / resolution);
	let y = floor((this.pos.y) / resolution);

	if (map[x][y] == 1) this.dir.x *= -1;
	if (map[x][y] == 2) player.die();


	x = floor((this.pos.x+this.r) / resolution);

	if (map[x][y] == 1) this.dir.x *= -1;
	if (map[x][y] == 2) player.die();


	x = floor((this.pos.x) / resolution);
	y = floor((this.pos.y-this.r) / resolution);

	if (map[x][y] == 1) this.dir.y *= -1;
	if (map[x][y] == 2) player.die();


	x = floor((this.pos.x) / resolution);
	y = floor((this.pos.y+this.r) / resolution);

	if (map[x][y] == 1) this.dir.y *= -1;
	if (map[x][y] == 2) player.die();




	this.pos.add(this.dir.copy().mult(this.speed));
};
