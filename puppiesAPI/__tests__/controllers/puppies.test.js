const request = require('supertest');
// const express = require('express');

const puppiesController = require('../../controllers/puppies');
// const app = express();
// const router = express.Router();
const app = require('../../app');

describe('puppies controller', () => {
  beforeAll(() => {
    app.use('/puppies', puppiesController);
  });
  it('should respond with statusCode 200', async () => {
    const res = await request(app).get('/');
    const statusCode = res;
    expect(res.statusCode).toBe(200);
    done();
  });
  afterAll(() => {
    app.listen().close();
  });
});
