// ======== EXPORTING A DIRECTORY =========
// create node will always look for an index.js file
const alice = require('./alice');
const jeff = require('./jeff');
const sandra = require('./sandra');

const allCats = [alice, jeff, sandra]
module.exports = allCats;