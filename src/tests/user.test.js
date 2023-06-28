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
