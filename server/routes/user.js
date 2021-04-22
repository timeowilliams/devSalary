const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//middleware chain to get all users
router.get('/', userController.getUsers, (req, res) => {
  return res.status(200).send(res.locals.allUsers);
});

//middleware chain to delete a user from the database
router.delete('/:id', userController.deleteUser, (req, res) => {
  return res.status(200).json(res.locals.deletedMessage);
});

module.exports = router;
