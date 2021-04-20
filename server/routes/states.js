const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('states.js: / request detected!');
  return res.status(200).json('ok');
});

module.exports = router;
