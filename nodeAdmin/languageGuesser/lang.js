const franc = require('franc')
const langs = require('langs')
// process.argv is a way of taking in data from the command line
// " node lang.js 'help me' " would append 'help me' to process.argv (starting with index 2). you can add more by separating with a space
const sentence = process.argv[2]

if (franc(sentence) == 'und') {
  console.log("SORRY COULDNT FIGURE IT OUT. TRY WITH LONGER TEXT")
} else {
  console.log(langs.where('3', `${franc(sentence)}`).name)  
}
"hi"