const express = require('express');
const router = express.Router();
const {Register,login} = require('../Controllers/adminController')
const upload = require('../middleware/upload');
const { createProduct,getProducts,updateProduct,deleteProduct }  = require('../Controllers/productController');
router.post('/Register',Register);
router.post('/login',login);
router.post('/Addproduct', upload.single('image'), createProduct);
router.get('/products', getProducts);
router.put('/products/:id', upload.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);
module.exports = router;