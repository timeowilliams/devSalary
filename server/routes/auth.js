const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//middleware chain to sign up a new user
router.post(
  '/signup',
  authController.signup,
  authController.addJWT,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

//middleware chain to login a user
router.post(
  '/login',
  authController.login,
  authController.addJWT,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

//middleware chain to logout a user
router.get('/logout', authController.logout, (req, res) => {
  res.redirect('/');
});

module.exports = router;
