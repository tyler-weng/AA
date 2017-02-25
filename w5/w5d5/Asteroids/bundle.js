/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(1);
	const Game = __webpack_require__(2);
	document.addEventListener("DOMContentLoaded", () => {
	    const elem = document.getElementById("game-canvas");
	    const ctx = elem.getContext("2d");
	    const View = new GameView(new Game(), ctx);
	    View.start();
	  });


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

	class GameView {
	  constructor(game, ctx) {
	    this.game = game;
	    this.ctx = ctx;
	  }

	  start() {
	    this.bindKeyHandlers();
	    console.log ("I'm at the start!");
	    const elem = document.getElementById("game-canvas");
	    const ctx = elem.getContext("2d");
	    window.setInterval(() => {
	      this.game.step();
	      this.game.draw(ctx);
	      if (this.game.asteroids.length === 0) {
	        window.clearInterval( () => this.victoryCallback());
	      }
	    }, 15);
	  }

	  victoryCallback () {
	    alert("Victory!");
	  }
	  // bindKeyHandlers() {
	  //   key("w", () => this.game.ship.power([0,1])());
	  //   // key("S", window, this.game.ship.power.bind(this.game.ship, [0,100]));
	  //   // key.assignKey("a", window, this.game.ship.power([-1, 0]));
	  //   // key.assignKey("d", window, this.game.ship.power([1, 0]));
	  // }

	  bindKeyHandlers() {
	    const ship = this.game.ship;

	    key("w", () => ship.power([0, -1]));
	    key("s", () => ship.power([0, 1]));
	    key("a", () => ship.power([-1, 0]));
	    key("d", () => ship.power([1, 0]));

	    key("space", () => ship.fireBullet());

	  }
	  // bindKeyHandlers() {
	  //   const ship = this.game.ship;
	  //
	  //   Object.keys(GameView.MOVES).forEach((k) => {
	  //     let move = GameView.MOVES[k];
	  //     key(k, () => { ship.power(move); });
	  //   });

	    // key("space", () => { ship.fireBullet() });

	}
	// GameView.MOVES = {
	//   "w": [ 0, -1],
	//   "a": [-1,  0],
	//   "s": [ 0,  1],
	//   "d": [ 1,  0],
	// };

	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(6);
	const Bullet = __webpack_require__(7);

	class Game {
	  constructor (dimx = Game.DIM_X, dimy = Game.DIM_Y, numAsteroids = Game.NUM_ASTEROIDS) {
	    this.dimx = dimx;
	    this.dimy = dimy;
	    this.numAsteroids = numAsteroids;
	    this.asteroids = [];
	    this.addAsteroids();
	    this.ctx = Game._makeCTX();
	    this.ship = this.createShip();
	    this.bullets = [];
	  }

	  randomPosition() {
	    return [Math.random() * 800, Math.random() * 600];
	  }

	  addAsteroids() {
	    while (this.asteroids.length < this.numAsteroids) {
	      this.asteroids.push(new Asteroid(this.randomPosition(), this)  );
	    }
	  }

	  destroyShip() {
	    this.ship.relocate();
	  }

	  draw(ctx) {
	    ctx.clearRect(0, 0, 800, 600);
	    this.allObjects().forEach(ast => ast.draw(ctx));
	  }

	  moveObjects() {
	    // this.asteroids.forEach(ast => ast.move());
	    // this.ctx.clearRect(this.dimx, this.dimy, 800, 600);
	    for (let i = 0; i < this.allObjects().length; i++) {
	      let ast = this.allObjects()[i];
	      ast.move();
	      this.ctx.clearRect(0, 0, 800, 600);
	    }
	  }

	  checkCollisions() {
	    for (let i = 0; i < this.allObjects().length - 1; i++) {
	      let obj1 = this.allObjects()[i];
	      for (let j = i + 1; j < this.allObjects().length; j++) {
	        let obj2 = this.allObjects()[j];
	        if (obj1.isCollidedWith(obj2)) {
	          if ((obj1 instanceof Bullet && obj2 instanceof Asteroid) ||
	              (obj2 instanceof Bullet && obj1 instanceof Asteroid)) this.handleShot(i, j);
	          if ((obj1 instanceof Ship && obj2 instanceof Asteroid) ||
	              (obj2 instanceof Ship && obj1 instanceof Asteroid)) this.destroyShip();
	          if (obj1 instanceof Asteroid && obj2 instanceof Asteroid) this.handleAsteroidCollision(i, j);

	        }
	      }
	    }

	  }

	  step () {
	    this.moveObjects();
	    this.checkCollisions();
	  }

	  handleAsteroidCollision(obj1Index, obj2Index) {
	    this.allObjects()[obj1Index].vel[0] *= -1;
	    this.allObjects()[obj1Index].vel[1] *= -1;
	    this.allObjects()[obj2Index].vel[0] *= -1;
	    this.allObjects()[obj2Index].vel[1] *= -1;
	  }

	  handleShot (obj1Index, obj2Index) {
	      if (this.allObjects()[obj1Index] instanceof Bullet) {
	        this.bullets.splice(obj1Index - this.asteroids.length - 1, 1);
	        this.asteroids.splice(obj2Index, 1);
	      }
	      else {
	        this.bullets.splice(obj2Index - this.asteroids.length - 1, 1);
	        this.asteroids.splice(obj1Index, 1);
	      }
	    }

	  allObjects () {
	    return this.asteroids.concat([this.ship]).concat(this.bullets);
	  }

	  createShip () {
	    return new Ship(this.randomPosition(), this);

	  }

	  static _makeCTX() {
	    const elem = document.getElementById("game-canvas");
	    return elem.getContext("2d");
	  }
	}

	Object.defineProperty(Game, 'DIM_X', {
	    value: 1600,
	    writable : false,
	    enumerable : true,
	    configurable : false
	});

	Object.defineProperty(Game, 'DIM_Y', {
	    value: 1200,
	    writable : false,
	    enumerable : true,
	    configurable : false
	});

	Object.defineProperty(Game, 'NUM_ASTEROIDS', {
	    value: 5,
	    writable : false,
	    enumerable : true,
	    configurable : false
	});

	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);

	class Asteroid extends MovingObject {

	  constructor(pos, game, vel = Asteroid.randomVec(), radius = Asteroid.RADIUS, color = Asteroid.COLOR) {
	    super(pos, game, vel, radius, color);
	  }

	  static randomVec (length = Math.random() * 5 ) {
	    const deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  }
	}

	Object.defineProperty(Asteroid, 'COLOR', {
	    value: "#00FF00",
	    writable : false,
	    enumerable : true,
	    configurable : false
	});

	Object.defineProperty(Asteroid, 'RADIUS', {
	    value: 50,
	    writable : false,
	    enumerable : true,
	    configurable : false
	});

	module.exports = Asteroid;


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  inherits(childClass, parentClass) {
	    function Surrogate() {}
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  },

	  scale(vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  }
	};

	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports) {

	class MovingObject {
	  constructor (pos, game, vel, radius, color) {
	    this.pos = pos;
	    this.vel = vel;
	    this.radius = radius;
	    this.color = color;
	    this.game = game;
	  }

	  draw (ctx) {
	    const centerX = this.pos[0];
	    const centerY = this.pos[1];

	    ctx.beginPath();
	    ctx.arc(centerX, centerY, this.radius, 0, 2 * Math.PI, false);
	    ctx.fillStyle = this.color;

	    ctx.fill();
	    ctx.lineWidth = 5;
	    ctx.strokeStyle = '#003300';
	    ctx.stroke();
	    //
	    // ctx.beginPath();
	    // ctx.arc(centerX, centerY, 50, 0 ,2*Math.PI);
	    // ctx.stroke();
	  }

	  move() {
	    this.pos[0] += this.vel[0];
	    this.pos[1] += this.vel[1];
	    if (this.pos[0] >= 800) this.pos[0] -= 800;
	    if (this.pos[1] >= 600) this.pos[1] -= 600;
	    if (this.pos[0] <= 0) this.pos[0] += 800;
	    if (this.pos[1] <= 0) this.pos[1] += 600;
	  }

	  isCollidedWith(otherObject) {
	    let pos1 = this.pos;
	    let pos2 = otherObject.pos;
	    return MovingObject.distance(pos1, pos2) < this.radius + otherObject.radius;
	  }

	  static distance(pos1, pos2) {
	    return Math.sqrt(Math.pow((pos1[0] - pos2[0]), 2) + Math.pow((pos1[1] - pos2[1]), 2));
	  }
	}

	module.exports = MovingObject;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(5);
	const Bullet = __webpack_require__(7);

	class Ship extends MovingObject {
	  constructor (pos, game, vel = [0, 0], radius = 25, color = "#3D5FD4") {
	    // this.pos = pos;
	    // this.vel = vel;
	    // this.radius = radius;
	    // this.color = color;
	    // this.game = game;
	    super(pos, game, vel, radius, color);
	  }

	  relocate() {
	    this.pos = this.game.randomPosition();
	    this.vel = [0, 0];
	  }

	  power(impulse) {
	    this.vel[0] += impulse[0];
	    this.vel[1] += impulse[1];
	  }

	  fireBullet() {
	    this.game.bullets.push(
	      new Bullet(
	        this.pos.slice(),
	        this.game,
	        [this.vel[0] + 1 * (this.vel[0] < 0 ? 1 : -1),
	          this.vel[1]],
	        this.radius / 4,
	        "#FF0000"
	    ));
	  }

	}

	module.exports = Ship;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(5);

	class Bullet extends MovingObject {
	  constructor (pos, game, vel, radius, color) {
	    // super(game.ship.pos.slice(), game, game.ship.vel.slice(), radius, color);
	    super(pos, game, vel, radius, color);
	  }

	  move() {
	    this.pos[0] += this.vel[0];
	    this.pos[1] += this.vel[1];
	  }

	}

	module.exports = Bullet;


/***/ }
/******/ ]);