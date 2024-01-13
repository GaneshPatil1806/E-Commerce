const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const router = express.Router();
const {isAuthenticatedUser,authorizedRoles} = require('../middleware/auth')

// Use router.get for handling GET requests
router.get('/products', getAllProducts);

// Use router.post for handling POST requests
router.post('/products/new', isAuthenticatedUser, authorizedRoles('admin'), isAuthenticatedUser,createProduct);

// Use router.put for handling PUT requests
router.put('/products/:id', isAuthenticatedUser, authorizedRoles('admin'), isAuthenticatedUser,updateProduct);

// Use router.delete for handling DELETE requests
router.delete('/products/:id', isAuthenticatedUser, authorizedRoles('admin'), isAuthenticatedUser,deleteProduct);

// Use router.get for handling GET requests for specific product details
router.get('/products/:id', getProductDetails);

module.exports = router;
