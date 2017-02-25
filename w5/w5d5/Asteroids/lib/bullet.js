const MovingObject = require('./moving_object.js');

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
