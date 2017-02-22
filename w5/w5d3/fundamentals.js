function madLib(verb, adj, noun) {
  console.log(`We shall ${verb.toUpperCase()} the ${adj.toUpperCase()} ${noun.toUpperCase()}`);
}

function isSubstring(searchString, subString) {
  return searchString.includes(subString);
}

function fizzBuzz(array) {
  array.filter(fizzBuzzable)
}

function fizzBuzzable(n) {
  return (n % 3 === 0 || n % 5 === 0) && n % 15 !== 0;
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
