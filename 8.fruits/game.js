function Game() {
	this.nodes = {};

	this.nodes.startPage = this.getNode('#startPage');
	this.nodes.optPage = this.getNode('#optPage');
	this.nodes.endPage = this.getNode('#endPage');
	this.nodes.playerName = this.getNode('#playerName');
	this.nodes.startBtn = this.getNode('#startBtn');
	this.nodes.pauseBtn = this.getNode('#pauseBtn');
	this.nodes.tName = this.getNode('#tName');
	this.nodes.tPoints = this.getNode('#tPoints');
	this.nodes.tTimer = this.getNode('#tTimer');


	this.fullyLoaded = false;
	this.fruitInstance = [
		{
			points: 20,
			imgSrc: 'imgs/apple.jpeg',
			w: 100,
			h: 100,
		}, {
			points: 30,
			imgSrc: 'imgs/plum.jpeg',
			w: 70,
			h: 70,
		}
	];

	this.fruits = [];
	this.points = 0;
	this.name = '';

	this.gameOver = false;
	this.pause = false;


	this.canvas = document.createElement('canvas');
	this.canvas.width = this.w = window.innerWidth;
	this.canvas.height = this.h = window.innerHeight;

	document.body.appendChild(this.canvas);
	this.ctx = this.canvas.getContext('2d');


	this.loadFruits();


	this.hideNode(this.nodes.optPage);
	this.hideNode(this.nodes.endPage);

	this.nodes.startBtn.addEventListener('click', (e) => {
		if (this.fullyLoaded) {
			this.startGame();
		} else console.log('err');
	});
}





Game.prototype.startGame = function() {
	this.hideNode(this.nodes.startPage);
	this.showNode(this.nodes.optPage);

	this.name = this.nodes.tName.innerText = this.nodes.playerName.value;
	this.nodes.tPoints.innerText = this.points;

	this.time = new Date().getTime() + 60000;
	this.setTime();
	this.addFruit();

	this.canvas.addEventListener('click', (e) => {
		this.onClick(e);
	});


	this.nodes.pauseBtn.addEventListener('click', (e) => {
		if (this.pause) this.pause = false;
		else this.pause = true;
	});

	document.addEventListener('keyup', (e) => {
		if (e.keyCode !== 32) return;

		if (this.pause) this.pause = false;
		else this.pause = true;
	});


	this.interv = setInterval(() => {
		if (this.pause) {
			this.time += 1000;
			return;
		}

		this.setTime();
		this.addFruit();
	}, 1000);

	this.loop();
};



Game.prototype.endGame = function() {
	clearInterval(this.interv);
	this.gameOver = true;
};



Game.prototype.setTime = function() {
	let t = Math.floor((this.time - new Date().getTime()) / 1000);

	let m = Math.floor(t / 60);
	let s = t % 60;

	m = (m < 10 && m >= 0) ? `0${m}` : m;
	s = (s < 10 && s >= 0) ? `0${s}` : s;

	this.nodes.tTimer.innerText = `${m}:${s}`;

	if (t <= 0) {
		this.endGame();
	}
};



Game.prototype.loadFruits = function() {
	this.imgsLoaded = 0;
	for (let i = 0; i < this.fruitInstance.length; i++) {
		this.fruitInstance[i].img = new Image();

		this.fruitInstance[i].img.onload = () => {
			this.imgsLoaded++;

			if (this.imgsLoaded == this.fruitInstance.length-1) {
				this.fullyLoaded = true;
			}
		};

		this.fruitInstance[i].img.src = this.fruitInstance[i].imgSrc;
	}
};



Game.prototype.addFruit = function() {
	let img = this.fruitInstance[this.randInt(0, this.fruitInstance.length)];

	let x = this.randFloat(img.w, this.w - img.w);
	let y = this.randFloat(img.h, img.h * 2);

	this.fruits.push(
		new Fruit(this.ctx, x, y, img.w, img.h, img.points, img.img)
	);
};



Game.prototype.loop = function() {
	if (this.gameOver) return;

	this.draw();

	requestAnimationFrame(() => {
		this.loop();
	});
}



Game.prototype.draw = function() {	
	if (this.pause) return;

	this.ctx.clearRect(0, 0, this.w, this.h);

	for (let i = this.fruits.length-1; i >= 0; i--) {
		if (this.fruits[i].isDown()) this.fruits.splice(i, 1);

		this.fruits[i].move();
		this.fruits[i].show();
	}
}



Game.prototype.getNode = function(n) {	
	return document.querySelector(n);
};



Game.prototype.hideNode = function(n) {	
	n.style.display = 'none';
};



Game.prototype.showNode = function(n) {	
	n.style.display = 'block';
};



Game.prototype.randInt = function(min, max) {	
	return Math.floor(Math.random() * (max - min) + min);
};



Game.prototype.randFloat = function(min, max) {	
	return Math.random() * (max - min) + min;
};



Game.prototype.onClick = function(e) {
	let x = e.clientX;
	let y = e.clientY;

	for (let i = this.fruits.length - 1; i >= 0; i--) {
		let f = this.fruits[i];

		if (this.checkClick(f, x, y)) {
			this.points += f.p;
			this.nodes.tPoints.innerText = this.points;
			this.fruits.splice(i, 1);
		}
	}
};



Game.prototype.checkClick = function(f, x, y) {
	return f.x < x && x < f.x + f.w && 
					f.y < y && y < f.y + f.h;
};








let game = new Game();
