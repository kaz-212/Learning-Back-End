const express = require('express')
app = express()

// this parses the post request (req.body) from url encoded data. could have been from json or something else
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

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
