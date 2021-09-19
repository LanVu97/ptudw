let controller = {};
let models = require('../models');
let Product = models.Product;
const { Op } = require("sequelize");
controller.getTrendingProduct = () => {
    return new Promise((resolve, reject) =>{
        Product.findAll({
            order: [['overallReview', 'DESC']],
            limit: 8,
            include: [{model: models.Category}],
            attributes: ['id', 'name', 'imagepath', 'price']
        }).then(data => resolve(data))
        .catch(error => reject(new Error(error)));
    }); 
};

controller.getAll = (query) => {
    let option = {          
        include: [{model: models.Category}],
        attributes: ['id', 'name', 'imagepath', 'price'],
        where: {
            price: {
                [Op.lt]: query.max,
                [Op.gt]: query.min
              }
        }
    } ;
    if(query.category > 0){
        option.where.categoryId = query.category;
    }
    if(query.brand > 0){
        option.where.brandId = query.brand;
    }
    if(query.color > 0){
        //
        option.include.push(
            {
                model: models.ProductColor,
                where: {colorId: query.color}
            }
        ) 
    }
    if(query.sort){
        switch(query.sort){
            // case 'name':
            //     option.order = [['name', 'ASC']];
            //     break;
            case 'price':
                option.order = [['price', 'ASC']];
                break;
            case 'overallReview':
                option.order = [['overallReview', 'DESC']];
                break;
            default:
                option.order = [['name', 'ASC']]
        }
        
    }
    if(query.limit > 0){
        option.limit = query.limit;
        console.log(query.page);
        option.offset = (query.page -1) * query.limit;        
    }
    if(query.search != ''){
        option.where.name = {
            [Op.iLike]: `%${query.search.trim()}%`
        }        
    }

    return new Promise((resolve, reject) =>{
        Product.findAndCountAll(option).
        then(data => resolve(data))
        .catch(error => reject(new Error(error)));
    }); 
};

controller.getById = (id) => {
    return new Promise((resolve, reject) =>{
        let product;
        Product
        .findOne({
            where: {id: id},
            include : [{model: models.Category}]
        })
        .then(result =>{
            product= result;
            return models.ProductSpecification.findAll({
                where: {productId: id},
                include: [{model: models.Specification}]
            });
        }).then(productSpecification =>{
            product.ProductSpecification = productSpecification;
            return models.Comment.findAll({
                where:{productId: id, parentCommentId: null},
                include: [{model: models.User},
                    {
                        model: models.Comment,
                        as: 'SubComments',
                        include: [{model: models.User}]
                    }

                ]
            })    
        }).then(comment =>{
            product.Comments = comment;
            return models.Review.findAll({
                where: {productId: id},
                include: [{model: models.User}]
            });
            
        }).then(reviews =>{
            product.Reviews = reviews;
            let stars = [];
            for(var i = 1; i <= 5; i++){
                stars.push(reviews.filter(item => ( item.rating == i)).length);
            }
            
            product.stars = stars;
            resolve(product);
        })
        .catch(error => reject(new Error(error)));
    })
    
};

module.exports = controller;
