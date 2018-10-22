let width, height, halfWidth, halfHeight, canv, ctx;
requestAnimationFrame = requestAnimationFrame || mozRequestAnimationFrame;


function App() {
	this.nodes = {};
	this.nodes.screenStart = new Node('.screen-start');
	this.nodes.screenGame = new Node('.screen-game');
	this.nodes.screenRanking = new Node('.screen-ranking');
	this.nodes.playerName = new Node('#playerName');
	this.nodes.startBtn = new Node('#startBtn');
	this.nodes.userName = new Node('.user-info');
	this.nodes.hp = new Node('.panel-xp > .score-value');
	this.nodes.hpVal = new Node('.panel-xp > .score-value > span');
	this.nodes.mp = new Node('.panel-mp > .score-value');
	this.nodes.mpVal = new Node('.panel-mp > .score-value > span');


	this.nodes.screenRanking.hide();

	this.name = '';
	this.gameEnded = false;

	this.sprites = {};
	this.enemies = [];
	this.skills = {};
	this.swords = [];

	this.wx = 0;

	canv = document.createElement('canvas');
	canv.width = width = window.innerWidth;
	canv.height = height = window.innerHeight;

	halfWidth = width / 2;
	halfHeight = height / 2;

	ctx = canv.getContext('2d');


	this.bg = {};
	this.bg.img = new Image();

	this.bg.img.onload = () => {
		this.bg.loaded = true;
		this.startGame();
	};
	this.bg.img.src = 'img/bg-game.png';

	this.loadSprites('knight', 'idle',   85, 128, 6, knightSprIdle);
	this.loadSprites('knight', 'run',    85, 128, 4, knightSprRun);
	this.loadSprites('knight', 'attack', 85, 128, 2, knightSprAttack);
	this.loadSprites('knight', 'death',  85, 128, 4, knightSprDeath);
	this.loadSprites('dog',    'run',    128, 85, 6, dogSpr);

	this.loadSwords('three', 'img/skill-sword-3.png');
	this.loadSwords('rain', 'img/skill-sword-8.png');


	this.player = new Knight(0, height, this.sprites.knight);

	this.nodes.startBtn.addEvent('click', (e) => {
		e.preventDefault();

		this.startGame();
	});
}




App.prototype.startGame = function() {
	if (!this.bg.loaded) return;

	this.name = this.nodes.playerName.val();
	this.nodes.userName.text(this.name);

	this.nodes.screenStart.hide();
	this.nodes.screenGame.append(canv);


	document.addEventListener('keydown', (e) => {
		if (e.keyCode == 37) {
			this.player.setDir(-1);
		} else if (e.keyCode == 39) {
			this.player.setDir(1);
		} else if (e.keyCode == 50) {
			this.player.shield();
		}
	});


	document.addEventListener('keyup', (e) => {
		if (e.keyCode == 37 || e.keyCode == 39) {
			this.player.setDir(0);
		} else if (e.keyCode == 49) {
			this.player.attack(1);
		} else if (e.keyCode == 50) {
			this.player.unShield();
		} else if (e.keyCode == 51) {
			this.player.attack(3);
		}
	});


	document.addEventListener('click', (e) => {
		console.log(e.clientX, e.clientY);
	});


	this.interval = setInterval(() => {
		this.addEnemy();

		this.player.addHp(2);

		if (!this.player.shielded){
			this.player.addMp(5);
		} else {
			this.player.addMp(-5);
		}

	}, 1000);


	this.loop();
};



App.prototype.endGame = function() {
	this.gameEnded = true;
	clearInterval(this.interval);

	this.nodes.screenGame.remove(canv);
	this.nodes.screenRanking.show();
};



App.prototype.loop = function() {
	if (this.gameEnded) return;

	this.draw();

	requestAnimationFrame(() => {
		this.loop();
	});
};



App.prototype.draw = function() {
	ctx.drawImage(this.bg.img, 
		this.wx, 0, this.wx + width, this.bg.img.height,
		0, 0, width, height
	);


	for (let i = this.enemies.length-1; i >= 0; i--) {
		let enemy = this.enemies[i];

		enemy.show();
		enemy.move();

		for (let i = 0; i < this.swords.length; i++) {
			if (enemy.collide(this.swords[i])) {
				if (enemy.punch(this.swords[i].power)) {
					this.enemies.splice(i, 1);
					break;
				}
			}
		}
	}


	for (let i = 0; i < this.swords.length; i++) {
		this.swords[i].show();
		this.swords[i].move();
	}


	this.player.show();
	this.player.move();
};



App.prototype.randInt = function(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
};



App.prototype.randFloat = function(min, max) {
	return Math.random() * (max - min) + min;
};



App.prototype.addEnemy = function() {
	if (this.enemies.length >= 1) return;

	// let r = this.randInt(0, 3);
	let r = 0;

	if (r == 0) {
		let x = width - this.sprites.dog.run.w;
		let y = height;

		this.enemies.push(new Enemy(x, y, this.sprites.dog));
	}
};



App.prototype.loadSprites = function(name, state, w, h, fps, spr) {
	let a = {
		imgsLoaded: 0,
		fullyLoaded: false,
		imgs: [],
		w: w,
		h: h,
		fps: fps,
	};

	for (let i = 0; i < spr.length; i++) {
		let img = new Image();

		img.onload = () => {
			a.imgsLoaded++;

			if (a.imgsLoaded == spr.length-1) {
				let scl = img.height / a.h;
				a.w = img.width / scl;

				a.fullyLoaded = true;
			}
		};

		img.src = spr[i];
		a.imgs.push(img);
	}

	if (!this.sprites[name]) this.sprites[name] = {};
	this.sprites[name][state] = a;
};



App.prototype.loadSwords = function(name, link) {
	let img = new Image();
	img.loaded = false;

	img.onload = () => {
		img.loaded = true;
	};

	img.src = link;
	this.skills[name] = img;
};



App.prototype.setHp = function(n) {
	this.nodes.hp.node.style.width = `${n}%`;
	this.nodes.hpVal.text(n);
};



App.prototype.setMp = function(n) {
	this.nodes.mp.node.style.width = `${n}%`;
	this.nodes.mpVal.text(n);
};












let app = new App();


