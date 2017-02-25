const GameView = require('./game_view.js');
const Game = require('./game.js');
document.addEventListener("DOMContentLoaded", () => {
    const elem = document.getElementById("game-canvas");
    const ctx = elem.getContext("2d");
    const View = new GameView(new Game(), ctx);
    View.start();
  });
