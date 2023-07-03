const supertest = require('supertest');
const app = require('./../app');
const Category = require('../models/Category');

const BASE_URL = '/api/v1/products';
const LOGIN_URL = `/api/v1/users/login`;
let productId;
let category;
let TOKEN;

beforeAll(async () => {
  const user = {
    email: 'prueba@academlo.com',
    password: '1234',
  };
  const resLogin = await supertest(app).post(LOGIN_URL).send(user);
  TOKEN = resLogin.body.token;
  const categorybody = {
    name: 'Smparthones',
  };
  const resCategories = await Category.create(categorybody);
  category = resCategories;
});

test('POST => BASE_URL, should return status 201 and res.body.title === body.title', async () => {
  const body = {
    title: 'SMPARTHONE SAMSUNG',
    description: 'LOREM TEXT TEXT ',
    brand: 'SAMSUNG',
    price: 10.25,
    categoryId: category.id,
  };
  const res = await supertest(app)
    .post(BASE_URL)
    .send(body)
    .set('Authorization', `Bearer ${TOKEN}`);
  productId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.title).toBe(body.title);
});

test('GET ALL => BASE_URL, should return status 200 and res.body[0].category to be defined', async () => {
  const res = await supertest(app).get(BASE_URL);
  expect(res.status).toBe(200);
  expect(res.body[0].category).toBeDefined();
});

test('GET ALL FILTER => BASE_URL?category, should return status 200 and res.body[0].category.id === category.id', async () => {
  const res = await supertest(app).get(`${BASE_URL}?category=${category.id}`);
  expect(res.status).toBe(200);
  expect(res.body[0].category.id).toBe(category.id);
});

test('GET ONE => BASE_URL/:id, should return status 200 and res.body.id === productId', async () => {
  const res = await supertest(app).get(`${BASE_URL}/${productId}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(productId);
});

test('PUT => BASE_URL/:id, should return status 200 and res.body.title === bodyUpdate.title', async () => {
  const bodyUpdate = {
    title: 'SMARTPHONE IPHONE',
    brand: 'IPHONE',
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
  await category.destroy();
});
