const supertest = require('supertest');
const app = require('../app');

const BASE_URL = '/api/v1/users';
let userId;
let TOKEN;

beforeAll(async () => {
  const user = {
    email: 'prueba@academlo.com',
    password: '1234',
  };
  const res = await supertest(app).post(`${BASE_URL}/login`).send(user);
  TOKEN = res.body.token;
});

test('GET => BASE_URL, should return status code 200 and res.body to have length 1', async () => {
  const res = await supertest(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test('POST => BASE_URL, should return status code 201 and res.body.firstName === body.firstName', async () => {
  const body = {
    firstName: 'TestFirstName',
    lastName: 'TestLastName',
    email: 'test@academlo.com',
    password: '1234',
    phone: '+595975639565',
  };
  const res = await supertest(app).post(BASE_URL).send(body);
  userId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(body.firstName);
});

test('PUT => BASE_URL/:id, should return status code 200 and res.body.firstName === updateBody.firstName', async () => {
  const updateBody = {
    firstName: 'SuperTest',
  };
  const res = await supertest(app)
    .put(`${BASE_URL}/${userId}`)
    .send(updateBody)
    .set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(updateBody.firstName);
});

test('POST => BASE_URL/login, should return status code 200, res.body.email === user.body.email and token be defined', async () => {
  const user = {
    email: 'test@academlo.com',
    password: '1234',
  };
  const res = await supertest(app).post(`${BASE_URL}/login`).send(user);
  expect(res.status).toBe(200);
  expect(res.body.user.email).toBe(user.email);
  expect(res.body.token).toBeDefined();
});

test('POST => BASE_URL/login, should return status code 401', async () => {
  const user = {
    email: 'test@academlo.com',
    password: 'invalidpassword',
  };
  const res = await supertest(app).post(`${BASE_URL}/login`).send(user);
  expect(res.status).toBe(401);
});

test('DELETE => BASE_URL/:id, should return status code 204', async () => {
  const res = await supertest(app)
    .delete(`${BASE_URL}/${userId}`)
    .set('Authorization', `Bearer ${TOKEN}`);
  expect(res.status).toBe(204);
});
