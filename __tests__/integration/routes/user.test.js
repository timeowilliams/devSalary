let server;
//const supertest = require('supertest');
//const request = supertest(app);
const request = require('supertest');

//const server = 'http://localhost:3000';

//let count = 30;

describe('User Route tests', () => {
  beforeEach(() => {
    server = require('../../../server/server');
  });
  afterEach(() => {
    server.close();
  });
  const newUser = {
    email: `onchirim39@msu.edu`,
    password: 'password',
  };
  const invalidUser = {
    email: `onchirim39@msu.edu`,
  };
  const invalidUser2 = {
    email: `onchirim39@msu.edu`,
    password: 22,
  };

  describe('/user', () => {
    describe('GET', () => {
      it('responds with a 200 status and returns a content type of application json', async () => {
        return await request
          .get('/user')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
      it('responds to invalid requests with a 300 status', () => {
        return request
          .get('/user')
          .expect('Content-Type', /application\/json/)
          .expect(300);
      });
    });
  });

  describe('/user', () => {
    describe('POST', () => {
      xit('responds with a 200 status, expects the email to be the value that was given and returns an object with a properties id and email', () => {
        return request
          .post('/user')
          .send(newUser)
          .expect(200)
          .expect((res) => {
            expect(res.body.user.email).toBe(newUser.email);
          })
          .expect((res) => {
            expect(res.body.user).toHaveProperty('id');
          });
      });
      xit('responds to invalid request or invalid query with a 300 status and an error message in body', () => {
        return request
          .post('/user')
          .send(invalidUser2)
          .expect(300)
          .then(({ body }) => expect(body).toHaveProperty('err'));
      });
    });
  });

  describe('/user', () => {
    const id = 7;
    describe('DELETE', () => {
      xit('responds with a 200 status, and returns an object with an id property equal to the deleted entry', () => {
        return request.del(`/user/${id}`).expect(200);
      });
    });
  });

  describe('/user', () => {
    describe('PUT', () => {
      xit('responds with a 200 status and application json content type', async () => {
        await request
          .put('/user')
          .send(newUser)
          .then(() => expect(200));
      });
    });
  });
});
