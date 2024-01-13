const Product = require('../models/productModels');
const ApiFeatures = require('../utils/apiFeatures');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');

// Create product - admin
exports.createProduct = catchAsyncError(async (req, res) => {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

// Get all products 
exports.getAllProducts = catchAsyncError(async (req, res) => {
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;

    if (!products.length) {
        throw new ErrorHandler('Products not found', 404);
    }

    res.status(200).json({
        success: true,
        products,
        productCount
    });
});

exports.getProductDetails = catchAsyncError(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ErrorHandler('Product not found', 404);
    }

    res.status(200).json({
        success: true,
        product
    });
});

// Update product - admin
exports.updateProduct = catchAsyncError(async (req, res) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        throw new ErrorHandler('Product not found', 404);
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        product
    });
});

exports.deleteProduct = catchAsyncError(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ErrorHandler('Product not found', 404);
    }

    await product.remove();
    res.status(200).json({
        success: true,
        product,
        message: 'Deleted successfully'
    });
});