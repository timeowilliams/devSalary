// if (process.env.NODE_ENV !== 'production') require('dotenv').config();
// const pg = require('pg');
// const URL = process.env.URL;

// const client = new pg.Client(URL);

// client
//   .connect()
//   .then(() => console.log('Connected to database!'))
//   .then(() => client.query('SELECT * FROM states'))
//   .then((results) => console.table(results.rows))
//   .then(() => console.log('Closing connection to database!'))
//   .catch((e) => console.log(e))
//   .finally(() => client.end());

const { Pool } = require('pg');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const URI =
  process.env.NODE_ENV === 'testing' ? process.env.URL_TEST : process.env.URL;

const pool = new Pool({
  connectionString: URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('db connected...');
    return pool.query(text, params, callback);
  },
};
