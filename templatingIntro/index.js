const express = require('express')
const app = express()
const path = require('path')
const redditData = require('./data.json') //dont have to export in json files to require them. require() also parses the json

// app.use always runs. this links the static files (like stylesheets or js etc.) etc.
app.use(express.static(path.join(__dirname, '/public')))

// sets the view engine to ejs (embedded javasript template) (need to '$ npm i ejs' in this dir but dont need to require)
//by default, express is going to assume that our views(templates) exist in a folder called 'views' so need to make a dir called views. Need to then make a .ejs file in it
app.set('view engine', 'ejs')
// below will provide an absolute path to the views folder. the default is relative to the directory you're in on the command line (i.e. process.cwd() ). below joins the dir path of the index file with /views so will work from anywhere. need to require(path)
app.set('views', path.join(__dirname, '/views'))

// dont need the 'views/' because have set it above. dont need '.ejs' because of app.set
// need to send in the title as a variable because there is one template for all the heads
app.get('/', (req, res) => {
  res.render('home.ejs', { title: 'Home' })
})

// by doing this, we make the variable 'rando' available to the random.ejs template.
app.get('/rand', (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1
  res.render('random', { rando: num, title: 'Random' }) // if key and value are the same (e.g. { num: num }, can just pass in { num })
})

/*
app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params
  res.render('subreddit', { subreddit }) // sends subreddit as a variable to the subreddit.ejs
})
*/

app.get('/r/:subreddit', (req, res) => {
  const { subreddit } = req.params
  const data = redditData[subreddit]
  // console.log(data)
  if (data) {
    res.render('subreddit', {
      ...data,
      title: subreddit.charAt(0).toUpperCase() + subreddit.slice(1)
    }) // spreading the object data like this (with '{}') creates a copy of the object 'data' so saves the keys as variables a la line 20
  } else {
    res.render('notfound', { subreddit })
  }
})

app.get('/cats', (req, res) => {
  // pretend cats is a database
  const cats = [
    'Alice',
    'Geoffrey',
    'McDougal',
    'Policeman',
    'Whiskas',
    'Molly Slolly'
  ]
  res.render('cats', { cats, title: 'Cats' })
})

app.listen(3000, () => {
  console.log('LISTENING ON PORT 3000')
})

console.log(redditData)
