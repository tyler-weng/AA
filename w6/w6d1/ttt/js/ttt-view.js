class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {

    $("li").on("click", e =>{
      let $square = $(e.currentTarget);
      this.game.playMove(positions[$square[0].getAttribute("pos")]);
      this.makeMove($square);
    });
  }

  makeMove($square) {
    $square.text(this.game.currentPlayer);
    $square.attr("mark", this.game.currentPlayer);
    const realWinner = (this.game.winner() === "x" ? "o" : "x");
    if(this.game.isOver()) alert(realWinner);
  }

  setupBoard() {

    const $ul = $("<ul></ul>");
    $ul.addClass("group");
    // debugger;
    for (let i = 0; i < 9; i++) {
      const li = document.createElement("li");
      $(li).attr("pos", i);
      $ul.append(li);
    }
    this.$el.append($ul);
  }
}

let positions = {
  "0": [0, 0],
  "1": [0, 1],
  "2": [0, 2],
  "3": [1, 0],
  "4": [1, 1],
  "5": [1, 2],
  "6": [2, 0],
  "7": [2, 1],
  "8": [2, 2]
};

module.exports = View;
