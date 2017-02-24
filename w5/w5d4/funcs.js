const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft<= 0 ){
    completionCallback(sum);
  }
  if (numsLeft > 0){
    reader.question("please insert a number", function(ans) {
      let num = parseInt(ans,10);
      sum += num;
      console.log(sum);
      addNumbers(sum, numsLeft -1 , completionCallback);
    });
  }
}

addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));
