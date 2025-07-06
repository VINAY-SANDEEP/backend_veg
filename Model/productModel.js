const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Leafy', 'Root', 'Fruit', 'Organic', 'Seasonal', 'Others'],
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  autalprice: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  image:{
    type: String,
    default: '',
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
},{ timestamps: true});

module.exports = mongoose.model('Product', productSchema);
