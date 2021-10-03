// const { query } = require('express');
var express = require('express');
var router = express.Router();

router.post('/', (req,res, next) =>{
    let reviewController = require('../controller/reviewController');
    let review = {
        userId: 1,
        productId: req.body.productId,           
        message:req.body.message,
        rating: req.body.rating
    }
   
        // console.log(review);
        reviewController.add(review)
        .then(() =>{
            res.redirect('/products/' + req.body.productId);
            
        }).catch(error => next(error));
    
} )


module.exports = router;