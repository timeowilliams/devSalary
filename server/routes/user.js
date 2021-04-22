const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers, (req, res) => {
  return res.status(200).send(res.locals.allUsers);
});

router.post('/', userController.postUser, (req, res) => {
  return res.status(200).json({ user: res.locals.user });
});

router.delete('/:id', userController.deleteUser, (req, res) => {
  return res.status(200).json(res.locals.deletedMessage);
});

router.put('/', (req, res) => {
  console.log(req.body);
  return res.status(200);
});

module.exports = router;
