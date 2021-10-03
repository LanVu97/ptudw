let controller = {};
let models = require('../models');
let Review = models.Review;
//const { Op } = require("sequelize");
controller.add = (review) => {
    console.log(review)
    return new Promise((resolve, reject) =>{
        Review.findOne({
            where:{
                productId: review.productId,
                userId: review.userId,
            }
        }).then((data)=>{
            if(data){
                console.log(review)
                return Review.update(review, {
                    where:{
                        productId: review.productId,
                        userId: review.userId,
                        
                    }
                })
            }else{
              return Review.create(review)
            }
        }).then(() =>{
            models.Product.findOne({
                where:{id: review.productId},
                include : [{model: models.Review}]
            
            }).then((product) =>{
                let reviews = product.Reviews
                let ratingCount = reviews.length;
                
                let sumRating = 0;
                for(let i  in reviews){
                    sumRating += reviews[i].rating;
                }
                let overallRating = sumRating/ ratingCount;
                
                return models.Product.update({
                    overallReview: overallRating,
                     reviewCount: ratingCount
                },{
                    where:{
                        id: review.productId,
                    }
                })
            })

           
        })      
        .then(data => resolve(data))
        .catch(error => reject(new Error(error)));
    });
  
};

module.exports = controller;

