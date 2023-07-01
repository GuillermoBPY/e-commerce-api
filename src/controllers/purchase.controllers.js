const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async (req, res) => {
  const userId = req.user.id;
  const results = await Purchase.findAll({
    include: [
      {
        model: Product,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: {
          model: ProductImg,
          attributes: ['id', 'url'],
          nested: true, // Anida los resultados de ProductImg dentro del objeto product
        },
      },
    ],
    where: { userId },
  });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findAll({
    //retornar un array de objetos con las coincidencias
    where: { userId },
    attributes: ['quantity', 'userId', 'productId'], //sirve para elegir que datos queremos recibir
    raw: true, //Sirve para trae en texto sin metodos especiales
  });
  const result = await Purchase.bulkCreate(cart); //cuando el dato en un array de ojbetos se utiliza bulkCreate
  await Cart.destroy({ where: { userId } });
  return res.status(201).json(result);
});

module.exports = {
  getAll,
  create,
};
