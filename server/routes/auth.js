const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post(
  '/signup',
  authController.signup,
  //authController.addJWT,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

router.post(
  '/login',
  authController.login,
  //authController.addJWT,
  (req, res) => {
    res.status(200).json(res.locals.user);
  }
);

module.exports = router;
