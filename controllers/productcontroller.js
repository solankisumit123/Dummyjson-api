const Product = require('../models/Product');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Search products by name
exports.searchProducts = async (req, res) => {
    try {
        const products = await Product.find({ name: { $regex: req.query.name, $options: 'i' } });
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get products with limit and skip
exports.getProductsWithLimitAndSkip = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(req.query.skip) || 0;
        const products = await Product.find().limit(limit).skip(skip);
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Sort products by price
exports.sortProducts = async (req, res) => {
    try {
        const sortOrder = req.query.sort === 'desc' ? -1 : 1;
        const products = await Product.find().sort({ price: sortOrder });
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all product categories
exports.getProductCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.status(200).json(categories);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get products by category

exports.getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};