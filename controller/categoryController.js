let controller = {};
let models = require('../models');
let Category = models.Category;
const { Op } = require("sequelize");
controller.getAll = (query) => {
    return new Promise((resolve, reject) =>{
        let option = {
            include: [{
                model: models.Product,
                where: {}
                }],
            attributes: ['id', 'name', 'imagepath', 'summary']
        }

        Category.findAll(option)
        .then(data => resolve(data))
        .catch(error => reject(new Error(error)));

        if(query && query.search != ''){
            option.include[0].where.name = {
                [Op.iLike]: `%${query.search.trim()}%`
            }        
        }
    });
  
};

module.exports = controller;
