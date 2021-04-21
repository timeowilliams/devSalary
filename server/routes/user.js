const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers, (req, res) => {
  return res.status(200).send(res.locals.allUsers);
});

router.post('/', userController.postUser, (req, res) => {
  return res.status(200).json({ user: res.locals.user });
});

router.delete('/:id', (req, res) => {
  console.log(req.params);
  return res.status(200);
});

router.put('/', (req, res) => {
  console.log(req.body);
  return res.status(200);
});

// login
// app.post('/login)

// new user
// app.post('/')

module.exports = router;
