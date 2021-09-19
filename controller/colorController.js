let controller = {};
let models = require('../models');
let color = models.Color;
const { Op } = require("sequelize");
controller.getAll = (query) => {
    return new Promise((resolve, reject) =>{
        let option = {
            include: [{
                model: models.ProductColor,
                include : [{
                    model: models.Product,
                    attributes: [],
                    where: {
                        price: {
                            [Op.lt]: query.max,
                            [Op.gt]: query.min
                          }
                    }
                }]
            }],
            attributes: ['id', 'name', 'imagepath','code'],
            
        };
        if(query.category > 0){
            option.include[0].include[0].where.categoryId = query.category
        }
        if(query.brand > 0){
            option.include[0].include[0].where.brandId = query.brand
        }
        if(query.search != ''){
            option.include[0].include[0].where.name = {
                [Op.iLike]: `%${query.search.trim()}%`
            }        
        }
        color.findAll(option)
        .then(data => resolve(data))
        .catch(error => reject(new Error(error)));
    });
  
};

module.exports = controller;

