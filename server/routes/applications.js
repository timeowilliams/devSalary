const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');
const authController = require('../controllers/authController');

router.get(
  '/',
  //authController.verifyUser,
  (req, res, next) => {
    console.log('hi');
    return next();
  },
  applicationsController.getApplications,
  (req, res) => {
    console.log('BACK IN APP ROUTER');
    return res.status(200).json('ok');
  }
);

// postApplications

// updateApplication

// deleteApplication

module.exports = router;
