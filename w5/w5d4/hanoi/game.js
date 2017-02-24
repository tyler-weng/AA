const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {
  constructor() {
    this.stacks = [[3, 2, 1], [], []];
  }

  promptMove(callback) {
    this.print();

    reader.question("Please insert from_stack, to_stack", callback);
  }


  isValidMove(startTowerIdx, endTowerIdx) {
    let validPositions = [0, 1, 2];
    let startTower = this.stacks[startTowerIdx];
    let endTower = this.stacks[endTowerIdx];
    let disk = startTower[startTower.length - 1];

    return validPositions.includes(startTowerIdx) &&
           validPositions.includes(endTowerIdx) &&
           !!(startTower.length) &&
           (!endTower.length || endTower[endTower.length - 1] < disk);
  }

  move(startTowerIdx, endTowerIdx) {
    let startTower = this.stacks[startTowerIdx];
    let endTower = this.stacks[endTowerIdx];

    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      let disk = startTower.pop();
      endTower.push(disk);
      return true;
    }
    else {
      return false;
    }
  }

  isWon() {
    return this.stacks[1].length === 3 || this.stacks[2].length === 3;
  }

  print() {
    this.stacks.forEach(tower => console.log(tower));
  }

  run(completionCallback) {

    let callback = input => {
      let parsedInput = Game.parseInput(input);
      let startTowerIdx = parsedInput[0];
      let endTowerIdx = parsedInput[1];

      console.log(this.move(startTowerIdx, endTowerIdx));
      this.run(completionCallback);
    };

    if (this.isWon()) {
      return completionCallback();
    }

    this.promptMove(callback);
  }

  static parseInput(input) {
    console.log(input);
    console.log(input.split(", ").map(val => parseInt(val, 10)));
    return input.split(", ").map(val => parseInt(val, 10));
  }

}

let cb = function() {
  console.log("Congrats, you win!");
  reader.close();
};

let g = new Game();
g.run(cb);
