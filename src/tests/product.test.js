const supertest = require('supertest');
const app = require('./../app');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');

const BASE_URL = '/api/v1/products';
const LOGIN_URL = `/api/v1/users/login`;
let productId;
let category;
let TOKEN;
let productImg;

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
  const productImgBody = {
    url: 'http://localhost:8080/api/v1/public/uploads/cocina.jpg',
    filename: 'cocina.jpg',
    productId,
  };
  productImg = await ProductImg.create(productImgBody);
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

test('GET ALL => BASE_URL, should return status 200, res.body[0].category and res.body[0].productImgs to be defined', async () => {
  const res = await supertest(app).get(BASE_URL);
  expect(res.status).toBe(200);
  expect(res.body[0].category).toBeDefined();
  expect(res.body[0].productImgs).toBeDefined();
});

test('GET ALL FILTER => BASE_URL?category, should return status 200, res.body[0].category.id === category.id and res.body[0].productImgs to be defined', async () => {
  const res = await supertest(app).get(`${BASE_URL}?category=${category.id}`);
  expect(res.status).toBe(200);
  expect(res.body[0].category.id).toBe(category.id);
  expect(res.body[0].productImgs).toBeDefined();
});

test('GET ONE => BASE_URL/:id, should return status 200, res.body.id === productId and res.body.productImgs to be defined', async () => {
  const res = await supertest(app).get(`${BASE_URL}/${productId}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(productId);
  expect(res.body.productImgs).toBeDefined();
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

test('POST => BASE_URL/:id/images, should return status 200, and res.body.length === 1', async () => {
  const res = await supertest(app)
    .post(`${BASE_URL}/${productId}/images`)
    .send([productImg.id])
    .set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test('DELETE => BASE_URL/:id, should return status code 204', async () => {
  const res = await supertest(app)
    .delete(`${BASE_URL}/${productId}`)
    .set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(204);
  await category.destroy();
  await productImg.destroy();
});
