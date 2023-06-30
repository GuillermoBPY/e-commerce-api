const supertest = require('supertest');
const app = require('./../app');
const Product = require('../models/Product');

const BASE_URL = '/api/v1/cart';
const LOGIN_URL = `/api/v1/users/login`;
let TOKEN;
let userId;
let resProduct;
let productId;
let cartId;

beforeAll(async () => {
  const bodyUser = {
    email: 'prueba@academlo.com',
    password: '1234',
  };
  const resUser = await supertest(app).post(LOGIN_URL).send(bodyUser);
  TOKEN = resUser.body.token;
  userId = resUser.body.user.id;

  const bodyProduct = {
    title: 'SMPARTHONE SAMSUNG',
    description: 'CART CART CART ',
    price: 10.25,
  };
  resProduct = await Product.create(bodyProduct);
  productId = resProduct.id;
});

test('POST => BASE_URL, should return status 201 and res.body.quantity === body.quantity', async () => {
  const body = {
    quantity: 1,
    userId,
    productId,
  };
  const res = await supertest(app)
    .post(BASE_URL)
    .send(body)
    .set('Authorization', `Bearer ${TOKEN}`);

  cartId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.quantity).toBe(body.quantity);
});

test('GET ALL => BASE_URL, should return status 200 and res.body.length === 1', async () => {
  const res = await supertest(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test('PUT => BASE_URL/:id, should return status 200 and res.body.quantity === body.quantity', async () => {
  const body = {
    quantity: 10,
  };
  const res = await supertest(app)
    .put(`${BASE_URL}/${cartId}`)
    .send(body)
    .set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(body.quantity);
});

test('DELETE => BASE_URL/:id, should return status 204', async () => {
  const res = await supertest(app)
    .delete(`${BASE_URL}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(204);
  await resProduct.destroy();
});
