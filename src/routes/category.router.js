const {
  getAll,
  create,
  remove,
} = require('../controllers/category.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const routerCategory = express.Router();

routerCategory.route('/').get(getAll).post(verifyJWT, create);

routerCategory.route('/:id').delete(verifyJWT, remove);

module.exports = routerCategory;
