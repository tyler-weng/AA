function madLib(verb, adj, noun) {
  console.log(`We shall ${verb.toUpperCase()} the ${adj.toUpperCase()} ${noun.toUpperCase()}`);
}

function isSubstring(searchString, subString) {
  return searchString.includes(subString);
}

function fizzBuzz(array) {
  return array.filter(fizzBuzzable)
}

function fizzBuzzable(n) {
  return (n % 3 === 0 || n % 5 === 0) && (n % 15 !== 0);
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if(n % i === 0) return false;
  }
  return true;
}

function sumOfNPrimes(n) {
  let sum = 0;
  let count = 0;
  let pot_prime = 2;
  while(count < n) {
    if (isPrime(pot_prime)) {
      sum += pot_prime;
      count++;
    }
    pot_prime++;
  }
  return sum;
}

function editDistance(from_str, to_str) {
  if(!to_str) return from_str.length;
  if(!from_str) return to_str.length;

  return Math.min(editDistance(from_str.slice(0, -1), to_str) + 1,
                  editDistance(from_str, to_str.slice(0, -1)) + 1,
                  editDistance(from_str.slice(0, -1), to_str.slice(0, -1)) +
                    (from_str.slice(-1) === to_str.slice(-1) ? 0 : 1)
                );
}

function titleize(array, func) {
  let mapped = array.map(w => w[0].toUpperCase() + w.slice(1));
  mapped.forEach(el => func(el));
}

class Elephant {
  constructor(name, height, tricks) {
    this.name = name;
    this.height = height;
    this.tricks = tricks || [];
  }

  trumpet() {
    console.log(`${this.name} the elephant goes 'phrRRRRRRRRRRR!!!!!!!'`);
  }

  grow() {
    this.height += 12;
  }

  addTrick(trick) {
    this.tricks.push(trick);
  }

  play() {
    console.log(this.tricks[Math.floor(Math.random() * this.tricks.length)]);
  }

  paradeHelper(elephant) {

  }
}

let ellie = new Elephant("Ellie", 185, ["giving human friends a ride", "playing hide and seek"]);
let charlie = new Elephant("Charlie", 200, ["painting pictures", "spraying water for a slip and slide"]);
let kate = new Elephant("Kate", 234, ["writing letters", "stealing peanuts"]);
let micah = new Elephant("Micah", 143, ["trotting", "playing tic tac toe", "doing elephant ballet"]);

let herd = [ellie, charlie, kate, micah];
