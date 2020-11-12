// ======== EXPORTING MODULES =========

const add = (x,y) => x + y;
const PI = 3.14159;
square = x => x*x;

// the above arent immediately accessible by app.js even if we 'require' them. we need to export them.
// shortcut syntax is leave out the 'module' bit, but you cant leave it out if you are exporting a string or something
/*
module.exports.add = add;
exports.PI = PI;
exports.square = square;
*/

// can also make a math object

const math = {
  add: add,
  PI: PI,
  square: square
}

module.exports = math;