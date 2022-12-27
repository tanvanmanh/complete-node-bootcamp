// console.log(arguments);
console.log(require('module').wrapper);
console.log(require('assert').wrapper);

// module.exports
const Calculator = require('./test-module-1');
const cal1 = new Calculator();
console.log(cal1.add(2, 3));

const { add, multiply } = require('./test-module-2');
console.log(add(2, 3));
console.log(multiply(2, 3));

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
