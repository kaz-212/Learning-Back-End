// ======== MONGOOSE VIRTUALS and MIDDLEWARE ========

const mongoose = require('mongoose') // '$npm i mongoose'
mongoose
  .connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('CONNECTION OPEN!!')
  })
  .catch(err => {
    console.log('OH NO, ERROR!!')
    console.log(err)
  })

const personSchema = new mongoose.Schema({
  first: String,
  last: String
})
// GET function VIRTUAL
// this is different to adding an instance method because this will be behave as though it's an actual property
personSchema.virtual('fullName').get(function () {
  return `${this.first} ${this.last}`
})

// MIDDLEWARE
// will run pre save
personSchema.pre('save', async function () {
  console.log('ABOUT TO SAVE')
})
// will run post save
personSchema.post('save', async function () {
  console.log('JUST SAVED')
})

const Person = mongoose.model('Person', personSchema)

const tammy = new Person({ first: 'Tammy', last: 'Abraham' })
tammy.save()
console.log(tammy.fullname)
// SET function available on docs
