const express = require('express')
const exphbs = require('express-handlebars');
let helper = require('./controller/helper');
const app = express()
const port = process.env.PORT || 5000

// Configure template Engine and Main Template File
app.engine('hbs', exphbs({
  defaultLayout: 'layout',
  runtimeOptions:{
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
  extname: '.hbs',
  helpers: {
    createStarList: helper.createStarList,
    createStar: helper.createStar
  }
}));
// Setting template Engine
app.set('view engine', 'hbs');


// routes
app.use('/', require('./routes/indexRouter'));
app.use('/products', require('./routes/productRouter'));


app.get('/sync', (req, res) => {
  let models = require('./models');
  models.sequelize.sync()
  .then(()=>(
    res.send('database sync completed')
  ));
  
});
app.get('/:page', (req, res) => {
  var banner = {
    blog : 'Our blog',
    cart : 'Shopping Cart',
    category : 'Shop Category',
    checkout : 'Checkout',
    confirmation : 'Order Confirmation',
    contact : 'Contact Us',
    login :'Login/Register',
    register:'Register',
    'single-blog': 'Blog Details',
    'single-product': 'Shop Single',
    'tracking-order': 'Order Tracking'
  }
  
  var page = req.params.page;
  res.render(page, {banner: banner[page]});
});



app.use('/', express.static('public'))

app.listen(port, () => {
  console.log(`server is running at port ${port}`)
})