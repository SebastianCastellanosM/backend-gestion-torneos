import { When } from '@cucumber/cucumber';
import request from 'supertest';
import app from '../../server.js';

let response;

When(/^I send a POST request to \/api\/teams\/register with team name and players$/, async function () {
  const teamData = {
    nombre: 'Equipo A',
    torneo: '665100000000000000000001', // ID válido de torneo
    deporte: '665000000000000000000001', // ID válido de deporte
    jugadores: [
      {
        nombre: 'Juan Pérez',
        documento: '123456789',
        posicion: 'Delantero',
        email: 'juan@equipoa.com'
      }
    ]
  };

  response = await request(app)
    .post('/api/teams/register')
    .set('Authorization', `Bearer ${this.token}`) // si hay autenticación
    .send(teamData);

  this.response = response;
});
