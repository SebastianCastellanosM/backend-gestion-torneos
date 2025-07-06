import { Given, Then } from '@cucumber/cucumber';
import * as chai from 'chai';

const expect = chai.expect;

Given(/^the server is running$/, function () {
  // El servidor ya está corriendo vía `import app`
});

Then(/^the response should be (\d+)$/, function (statusCode) {
  expect(this.response.status).to.equal(parseInt(statusCode));
});

Then(/^the response body should contain the message "([^"]*)"$/, function (mensajeEsperado) {
  expect(this.response.body.mensaje).to.equal(mensajeEsperado);
});

import request from 'supertest';
import app from '../../server.js';

Given('I am logged in as a captain', async function () {
  const loginPayload = {
    correo: 'captain@torneo.com',
    contraseña: '123456' // Asegúrate de que esta combinación exista en tu base de datos
  };

  const res = await request(app)
    .post('/api/users/login')
    .send(loginPayload);

  if (res.status !== 200 || !res.body.token) {
    throw new Error(`Login failed: ${res.status} ${JSON.stringify(res.body)}`);
  }

  this.token = res.body.token;
});
