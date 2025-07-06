import { When } from '@cucumber/cucumber';
import request from 'supertest';
import app from '../../server.js';

When(/^I send a POST request to \/api\/matches\/results with match stats$/, async function () {
  this.response = await request(app)
    .post('/api/matches/results')
    .send({
      matchId: '64abcd1234567890fedcba98',
      goalsTeamA: 3,
      goalsTeamB: 2,
      fouls: 5,
      yellowCards: 2,
      redCards: 0
    });
});
