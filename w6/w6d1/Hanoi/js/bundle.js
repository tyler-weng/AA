/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);

	$( () => {
	  const rootEl = $('figure.hanoi');
	  const game = new HanoiGame();
	  let view = new HanoiView(game, rootEl);
	  return view;
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);