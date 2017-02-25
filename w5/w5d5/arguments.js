function sum(nums) {
  let args = Array.from(arguments);
  return args.reduce((x, y) => x + y);
}

let sum2 = (...args) => args.reduce((x, y) => x + y);


Object.prototype.myBind = function (context) {
  const fn = this;
  const bindingArgs = Array.from(arguments).slice(1);
  return function () {
    const callArgs = Array.from(arguments);
    return fn.apply(context, bindingArgs.concat(callArgs));
  };
};

Object.prototype.myBind = function (context, ...bargs) {
  const fn = this;
  return function (...cargs) {
    return fn.apply(context, bargs.concat(cargs));
  };
};

function curriedSum(capacity) {
  const nums = [];
  function _curriedSum(num) {
    nums.push(num);
    if (nums.length === capacity) {
      return nums.reduce((x, y) => x + y);
    }
    else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}

Function.prototype.curry = function(capacity) {
  const args = [];
  const fn = this;
  function _curry(arg) {
    args.push(arg);
    return (args.length === capacity) ? fn.apply(null, args) : _curry;
  }
  return _curry;
};
