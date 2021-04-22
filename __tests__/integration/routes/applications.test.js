import request from 'supertest';
// const request = require('supertest');
const app = require('../../../server/app');

describe('/applications', () => {
  describe('GET requests...', () => {
    test('...respond with a 200 status', async () => {
      const response = await request(app).get('/applications');
      expect(response.statusCode).toBe(200);
    });

    test('...specify json in the content type header', async () => {
      const response = await request(app).get('/applications');
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('json')
      );
    });

    // test('...sends back a json object', async ()=>{
    //   const response = await request(app).get('/applications');
    //   expect(response)
    // })
  });
});

// describe('testing postgres', () => {
//   let pgPool;
//   beforeAll(() => {
//     pgPool = new Pool({
//       connectionString: process.env.URL_TEST,
//     });
//   });
//   afterAll(async () => {
//     await pgPool.end();
//   });

//   it('should test', async () => {
//     const client = await pgPool.connect();
//     try {
//       await client.query('BEGIN');

//       const { rows } = await client.query('SELECT * FROM users');
//       console.log(rows);

//       await client.query('ROLLBACK');
//     } catch (err) {
//       throw err;
//     } finally {
//       client.release();
//     }
//   });
// });

// let count = 30;
// describe('Applications Route tests', () => {
//   describe('/applications', () => {
//     describe('GET', () => {
//       test('responds with a 200 status', () => {
//         // return request.get('/applications').expect(200);
//         return request.get('/applications').then((response) => {
//           expect(response.status).toBe(200);
//         });
//       });
//     });
//   });
// });

// describe('Applications Route tests', () => {
//   test('responds with a 200 status', async () => {
//     // return request.get('/applications').expect(200);
//     const response = await request.get('/applications');
//     expect(response.status).toBe(200);
//   });
// });

//   describe('/user', () => {
//     describe('POST', () => {
//       it('responds with a 200 status, expects the email to be the value that was given and returns an object with a properties id and email', () => {
//         return request
//           .post('/user')
//           .send(newUser)
//           .expect(200)
//           .expect((res) => {
//             expect(res.body.user.email).toBe(newUser.email);
//           })
//           .expect((res) => {
//             expect(res.body.user).toHaveProperty('id');
//           });
//       });
//       it('responds to invalid request or invalid query with a 300 status and an error message in body', () => {
//         return request
//           .post('/user')
//           .send(invalidUser2)
//           .expect(300)
//           .then(({ body }) => expect(body).toHaveProperty('err'));
//       });
//     });
//   });
// });
