const Product = require('./Product');
const Category = require('./Category');
const User = require('./User');
const Cart = require('./Cart');
const Purchase = require('./Purchase');
const ProductImg = require('./ProductImg');

//Product => //categoryId
Product.belongsTo(Category);
Category.hasMany(Product);

//Cart => //userId
Cart.belongsTo(User);
User.hasOne(Cart);

//Cart => //productId
Cart.belongsTo(Product);
Product.hasMany(Cart);

//Purchase => //userId
Purchase.belongsTo(User);
User.hasMany(Purchase);

//Purchase => //productId
Purchase.belongsTo(Product);
Product.hasMany(Purchase);

//ProductImg => //productId
ProductImg.belongsTo(Product);
Product.hasMany(ProductImg);
