const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('user.js: / request detected!');
  return res.status(200).json('ok');
});

// login
// app.post('/login)

// new user
// app.post('/')

module.exports = router;
