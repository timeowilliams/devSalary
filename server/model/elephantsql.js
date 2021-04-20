if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const pg = require('pg');
const URL = process.env.URL;

const client = new pg.Client(URL);
client.connect(function (err) {
  if (err) {
    return console.log('Could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', (err, result) => {
    if (err) {
      return console.error('Error running query', err);
    }
    console.log(result.rows[0].theTime);
    client.end();
  });
});
