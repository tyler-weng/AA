const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');

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
