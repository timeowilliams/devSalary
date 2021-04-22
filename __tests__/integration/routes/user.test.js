const app = require('../../../server/app');
import request from 'supertest';

//Validates the CRUD methods in the user route

describe('User Route tests', () => {
  // beforeEach(() => {
  //   server = require('../../../server/server');
  // });
  // afterEach(() => {
  //   server.close();
  // });
  const newUser = {
    email: `onchirim72@msu.edu`,
    password: 'password',
  };
  //validates the GET method in the user route
  describe('/user', () => {
    describe('GET /', () => {
      xit('responds with a 200 status', async () => {
        const response = await request(app).get('/user');
        expect(response.statusCode).toBe(200);
      });

      xit('returns a content type of application json', async () => {
        const response = await request(app).get('/user');
        expect(response.headers['content-type']).toEqual(
          expect.stringContaining('json')
        );
      });
    });
  });
  //validates the POST methon in the user route
  describe('/user', () => {
    describe('POST /', () => {
      xit('responds with a 200 status', async () => {
        const response = await request(app).post('/user').send(newUser);
        expect(response.statusCode).toBe(200);
      });
      xit('returns a content type of application json', async () => {
        const response = await request(app).post('/user').send(newUser);
        expect(response.headers['content-type']).toEqual(
          expect.stringContaining('json')
        );
      });
      xit('returns an object with a properties id and email', async () => {
        const response = await request(app).post('/user').send(newUser);
        console.log(response.body);
        expect(response.body.user).toBeDefined();
        expect(response.body.user.id).toBeDefined();
        expect(response.body.user.email).toBeDefined();
      });
      xit('Expects the response email to be the email value that was given', async () => {
        const response = await request(app).post('/user').send(newUser);
        expect(response.body.user.email).toBe(newUser.email);
      });
      xit('responds to invalid request with a 300 status and an error message in body', async () => {
        const invalidUser = [
          { email: `onchirim39@msu.edu` },
          {
            email: `onchirim39@msu.edu`,
            password: 22,
          },
          {},
        ];
        for (const prop of invalidUser) {
          const response = await request(app).post('/user').send(prop);
          expect(response.statusCode).toBe(300);
          expect(response.body.err).toBeDefined();
        }
      });
    });
  });
  //Validates the DELETE method in the user route
  describe('/user', () => {
    const id = 20;
    describe('DELETE /:id', () => {
      it('responds with a 200 status when user is deleted, and returns an object with an id property equal to the deleted entry', async () => {
        const response = await request(app).delete(`/user/${id}`);
        expect(response.statusCode).toBe(200);
      });
      it('returns an object with an id property equal to the id of the deleted entry', async () => {
        const response = await request(app).del(`/user/${id}`);
        expect(response.body.user.id).toBe(id);
      });
    });
  });

  describe('/user', () => {
    describe('PUT', () => {
      it('responds with a 200 status and application json content type', async () => {
        await request
          .put('/user')
          .send(newUser)
          .then(() => expect(200));
      });
    });
  });
});
