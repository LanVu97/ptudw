var express = require('express');
var router = express.Router();

router.get('/', (req,res, next) =>{
    if(req.query.category == null || isNaN(req.query.category)){
        req.query.category = 0;
    }
    if(req.query.brand == null || isNaN(req.query.brand)){
        req.query.brand = 0;
    }
    if(req.query.color == null || isNaN(req.query.color)){
        req.query.color = 0;
    }
    if(req.query.min == null || isNaN(req.query.min)){
        req.query.min = 0;
    }
    if(req.query.max == null || isNaN(req.query.max)){
        req.query.max = 100;
    }

    let categoryController = require('../controller/categoryController');
    categoryController.getAll()
    .then(data => {
        res.locals.categories = data;    
        let brandController = require('../controller/brandController');
        return brandController.getAll(req.query);      
    }).then(data =>{
        res.locals.brandes = data;
        let colorController = require('../controller/colorController');
        return colorController.getAll(req.query);
    }).then(data =>{
        res.locals.colors = data;
        let productController = require('../controller/productController');
        return productController.getAll(req.query);
        
    }).then(data =>{
        res.locals.products = data;
       
        res.render('category');
    })
  
    .catch(error => next(error));
    
} )

router.get('/:id',(req,res, next) =>{
    let productController = require('../controller/productController');
    productController.getById(req.params.id)
    .then(data =>{

        res.locals.product = data;       
        res.render('single-product');
    })
  
    .catch(error => next(error));
    
} )
module.exports = router;