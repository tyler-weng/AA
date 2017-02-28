class HanoiView{
  constructor(game, rootEl) {
    this.game = game;
    this.rootEl = rootEl;
    this.setupTowers();
    this.clickTower();
    this.startTowerIdx = undefined;

  }

  setupTowers() {
    for (let i = 0; i < 3; i++) {
      const $ul = $("<ul></ul>");
      $ul.attr("pos", i);
      if (i === 0) {
        for (let j = 1; j <= 3; j++) {
          const $li = $("<li>[]</li>");
          $li.attr("weight", j);
          $ul.append($li);
        }
      }
      this.rootEl.append($ul);
    }
  }

  // render() {
  //
  //   const $ul = $('ul');
  //   this.game.towers.forEach((tower, idx) => {
  //     let currentUl = $($ul[idx]);
  //     currentUl = $("<ul>placeholder</ul>");
  //     currentUl.attr("pos", idx);
  //     tower.forEach(disc => {
  //       if (disc) {
  //         const $li = $("<li>[]</li>");
  //         $li.attr("weight", 3 - disc);
  //         currentUl.append($li);
  //       }
  //     });
  //   });
  //   debugger;
  //   this.game.print();
  // }


  // render (){
  //   const $ulAll = $("ul");
  //   this.rootEl.children().remove();
  //   this.game.towers.forEach((tower,idx) => {
  //     const $ul = $("<ul></ul>");
  //     tower.forEach((disc) => {
  //       const $li = $("<li>[]</li>");
  //       $li.attr("weight", 3 - disc);
  //       $ul.append($li);
  //     });
  //     this.rootEl.append($ul);
  //   });
  //
  // }

  render (){
    const $ulAll = $("ul");
    $ulAll.children().remove();
    this.game.towers.forEach((tower,idx) => {
      tower.forEach((disc) => {
        const $li = $("<li>[]</li>");
        $li.attr("weight", disc);
        $($ulAll[idx]).prepend($li);
      });
    });

  }

  clickTower() {
    $("ul").on("click", e => {

      const tower = $(e.currentTarget);
      tower.addClass("clicked");
      if (this.startTowerIdx !== undefined) {
        const endTowerIdx = parseInt(tower.attr("pos"), 10);
        // debugger;
        this.game.move(this.startTowerIdx, endTowerIdx);
        this.startTowerIdx = undefined;
        $("ul").removeClass("clicked");
        if (this.game.isWon()) {
          alert("You won, rockstar!");
        }
        this.game.print();
        this.render();
      } else {
        this.startTowerIdx = parseInt(tower.attr("pos"), 10);

        // debugger;
      }
    });
  }
}

module.exports = HanoiView;
