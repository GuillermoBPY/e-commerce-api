const {
  getAll,
  create,
  getOne,
  remove,
  update,
} = require('../controllers/product.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerProduct = express.Router();

routerProduct.route('/').get(getAll).post(verifyJWT, create);

routerProduct
  .route('/:id')
  .get(getOne)
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);

module.exports = routerProduct;
