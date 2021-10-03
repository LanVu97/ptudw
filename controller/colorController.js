let controller = {};
let models = require('../models');
let color = models.Color;
const { Op } = require("sequelize");
controller.getAll = (query) => {
    return new Promise((resolve, reject) =>{
        let option = {
            attributes: ['id', 'name', 'imagepath','code'],
            include: [{
                model: models.ProductColor,
                include : [{
                    model: models.Product,
                    attributes: [],
                    where: {
                        price: {
                            [Op.gte]: query.min,
                            [Op.lte]: query.max
                            
                          }
                    }
                }]
            }],
            
            
        };
        if(query.category > 0){
            option.include[0].include[0].where.categoryId = query.category
        }
        if(query.brand > 0){
            option.include[0].include[0].where.brandId = query.brand
        }
        if(query.search != ''){
            option.include[0].include[0].where.name = {
                [Op.iLike]: `%${query.search}%`
            }        
        }
        color.findAll(option)
        .then(data => resolve(data))
        .catch(error => reject(new Error(error)));
    });
  
};

module.exports = controller;

