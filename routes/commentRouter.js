// const { query } = require('express');
var express = require('express');
var router = express.Router();

router.post('/', (req,res, next) =>{
    let commentController = require('../controller/commentController');
    let comment = {
        userId: 1,
        productId: req.body.productId,           
        message:req.body.message 
    }
    if(!isNaN(req.body.parentCommentId) && req.body.parentCommentId != '' ){
        comment.parentCommentId = req.body.parentCommentId;
    }
        console.log(comment);
        commentController.add(comment)
        .then(() =>{
            res.redirect('/products/' + req.body.productId);
            
        }).catch(error => next(error));
    
} )


module.exports = router;