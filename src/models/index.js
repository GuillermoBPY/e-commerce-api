const Product = require('./Product');
const Category = require('./Category');

//Product => //categoryId
Product.belongsTo(Category);
Category.hasMany(Product);
