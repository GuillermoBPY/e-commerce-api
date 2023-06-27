const supertest = require('supertest');
const app = require('./../app');

const URL_BASE = '/api/v1/users';
let userId;
let TOKEN;

test('GET => URL_BASE, should return status code 200 and res.body to have length 1', async () => {
  const res = await supertest(app)
    .get(URL_BASE)
    .set('Authorization', `Bearer ${TOKEN}`);

  expect(res.status).toBe(200);
  expect(res.status).toHaveLength(1);
});
