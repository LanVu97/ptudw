let controller = {};
let models = require('../models');
let Category = models.Category;
const { Op } = require("sequelize");
controller.getAll = (query) => {
    return new Promise((resolve, reject) =>{
        let option = {
            attributes: ['id', 'name', 'imagepath', 'summary'],
            include: [{
                model: models.Product,
                where: {}
                }]
            
        }

        if(query && query.search != ''){
            option.include[0].where.name = {
                [Op.iLike]: `%${query.search}%`
            }        
        }
        Category.findAll(option)
        .then(data => resolve(data))
        .catch(error => reject(new Error(error)));

       
    });
  
};

module.exports = controller;
