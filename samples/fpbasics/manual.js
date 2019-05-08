// These two are the same now, for most intentions
function addF(x, y) {
  return x + y;
}

const add = (x, y) => x + y;

// Both functions have two parameters, so I need to pass both:
console.log(add(10, 20));

// This doesn't render a useful result - y is undefined in this case
console.log(add(10));

// By defining functions in curried format, I can deal with
// one parameter at a time
const add_ = x => y => x + y;

// Then it makes more sense to call with fewer than two parameters
// at a time. Such a call returns a new function:
const add5 = add_(5);
console.log(add5(17));

// I can now create new functions like add5 by partially applying
// another function. I could also make myself a helper for currying:
const curry = f => {
  if (f.length < 2) return f;
  let receivedParams = 0;
  let params = [];
  const step = x => {
    params = params.concat(x);
    receivedParams++;
    return receivedParams === f.length ? f(...params) : step;
  };
  return step;
};

const curriedAdd = curry(add);
const add11 = curriedAdd(11);
console.log(add11(33));

const div = (x, y) => x / y;
const curriedDiv = curry(div);
// making sure the parameters are handled in the correct order
console.log(curriedDiv(21)(3));

// Composition is the mechanism that combines two function calls
const mult = x => y => x * y;
const mult7 = mult(7);

console.log(mult7(add5(12)));

const compose_ = f => g => x => f(g(x));
const mult7add5 = compose_(mult7)(add5);
console.log(mult7add5(12));

const compose = fs => x => fs.reverse().reduce((r, v) => v(r), x);
const mult7add5_ = compose([mult7, add5]);
console.log(mult7add5_(12));
