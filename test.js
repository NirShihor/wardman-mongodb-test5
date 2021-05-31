const server = require('./server');
const supertest = require('supertest');
const request = supertest(server);
const mongoose = require('mongoose');
const databaseName = 'test';

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/${databaseName}`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

it('Testing to see if Jest works', async (done) => {
  expect(1).toBe(1);
  done();
});

it('gets the test endpoint', async (done) => {
  const response = await request.get('/api/client/getclients');

  expect(response.status).toBe(200);
  done();
});
