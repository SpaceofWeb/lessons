window.requestAnimationFrame = window.requestAnimationFrame
	|| window.mozRequestAnimationFrame;




// class App {
// 	constructor() {
// 		startGame();
// 	}

	

// 	loop() {
// 		this.draw();

// 		requestAnimationFrame(() => {
// 			this.loop();
// 		});
// 	}


// 	draw() {

// 	}


// 	startGame() {

// 	}
// }







// let app = new App();




let sprites = {
	dog: {
		idle: [
			'',
			'',
			'',
			'',
			'',
		],
	}
};



class Entity {
	constructor(x, y, sprites) {
		this.x = x;
		this.y = y;
		this.sprites = {};

		// this.loadSprites(sprites);
	}

	
	loadSprites(s) {
		console.log('obj');
		// this.sprites[idle].push(img);
	}

	move() {

	}
}



class Dog extends Entity {
	constructor(x, y, sprites) {
		super(x, y, sprites);
		this.x = this.x * 2;

		this.loadSprites();
	}

	draw() {

	}

	move() {

	}
}



class Player extends Entity {
	constructor(x, y, sprites) {
		super(x, y, sprites);

		this.loadSprites();
	}

	draw() {

	}

	move() {

	}
}


let p = new Player(1, 1, []);
let d = new Dog(2, 2, []);

console.log(p, d);



