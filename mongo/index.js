// ======== MONGO AND MONGOOSE ========
const mongoose = require('mongoose') // '$npm i mongoose'
// connects to what I type in: "movieApp". creates it if not already there
mongoose
  .connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true }) //off the docs
  .then(() => {
    console.log('CONNECTION OPEN!!')
  })
  .catch(err => {
    console.log('OH NO, ERROR!!')
    console.log(err)
  })

// ======== CREATE ========

// need to set up a schema
const movieSchema = new mongoose.Schema({
  title: String, // shorthand way. longhand way in product.js
  year: Number,
  score: Number,
  rating: String
})

// tell mongoose I want to make a model based on the above schema => Movie class
const Movie = mongoose.model('Movie', movieSchema) // pass in a string with name of the model. Singular and capitalised 'Movie'. It will make a collection for us called 'movies' (lowercase and plural)

/*
const amadeus = new Movie({ title: 'Amadeus', year: 11986, score: 9.2, rating: 'R' })
amadeus.save() // need to .save in order to add to db
*/

// go in node repl by typing '$ node" in correct dir. '.load index.js'. can view amadeus there. amadeus now added to mongo database. type '$ mongo' in new terminal. 'use movieApp'. can now view amadeus in db.movies.find()

//way to insert more than one. works as a promise. don't need to call .save()
Movie.insertMany([
  { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
  { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
  { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
  { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
  { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
]).then(data => {
  console.log('IT WORKED!')
  console.log(data)
})

// ======== READ =========
// Movie.find() doesnt return a promise but a promise-like object. it is 'thenable' (can .then() it)
Movie.find({ year: { $gte: 2010 } }).then(data => console.log('LATER THAN 2010', data))
Movie.findById('5f9c4dbc3fdc1c9c93f0906a').then(m => console.log('AMADEUS SEARCHED BY ID', m))

// ======== UPDATE ========
Movie.updateOne({ title: 'Amadeus' }, { year: 1984 }).then(res => console.log(res))
Movie.updateMany({ title: { $in: ['Amadeus', 'Stand By Me'] } }, { score: 10 }).then(res => console.log(res))
// the above 2 dont return the movie object after. below does but needs to be {new: true} ot return updated version rather than old version.
Movie.findOneAndUpdate({ title: 'The Iron Giant' }, { score: 7.8 }, { new: true }).then(m => console.log(m))

// ======== DELETE ========
Movie.deleteOne({ title: 'Amelie' }).then(msg => console.log(msg))
Movie.deleteMany({ year: { $gte: 1999 } }).then(msg => console.log(msg))
Movie.findOneAndDelete() // same as above
Movie.findByIdAndDelete()
