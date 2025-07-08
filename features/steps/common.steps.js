import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import request from 'supertest';
import app from '../../server.js';
import User from '../../models/userModel.js';

let token = null;

// Paso para verificar que el servidor esté corriendo
Given(/^the server is running$/, function () {
  // Si llegamos aquí, el servidor (app) ya fue importado correctamente
});

// Paso para iniciar sesión como capitán y obtener el token
Given('I am logged in as a captain', async function () {
  const loginPayload = {
    email: 'captain@torneo.com',
    password: '123456',
  };

  const res = await request(app).post('/api/users/login').send(loginPayload);

  expect(res.status).to.equal(200);
  expect(res.body).to.have.property('_id');

  // Si usas token por Authorization header, asegúrate de retornarlo en el backend
  token = res.body.token || ''; // Ajusta según tu backend (puede estar en res.body.jwt o en cookie)
});

// Paso para enviar POST a /api/teams/register con datos de equipo y jugadores
When('I send a POST request to {string} with team name and players', async function (route) {
  this.response = await request(app)
    .post(route)
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Equipo A',
      players: [
        '64ac2f95d2b8ec00123abcde',
        '64ac2f95d2b8ec00123abcdef'
      ]
    });
});

// Paso genérico para validar el código de estado HTTP
Then(/^the response should be (\d+)$/, function (statusCode) {
  expect(this.response.status).to.equal(parseInt(statusCode));
});

// Paso genérico para validar un mensaje en el body de la respuesta
Then(/^the response body should contain the message "([^"]*)"$/, function (expectedMessage) {
  const message = this.response.body?.message || this.response.body?.mensaje || '';
  expect(message.toLowerCase()).to.include(expectedMessage.toLowerCase());
});