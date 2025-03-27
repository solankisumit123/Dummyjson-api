var express = require('express');
var router = express.Router();
const product = require("../controllers/productcontroller");

router.post('/createProduct', product.createProduct);
router.get('/getAllProducts', product.getAllProducts);
router.get('/getProductById/:id', product.getProductById);
router.put('/updateProduct/:id', product.updateProduct);
router.delete('/deleteProduct/:id', product.deleteProduct);
router.get('/searchProducts/search', product.searchProducts);
router.get('/getProductsWithLimitAndSkip/limit', product.getProductsWithLimitAndSkip);
router.get('/sortProducts/sort', product.sortProducts);
router.get('/getProductCategories/categories', product.getProductCategories);
router.get('/getProductsByCategory/category/:category', product.getProductsByCategory);

module.exports = router;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
