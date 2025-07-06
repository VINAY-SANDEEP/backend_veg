const Product = require('../Model/productModel');
const cloudinary = require('../config/cloudinary');

const createProduct = async (req, res) => {
  try {
    const { name, category, price, autalprice, stock, description, isAvailable } = req.body;

    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'products'
      });
      imageUrl = result.secure_url;
    }

    const newProduct = new Product({
      name,
      category,
      price,
      autalprice,
      stock,
      description,
      isAvailable,
      image: imageUrl
    });

    await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};
const getProducts = async (req,res) => {
   try {
      const products = await Product.find().sort({createdAt:-1});
  res.status(200).json(products);
   } catch (error) {
    console.log(error);
   }
}
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, category, price, autalprice, stock, description, isAvailable } = req.body;

    let updatedData = {
      name,
      category,
      price,
      autalprice,
      stock,
      description,
      isAvailable,
    };

    // If new image is uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'products',
      });
      updatedData.image = result.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedData, {
      new: true,
    });

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: 'Failed to update product' });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
};
module.exports = { createProduct,getProducts,updateProduct,deleteProduct };
