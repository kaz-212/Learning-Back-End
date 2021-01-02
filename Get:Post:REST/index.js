// ======== REST ========

// performing basic CRUD functionality blueprint as below is compliant with REST protocol, but isnt the only way we can be RESTful

// C : POST /comments - Create a new comment {CREATE ROUTE}
// C : GET /comments/new - Form to Create new comment {NEW ROUTE}
// R : GET /comments - Read/list out all comments {INDEX ROUTE}
// R : GET /comments/:id - Read one comment (using ID) {SHOW ROUTE}
// U : PATCH /comments/:id  - Update one comment {UPDATE ROUTE} (could use PUT but that for completely overwriting somethng)
// U : GET /comments/:id/edit - Form to edit specific comment {EDIT ROUTE}
// D : DELETE /comments/:id - Delete one comment {DELETE ROUTE}

// ======================

const express = require('express') // $ npm i express
app = express()
const path = require('path') // dont need to npm i path
// can use uuid to generate idnames for things like comments/posts/videos etc.
// w want 'v4' from uuid, so the below syntax takes v4 from uuid and saves it as a variable called uuid
const { v4: uuid } = require('uuid') // $ npm i uuid
const methodOverride = require('method-override') // $ npm i method-override

// this parses the post request (req.body) from url encoded data and json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// below (in conjunction w edit.ejs) will treat the POST method from the form as a PATCH using a query string
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
// $ npm i ejs
app.set('view engine', 'ejs')

// fake database
let comments = [
  {
    id: uuid(),
    username: 'Schmichael',
    comment: " Omg no way that's sooo funny"
  },
  {
    id: uuid(),
    username: 'Black Orpheus',
    comment: ' Have you heard of the ii V I bro!?'
  },
  {
    id: uuid(),
    username: 'TheWeatherMan',
    comment: " There's gna be raaiiin motherflippers"
  },
  {
    id: uuid(),
    username: 'Monet',
    comment: ' Give me oil in my lamp'
  }
]

// READ
app.get('/comments', (req, res) => {
  res.render('comments/index', { comments })
})

// CREATE - NEW (renders a form)
app.get('/comments/new', (req, res) => {
  res.render('comments/new')
})

// CREATE - NEW (takes the data submitted via post request form and adds it to database)
// then redirects user back to page with all the comments
app.post('/comments', (req, res) => {
  const { username, comment } = req.body
  comments.push({ username, comment, id: uuid() })
  res.redirect('/comments')
})

// READ - SHOW (shows a specific comment)
app.get('/comments/:id', (req, res) => {
  const { id } = req.params // or req.params.name
  // this finds the object in the fake database ('comments') above, that matches the id from the url
  const comment = comments.find(c => c.id === id)
  res.render('comments/show', { comment })
})

// UPDATE - EDIT (create a form to send the patch request)
app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params
  const comment = comments.find(c => c.id === id)
  res.render('comments/edit', { comment })
})

// UPDATE -  (updata a tasty comment)
app.patch('/comments/:id', (req, res) => {
  const { id } = req.params // take id from url
  const { comment: newCommentText } = req.body // take what was send in the request body (payload)
  // const newCommentText = req.body.comment // does same as line above
  const foundComment = comments.find(c => c.id === id) // find comment with the same id
  foundComment.comment = newCommentText // update the 'comment' property of the comment object with newCommentText
  res.redirect('/comments')
})

// DELETE - (delete a not so tasty comment)
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params
  comments = comments.filter(c => c.id !== id) //comments.filter creates a new array without the selected id in it. best practice not to mutate an array but to make a new one. here we reassign the comments variable to the new array
  res.redirect('/comments')
})

//======== forms and get/push =========
app.get('/tacos', (req, res) => {
  res.send('GET /tacos response')
})

app.post('/tacos', (req, res) => {
  const { meat, qty } = req.body
  res.send(`Okay, here are your ${qty} ${meat} tacos`)
})

app.listen(3000, () => {
  console.log('Here on port 3000 :)')
})
