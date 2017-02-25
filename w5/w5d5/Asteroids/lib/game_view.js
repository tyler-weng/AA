const Game = require('./game.js');

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
