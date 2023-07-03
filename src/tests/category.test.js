const supertest = require('supertest');
const app = require('./../app');

const BASE_URL = '/api/v1/categories';
const LOGIN_URL = `/api/v1/users/login`;
let categoryId;
let TOKEN;

beforeAll(async () => {
  const user = {
    email: 'prueba@academlo.com',
    password: '1234',
  };
  const res = await supertest(app).post(LOGIN_URL).send(user);
  TOKEN = res.body.token;
});

test('POST => BASE_URL, should return status 201 and res.body.name === body.name', async () => {
  const body = {
    name: 'Kitchen',
  };
  const res = await supertest(app)
    .post(BASE_URL)
    .send(body)
    .set('Authorization', `Bearer ${TOKEN}`);
  categoryId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(body.name);
});

test('GET ALL => BASE_URL, should return status 200 and res.body.length === 1', async () => {
  const res = await supertest(app).get(BASE_URL);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test('DELETE => BASE_URL/:id, should return status 204', async () => {
  const res = await supertest(app)
    .delete(`${BASE_URL}/${categoryId}`)
    .set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(204);
});
