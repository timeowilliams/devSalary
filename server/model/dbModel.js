const { Pool } = require('pg');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

console.log('dbModel.js: line 5');

console.log(process.env.NODE_ENV);

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
