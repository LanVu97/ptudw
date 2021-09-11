let controller = {};
let models = require('../models');
let color = models.Color;

controller.getAll = () => {
    return new Promise((resolve, reject) =>{
        color.findAll({
            include: [{model: models.ProductColor}],
            attributes: ['id', 'name', 'imagepath', 'code']
        }).then(data => resolve(data))
        .catch(error => reject(new Error(error)));
    });
  
};

module.exports = controller;

