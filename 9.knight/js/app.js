let width, height, halfWidth, halfHeight, canv, ctx;
requestAnimationFrame = requestAnimationFrame || mozRequestAnimationFrame;


function App() {
	this.nodes = {};

	this.sprites = {};

	this.enemyesInst = ['dog'];
	this.enemyes = [];

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

	this.bg.img.src = 'imgs/bg-game.png';

	this.loadSprites('knight', 'idle', knightSprIdle);
	this.loadSprites('knight', 'run', knightSprRun);
	this.loadSprites('knight', 'attack', knightSprAttack);
	this.loadSprites('knight', 'death', knightSprDeath);
	this.loadSprites('dog', 'run', dogSpr);

	this.player = new Knight(0, height, this.sprites.knight);
}




App.prototype.startGame = function() {
	if (!this.bg.loaded) return;

	document.body.appendChild(canv);


	document.addEventListener('keydown', (e) => {
		if (e.keyCode == 37) {
			this.player.setDir(-1);
		} else if (e.keyCode == 39) {
			this.player.setDir(1);
		}
	});


	document.addEventListener('keyup', (e) => {
		if (e.keyCode == 37 || e.keyCode == 39) {
			this.player.setDir(0);
		} else if (e.keyCode == 49) {
			this.player.attack(1);
		}
	});


	document.addEventListener('click', (e) => {
		console.log(e.clientX, e.clientY);
	});


	setInterval(() => {
		this.addEnemy();

		this.player.hp += 2;
		// this.player.mp += 5;
	}, 1000);


	this.loop();
};



App.prototype.endGame = function() {
	document.body.removeChild(canv);
};



App.prototype.loop = function() {
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


	for (let i = 0; i < this.enemyes.length; i++) {
		this.enemyes[i].show();
		this.enemyes[i].move();
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
	if (this.enemyes.length >= 10) return;

	// let r = this.randInt(0, 3);
	let r = 0;

	if (r == 0) {
		let x = width - this.sprites.dog.run.w;
		let y = height;

		this.enemyes.push(new Enemy(x, y, this.sprites.dog));
	}
};



App.prototype.loadSprites = function(name, state, spr) {
	let h = (name == 'dog') ? 85 : 128;

	let a = {
		imgsLoaded: 0,
		fullyLoaded: false,
		imgs: [],
		w: 0,
		h: h,
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










let app = new App();


