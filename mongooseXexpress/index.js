const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
// '$ npm i method-override' used to handle put/patch requests because html forms only do get/post
const methodOverride = require('method-override')

const Product = require('./models/product') // require the model

mongoose
  .connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('CONNECTION OPEN!!')
  })
  .catch(err => {
    console.log('OH NO, ERROR!!')
    console.log(err)
  })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true })) // allows us to access the body of the post request
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy']

// ======== CREATE ========
app.get('/products/new', (req, res) => {
  res.render('products/new', { categories })
})

app.post('/products', async (req, res) => {
  // console.log(req.body)
  const newProduct = new Product(req.body)
  await newProduct.save()
  // console.log(newProduct)
  res.redirect(`/products/${newProduct._id}`)
})

// ======== READ ========

// if there is a query string (?category=something), we just display the products of that category. query string created in show.ejs
app.get('/products', async (req, res) => {
  const { category } = req.query
  if (category) {
    const products = await Product.find({ category }) // finds all the products that match the category from query str. {category: category}
    res.render('products/index', { products, category })
  } else {
    const products = await Product.find({}) // can take time so make async function as it is a thenable (not promise tho)
    // console.log(products)
    res.render('products/index', { products, category: 'All Products' })
  }
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  // console.log(product)
  res.render('products/show', { product })
})

// ========= UPDATE =========
app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render('products/edit', { product, categories })
})

// using PUT request because we are completely re-writing the entire product rather than just changing one small thing
app.put('/products/:id', async (req, res) => {
  const { id } = req.params
  const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true }) //updates but only if it conforms to the validators
  res.redirect(`/products/${product._id}`)
})

// ======== DELETE ========
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params
  const deletedProduct = await Product.findByIdAndDelete(id)
  res.redirect('/products')
})

app.listen(3000, () => {
  console.log('IM LISTENING ON PORT 3000 BABY')
})
