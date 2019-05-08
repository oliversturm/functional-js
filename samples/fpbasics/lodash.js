const _ = require('lodash');

// currying is easy
const add3 = (x, y, z) => x + y + z;

const curriedAdd3 = _.curry(add3);

// since lodash curry is pretty clever, I can call all kinds of variations
console.log(curriedAdd3(10, 20, 30));
console.log(curriedAdd3(10)(20)(30));
console.log(curriedAdd3(10, 20)(30));
console.log(curriedAdd3(10)(_, 30)(20));

// lodash can compose as well
const add5 = x => x + 5;
const mult7 = x => x * 7;
const add5mult7 = _.flowRight([mult7, add5]);
console.log(add5mult7(4));
