import request from 'supertest';
const app = require('../../../server/app');

describe('GET requests to /applications...', () => {
  test('...respond with a 200 status when successful', async () => {
    const response = await request(app).get('/applications').send({
      webToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    });
    expect(response.statusCode).toBe(200);
  });

  test('...respond with a 400 status when sent without jwt', async () => {
    const response = await request(app).get('/applications');
    expect(response.statusCode).toBe(400);
  });
});
