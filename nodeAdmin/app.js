// ======== USING EXPORTED MODULES =========

// general way
/*
const math = require('./math') //'.' means in this directory. /math is the name of the file
console.log(math.PI)
console.log(math.square(9))
*/

// if I only want some of them
/*
const {PI, add} = require('./math')
console.log(PI)
console.log(add(3,2))
*/

// ========= REQUIRING A DIRECTORY ========
const cats = require('./shelter') //this will require from the index file in the directory
console.log('REQUIRED AN ENITRE DIRECTORY!!...', cats)
