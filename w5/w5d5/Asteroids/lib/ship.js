const MovingObject = require('./moving_object.js');
const Bullet = require('./bullet.js');

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
