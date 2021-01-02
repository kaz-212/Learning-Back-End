// ======== BIT MORE ON SCHEMAS ========

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

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // has to have a name
    maxlength: 20 // max length of 20 characters
  },
  price: {
    type: Number,
    min: [0, 'Price must be positive'] // can set min/max for numbers, and if you want you can include error message
  },
  onSale: {
    type: Boolean,
    default: false // sets the default value to false if not otherwise specified
  },
  categories: [String], // this input will be an array just containing strings
  qty: {
    online: {
      type: Number,
      default: 0
    },
    inStore: {
      type: Number,
      default: 0
    }
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L'] // size has to be one of these
  }
})

// ======== MODEL INSTANCE METHODS ========

// every time thres an instance of product, i can call this method on it i.e. bike.greet()
// dont use arrow function, use 'function' because of how they both treat 'this'
// must come before we make the model

/*
productSchema.methods.greet = function () {
  console.log('hello, hi, howdy')
  console.log(`- from ${this.name}`)
}
*/

// instance method to change the boolean value of onsale to false if true or true if false
productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale
  return this.save() // behaves like a promise i.e. is a thenable. We can await it somewhere else.
}

// instance method to add a category
productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat)
  return this.save()
}

// ======== MODEL STATIC METHODS ========

// applies to the entire model, not one particular instance
// must come before we make the model

// firesale selects everything , makes it on sale, changes price to 0
productSchema.statics.fireSale = function () {
  return this.updateMany({}, { onsale: true, price: 0 })
}

// ======== MAKE THE MODEL ========
const Product = mongoose.model('Product', productSchema)

// can also call the INSTANCE method on a product that you find, e.g.
const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: 'Mountain Bike' })
  console.log(foundProduct)
  await foundProduct.toggleOnSale()
  console.log(foundProduct)
  await foundProduct.addCategory('Outdoors')
  console.log(foundProduct)
}

// findProduct()

// can call STATIC method
Product.fireSale().then(res => console.log(res))

// const bike = new Product({ name: 'Mountain Bike', price: 599, categories: ['Cycling', 'Exercise'] })
// bike
//   .save()
//   .then(data => {
//     console.log('IT WORKED!!!!')
//     console.log(data)
//   })
//   .catch(err => {
//     console.log('OH NO, ERROR!!')
//     console.log(err)
//   })

// run validators means keep the min: 0, maxlength: 20  etc. for the update
/*
Product.findOneAndUpdate({ name: 'Mountain Bike' }, { price: 499 }, { new: true, runValidators: true })
  .then(data => {
    console.log('IT WORKED!!!!')
    console.log(data)
  })
  .catch(err => {
    console.log('OH NO, ERROR!!')
    console.log(err)
  })
*/
