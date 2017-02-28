const View = require('./ttt-view.js');
const Game = require ('../../ttt_node/game.js');
$( () => {
  // Your code here
  let game = new Game();
  let $el = $('figure.ttt');
  let view = new View(game, $el);
  
  return view;
});
