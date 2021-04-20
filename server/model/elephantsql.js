if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const pg = require('pg');
const URL = process.env.URL;

const client = new pg.Client(URL);

client
  .connect()
  .then(() => console.log('Connected to database!'))
  //   .then(() => client.query('SELECT NOW() AS "theTime"'))
  //   .then((results) => console.log(results.rows[0].theTime))
  .then(() => client.query('SELECT * FROM states'))
  .then((results) => console.table(results.rows))
  .then(() => console.log('Closing connection to database!'))
  .catch((e) => console.log(e))
  .finally(() => client.end());
