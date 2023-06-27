const verifyJWT = require('./../utils/verifyJWT');
const {
  getAll,
  create,
  remove,
  update,
  login,
} = require('../controllers/user.controllers');
const express = require('express');

const routerUser = express.Router();

routerUser.route('/').get(verifyJWT, getAll).post(create);

routerUser.route('/login').post(login);

routerUser.route('/:id').delete(verifyJWT, remove).put(verifyJWT, update);

module.exports = routerUser;
