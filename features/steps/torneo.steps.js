import { When } from '@cucumber/cucumber';
import request from 'supertest';
import app from '../../server.js';

When(/^I send a POST request to \/api\/tournaments with name, category and rules$/, async function () {
  this.response = await request(app)
    .post('/api/tournaments')
    .send({
      name: 'Torneo de Prueba',
      category: 'Fútbol',
      rules: 'Reglas oficiales'
    });
});
