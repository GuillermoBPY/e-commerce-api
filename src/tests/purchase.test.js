const supertest = require('supertest');
const app = require('./../app');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');
const BASE_URL = '/api/v1/purchase';
const LOGIN_URL = `/api/v1/users/login`;
let TOKEN;
let cartCreated;
let productCreated;

beforeAll(async () => {
  const bodyUser = {
    email: 'prueba@academlo.com',
    password: '1234',
  };
  const userLoged = await supertest(app).post(LOGIN_URL).send(bodyUser);

  TOKEN = userLoged.body.token;
  let userId = userLoged.body.user.id;

  const bodyProduct = {
    title: 'SMPARTHONE SAMSUNG',
    description: 'PRODUCT DE PURCHASE ',
    price: 10.25,
  };

  productCreated = await Product.create(bodyProduct);

  const bodyCart = {
    quantity: 1,
    userId,
    productId: productCreated.id,
  };

  cartCreated = await Cart.create(bodyCart);
});

test('POST => BASE_URL, should return 201', async () => {
  const res = await supertest(app)
    .post(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`);

  expect(res.status).toBe(201);
  expect(res.body).toHaveLength(1);
});

test('GET => BASE_URL, should return 200', async () => {
  const res = await supertest(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  await Purchase.destroy({ where: { id: res.body[0].id } }); // elimina el registro de purchase creado
  await productCreated.destroy(); // elimina el registro de product creado
});
