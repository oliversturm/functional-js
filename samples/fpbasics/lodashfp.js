const lo = require('lodash');
const lofp = require('lodash/fp');

// in lodash/fp, compose is an alias to flowRight
const add5 = x => x + 5;
const mult7 = x => x * 7;
const add5mult7 = lofp.compose([mult7, add5]);
console.log(add5mult7(4));

// standard lodash receives collections first for functions like
// map and reduce
const list = [3, 7];

console.log(lo.map(list, x => x * x));
console.log(lo.reduce(list, (r, v) => r + v));

// For partial application purposes, it makes much more sense
// to receive the algorithm first. So lodash/fp uses different
// parameter order.

const squareVals = lofp.map(x => x * x);
// note that we can't leave out the optional "start value" parameter in this case
const sum = lofp.reduce((r, v) => r + v)(0);
console.log(squareVals(list));
console.log(sum(list));
