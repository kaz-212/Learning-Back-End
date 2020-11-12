const express = require('express')
const app = express() // creates and exoress app

// any time you have any type of incoming request, the callback in app.use will run
// express passes in two objects as parameters, the first one represents the request, and the second represents the response (so can call them req and res). Parses in the http request as a js object

/*
app.use((req, res) => {
  console.log("WE GOT A NEW REQUEST")
  // res.send("Hello! We got your request! This is a response :)")
  // res.send({name:'tobi'})
  res.send('<h1>This is my webpage</h1>')
})
*/

// app.get expects the path we are matching and a callback function
// have to comment out the app.use above because we cant have an http req that has more than one response, and app.use matches EVERY request.

app.get('/', (req, res) => {
  res.send('THIS IS THE HOMEPAGE!!!!')
})
app.post('/cats', (req, res) => {
  res.send('Post request to "/cats". This is different to a get request!')
})
app.get('/cats', (req, res) => {
  res.send('MEOW!')
})
app.get('/dogs', (req, res) => {
  res.send('WOOF!')
})

// perhaps I want to define a pattern for my route. e.g. you can type www.reddit.com/r/foo where foo can be any subreddit.
// the colon makes it a variable
app.get('/r/:subreddit', (req, res) => {
  // console.log(req.params)
  const { subreddit } = req.params //req.params gives an object. this way of saving to variable is called destructuring an object
  res.send(`<h1>This is a ${subreddit} subreddit!</h1>`)
})

// ======== QUERY STRINGS ========
// url would look like /search?q=dogs
app.get('/search', (req, res) => {
  // console.log(req.query)
  const { q } = req.query
  if (!q) {
    res.send('Nothing found if nothing searched :(')
  }
  res.send(`<h1> Search results for ${q} </h1>`)
})

// '*' means everything (i.e. for all paths). must come at the end because can only do one res.send() so this will oly run if all the defined routes above don't run.
app.get('*', (req, res) => {
  res.send('I dont know that path!')
})

//  the listen method starts the server so that we can make requests to it
app.listen(3000, () => {
  console.log('LISTENING ON PORT 3000')
})
