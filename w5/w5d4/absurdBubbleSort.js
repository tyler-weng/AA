const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function absurdBubbleSort(arr, sortCompletionCallback) {
  if (arr.length < 2 ) return arr;

  function outerBubbleSortLoop(madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    }
    else {
      return sortCompletionCallback(arr);
    }
  }

  let madeAnySwaps = true;
  outerBubbleSortLoop(madeAnySwaps);
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  console.log(`this is i ${i}`);
  if (i === arr.length - 1) {
    outerBubbleSortLoop(madeAnySwaps);
  }else {
    let callback = isGreaterThan => {

      if (isGreaterThan) {
        swap(arr, i, i+1);
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i+1, madeAnySwaps, outerBubbleSortLoop);
    };
    askIfGreaterThan(arr[i], arr[i + 1], callback);
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function askIfGreaterThan(el1, el2, callback){
  reader.question(`Is el1 bigger than el2? el1: ${el1} el2: ${el2}`,
     answer => callback(answer === 'yes'));
}
absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});
// let arr = [1,3,2,6];
// let i = 0;
// let madeAnySwaps = false;
//
// function outerBubbleSortLoop() {
//   console.log("we are in outerBubbleSortLoop");
//   console.log(`${arr}`);
//    reader.close();
// }
//
// innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop);



// let arr = [1,2,3];
//
// let i = 0;
// let madeAnySwaps = true;
// let callback = function(isGreaterThan) {
//   if (isGreaterThan) {
//     swap(arr, i, i+1);
//     madeAnySwaps = true;
//     reader.close();
//   }
// };
//
// askIfGreaterThan(1, 2, callback);
