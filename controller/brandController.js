let controller = {};
let models = require('../models');
let brand = models.Brand;
const { Op } = require("sequelize");
controller.getAll = (query) => {
    
    return new Promise((resolve, reject) =>{
        let option = {
            include: [{model: models.Product,
                where: {
                    price: {
                        [Op.lt]: query.max,
                        [Op.gt]: query.min
                      }
                } 
            }],
            attributes: ['id', 'name', 'imagepath', 'summary'],
            
        };
        if(query.category > 0){
            option.include[0].where.categoryId = query.category;
        }
        if(query.color > 0){
            option.include[0].include = [{
                model: models.ProductColor,
                where: {colorId: query.color}
            }]
        }
        if(query.search != ''){
            option.include[0].where.name = {
                [Op.iLike]: `%${query.search.trim()}%`
            }        
        }
        brand.findAll(option).then(data => resolve(data))
        .catch(error => reject(new Error(error)));
    });
  
};

module.exports = controller;

