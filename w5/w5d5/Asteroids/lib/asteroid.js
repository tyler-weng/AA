const Util = require('./utils.js');
const MovingObject = require('./moving_object.js');

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
