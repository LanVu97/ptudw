var express = require('express');
var router = express.Router();

router.get('/', (req,res, next) =>{
    let categoryController = require('../controller/categoryController');
    categoryController.getAll()
    .then(data => {
        res.locals.categories = data;
        
        let productController = require('../controller/productController');
        return productController.getTrendingProduct();
        
    }).then(data =>{
        res.locals.trendingProduct = data;
        
        res.render('index');
    })
  
    .catch(error => next(error));
    
} )

module.exports = router;