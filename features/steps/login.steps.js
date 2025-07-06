import { When, Then } from '@cucumber/cucumber';
import request from 'supertest';
import app from '../../server.js';

When(/^I send a POST request to \/api\/users\/login with correct credentials$/, async function () {
  this.response = await request(app)
    .post('/api/users/login')
    .send({ correo: 'usuario@ejemplo.com', contraseña: '123456' });
});

When(/^I send a POST request to \/api\/users\/login with wrong password$/, async function () {
  this.response = await request(app)
    .post('/api/users/login')
    .send({ correo: 'usuario@ejemplo.com', contraseña: 'wrongpass' });
});

Then(/^the response body should contain a token$/, function () {
  if (!this.response.body.token) {
    throw new Error('Expected token in response body, but none found');
  }
});
