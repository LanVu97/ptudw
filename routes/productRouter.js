var express = require('express');
var router = express.Router();

router.get('/', (req,res, next) =>{
    let categoryController = require('../controller/categoryController');
    categoryController.getAll()
    .then(data => {
        res.locals.categories = data;    
        let brandController = require('../controller/brandController');
        return brandController.getAll();      
    }).then(data =>{
        res.locals.brandes = data;
        let colorController = require('../controller/colorController');
        return colorController.getAll();
    }).then(data =>{
        res.locals.colors = data;
        let productController = require('../controller/productController');
        return productController.getAll();
        
    }).then(data =>{
        res.locals.products = data;
       
        res.render('category');
    })
  
    .catch(error => next(error));
    
} )

module.exports = router;