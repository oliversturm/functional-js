// When running this code in VS Code, the debugger sometimes behaves strangely
// and misses some of the content from the console.log instructions below.
// Try running outside the debugger (Ctrl-F5) to make sure you see all
// the output. (VS Code 1.26.1)

const Im = require('seamless-immutable');

// objects can be made immutable
const person = Im({ firstName: 'Oli', lastName: 'Sturm', age: 23 });
person.firstName = 'Willy';
console.log(person);

// same for lists
const list = Im([10, 20, { item: 11, node: 'a node' }]);
list[1] = 13;
console.log(list);

// instead of modifying, we create new objects
console.log(person.set('firstName', 'Willy'));
console.log(person.merge({ firstName: 'Willy', age: 47, country: 'Greece' }));
console.log(list.setIn([2, 'node'], 'a different node'));
