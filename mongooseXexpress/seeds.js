// seed the database, i.e. give it some data so we're not working with an empty database

const Product = require('./models/product') // require the model
const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('CONNECTION OPEN!!')
  })
  .catch(err => {
    console.log('OH NO, ERROR!!')
    console.log(err)
  })

/*
const p = new Product({
  name: 'Ruby Grapefruit',
  price: 1.99,
  category: 'fruit'
})

p.save()
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
*/

const seedProducts = [
  {
    name: 'Fairy Eggplant',
    price: 1.0,
    category: 'vegetable'
  },
  {
    name: 'Organic Goddess Melon',
    price: 4.99,
    category: 'fruit'
  },
  {
    name: 'Organic Mini Seedless Watermelon',
    price: 3.99,
    category: 'fruit'
  },
  {
    name: 'Organic Celery',
    price: 1.5,
    category: 'vegetable'
  },
  {
    name: 'Chocolate Whole Milk',
    price: 2.69,
    category: 'dairy'
  }
]

// remember dont need to .save() for insertMany
Product.insertMany(seedProducts) // if any of the above don't pass validation, mongoose wont insert any of them
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
