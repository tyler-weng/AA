
const HanoiGame = require('./game.js');
const HanoiView = require('./hanoi-view.js');

$( () => {
  const rootEl = $('figure.hanoi');
  const game = new HanoiGame();
  let view = new HanoiView(game, rootEl);
  return view;
});
