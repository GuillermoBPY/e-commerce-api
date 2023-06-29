const Product = require('./Product');
const Category = require('./Category');
const User = require('./User');
const Cart = require('./Cart');

//Product => //categoryId
Product.belongsTo(Category);
Category.hasMany(Product);

//Cart => //userId
Cart.belongsTo(User);
User.hasOne(Cart);

//Cart => //productId
Cart.belongsTo(Product);
Product.hasMany(Cart);
