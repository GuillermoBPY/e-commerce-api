const supertest = require('supertest');
const app = require('./../app');
require('./../models/Product');

const BASE_URL = '/api/v1/products';
const LOGIN_URL = `/api/v1/users/login`;
const CATEGORIES_URL = '/api/v1/categories';
let productId;
let categoryId;
let TOKEN;

beforeAll(async () => {
  const user = {
    email: 'prueba@academlo.com',
    password: '1234',
  };
  const resLogin = await supertest(app).post(LOGIN_URL).send(user);
  TOKEN = resLogin.body.token;
  const body = {
    name: 'Smparthones',
  };
  const resCategories = await supertest(app)
    .post(CATEGORIES_URL)
    .send(body)
    .set('Authorization', `Bearer ${TOKEN}`);
  categoryId = resCategories.body.id;
});

test('POST => BASE_URL, should return status 201 and res.body.length === 1', async () => {
  const body = {
    title: 'SMPARTHONE SAMSUNG',
    description: 'LOREM TEXT TEXT ',
    price: 10.25,
    categoryId,
  };
  const res = await supertest(app)
    .post(BASE_URL)
    .send(body)
    .set('Authorization', `Bearer ${TOKEN}`);
  productId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.title).toBe(body.title);
});

test('GET ALL => BASE_URL, should return status 200', async () => {
  const res = await supertest(app).get(BASE_URL);
  expect(res.status).toBe(200);
});

test('GET ONE => BASE_URL/:id, should return status 200', async () => {
  const res = await supertest(app).get(`${BASE_URL}/${productId}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(productId);
});

test('PUT => BASE_URL/:id, should return status 200 and res.body.title === bodyUpdate.title', async () => {
  const bodyUpdate = {
    title: 'SMARTPHONE IPHONE',
  };
  const res = await supertest(app)
    .put(`${BASE_URL}/${productId}`)
    .send(bodyUpdate)
    .set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(200);
  expect(res.body.title).toBe(bodyUpdate.title);
});

test('DELETE => BASE_URL/:id, should return status code 204', async () => {
  const res = await supertest(app)
    .delete(`${BASE_URL}/${productId}`)
    .set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(204);
});
