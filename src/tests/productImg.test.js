const supertest = require('supertest');
const app = require('./../app');
const path = require('path');

const BASE_URL = '/api/v1/product_images';
const LOGIN_URL = `/api/v1/users/login`;
let TOKEN;
let productImgId;

beforeAll(async () => {
  const user = {
    email: 'prueba@academlo.com',
    password: '1234',
  };
  const resLogin = await supertest(app).post(LOGIN_URL).send(user);
  TOKEN = resLogin.body.token;
});

test('POST => BASE_URL, should return status 201, res.body.url and res.body.filename to be defined', async () => {
  const imagePatch = path.join(__dirname, '..', 'public', 'testImage.jpg');
  const res = await supertest(app)
    .post(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)
    .attach('image', imagePatch);
  productImgId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.url).toBeDefined();
  expect(res.body.filename).toBeDefined();
});

test('GET => BASE_URL, should return status 200 and res.body.length === 1', async () => {
  const res = await supertest(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test('DELETE => BASE_URL, should return status 204', async () => {
  const res = await supertest(app)
    .delete(`${BASE_URL}/${productImgId}`)
    .set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(204);
});
