import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import request from 'supertest';
import app from '../../server.js';

let token = null;

// Verificar que el servidor esté corriendo
Given(/^the server is running$/, function () {
  // Nada que hacer, si llegamos aquí, app ya fue importado
});

// Enviar POST a /api/teams/register con datos de equipo y jugadores
When('I send a POST request to \\/api\\/teams\\/register with team name and players', async function () {
  this.response = await request(app)
    .post('/api/teams/register')
    .set('Authorization', `Bearer ${token}`) // Requiere autenticación
    .send({
      name: 'Equipo A',
      players: [
        '64ac2f95d2b8ec00123abcde',
        '64ac2f95d2b8ec00123abcdef'
      ] // Usa ObjectIds válidos o mocks insertados antes
    });
});

// Verifica que el código de respuesta sea correcto
Then(/^the response should be (\d+)$/, function (statusCode) {
  expect(this.response.status).to.equal(parseInt(statusCode));
});

// Verifica mensaje en el cuerpo de respuesta
Then(/^the response body should contain the message "([^"]*)"$/, function (mensajeEsperado) {
  const message = this.response.body.message || this.response.body.mensaje || '';
  expect(message.toLowerCase()).to.include(mensajeEsperado.toLowerCase());
});

// Login como capitán para pruebas autenticadas
Given('I am logged in as a captain', async function () {
  const loginPayload = {
    email: 'captain@torneo.com',
    password: '123456'
  };

  const res = await request(app)
    .post('/api/users/login')
    .send(loginPayload);

  expect(res.status).to.equal(200);
  expect(res.body).to.have.property('_id');
  token = res.body.token || res.body.jwt || ''; // Asegúrate que backend envía token si usas Authorization
});
